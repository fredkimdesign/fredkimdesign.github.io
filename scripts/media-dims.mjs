// Reads every image under public/work and writes its intrinsic size to
// src/content/media-dims.json, so <Figure> can reserve the right box before
// the image loads. Run with `npm run media` after adding images; also runs
// automatically before `next build`.
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { imageSize } from "image-size";
import { execFileSync } from "node:child_process";

const ROOT = new URL("../public", import.meta.url).pathname;
const OUT = new URL("../src/content/media-dims.json", import.meta.url).pathname;
const exts = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif"]);
const videoExts = new Set([".mp4", ".mov", ".webm"]);

// Videos: read pixel size from Spotlight metadata (macOS). Reserves the box so
// a <video> doesn't jump from ~150px tall to its real height when metadata loads.
function videoSize(file) {
  try {
    // mdls emits attributes in ALPHABETICAL order, not the order requested, so
    // -raw silently transposes width/height. Parse by name instead.
    const out = execFileSync("mdls", ["-name", "kMDItemPixelWidth", "-name", "kMDItemPixelHeight", file]).toString();
    const pick = (k) => Number(out.match(new RegExp(`${k}\\s*=\\s*(\\d+)`))?.[1]);
    const w = pick("kMDItemPixelWidth");
    const h = pick("kMDItemPixelHeight");
    if (w && h) return { width: w, height: h };
  } catch {}
  console.warn(`media-dims: could not size ${file} (mdls is macOS-only) - run \`npm run media\` on a Mac and commit src/content/media-dims.json`);
  return null;
}

// A "plate" is an image that is an opaque rectangle — a screenshot, a photo,
// a mock-up on its own backdrop — as opposed to a cut-out that sits directly
// on the paper. Plates get soft corners like video; cut-outs get nothing.
// Detected rather than declared: mean alpha near 1, or four opaque corners
// (sampled a few px in, because exports often antialias the outermost column).
function isPlate(file) {
  try {
    const corner = (x, y) => `crop=1:1:${x}:${y}`;
    const graph =
      "[0:v]format=rgba,alphaextract,split=5[m][a][b][c][d];" +
      "[m]scale=1:1:flags=area[m1];" +
      `[a]${corner("4", "4")}[a1];[b]${corner("iw-5", "4")}[b1];[c]${corner("4", "ih-5")}[c1];[d]${corner("iw-5", "ih-5")}[d1];` +
      "[m1][a1][b1][c1][d1]hstack=5";
    const px = execFileSync(
      "ffmpeg",
      ["-loglevel", "error", "-i", file, "-frames:v", "1", "-filter_complex", graph, "-f", "rawvideo", "-pix_fmt", "gray", "-"],
      { stdio: ["ignore", "pipe", "ignore"] },
    );
    const [mean, ...corners] = px;
    return mean >= 250 || corners.every((a) => a >= 250);
  } catch {
    return null; // no ffmpeg: keep whatever the last run recorded
  }
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else {
      const ext = name.slice(name.lastIndexOf(".")).toLowerCase();
      if (exts.has(ext) || videoExts.has(ext)) out.push(p);
    }
  }
  return out;
}

let previous = {};
try {
  previous = JSON.parse(readFileSync(OUT, "utf8"));
} catch {}

// Each entry is [width, height] or, for a plate, [width, height, 1].
const dims = {};
for (const file of walk(join(ROOT, "work")).sort()) {
  const ext = file.slice(file.lastIndexOf(".")).toLowerCase();
  const key = "/" + relative(ROOT, file);
  const size = videoExts.has(ext) ? videoSize(file) : imageSize(readFileSync(file));
  if (!size) continue;
  const plate = videoExts.has(ext) ? false : (isPlate(file) ?? previous[key]?.[2] === 1);
  dims[key] = plate ? [size.width, size.height, 1] : [size.width, size.height];
}
const body = Object.entries(dims)
  .map(([k, v]) => `  ${JSON.stringify(k)}: [${v.join(", ")}]`)
  .join(",\n");
writeFileSync(OUT, `{\n${body}\n}\n`);
console.log(`media-dims: ${Object.keys(dims).length} images`);
