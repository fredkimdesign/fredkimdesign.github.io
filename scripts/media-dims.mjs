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
    const out = execFileSync("mdls", ["-name", "kMDItemPixelWidth", "-name", "kMDItemPixelHeight", "-raw", file]).toString();
    const [w, h] = out.split("\0").map(Number);
    if (w && h) return { width: w, height: h };
  } catch {}
  return null;
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

const dims = {};
for (const file of walk(join(ROOT, "work")).sort()) {
  const ext = file.slice(file.lastIndexOf(".")).toLowerCase();
  const size = videoExts.has(ext) ? videoSize(file) : imageSize(readFileSync(file));
  if (size) dims["/" + relative(ROOT, file)] = [size.width, size.height];
}
writeFileSync(OUT, JSON.stringify(dims, null, 2) + "\n");
console.log(`media-dims: ${Object.keys(dims).length} images`);
