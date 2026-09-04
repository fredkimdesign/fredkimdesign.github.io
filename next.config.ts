import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 *
 * BASE_PATH is empty for a user site served from the domain root
 * (e.g. fredkimdesign.github.io) and "/portfolio" for a project site
 * (gnarfred.github.io/portfolio). The deploy workflow sets it; local dev
 * leaves it empty so `npm run dev` is always at localhost:3000/.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  // Pages has no image optimizer. Assets are pre-compressed to WebP instead.
  images: { unoptimized: true },
  basePath,
  // Emit /work/tesla/index.html rather than /work/tesla.html so Pages resolves
  // the route without relying on its implicit .html fallback.
  trailingSlash: true,
  turbopack: { root: __dirname },
};

export default nextConfig;
