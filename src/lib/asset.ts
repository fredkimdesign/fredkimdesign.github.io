/**
 * Prefix a public asset path with the deploy basePath.
 *
 * next/image and next/link add basePath themselves; raw <video src>, <source>,
 * and anything handed to the DOM directly do not. Route those through here or
 * they 404 on a project-site deploy.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return path.startsWith("/") ? `${BASE}${path}` : path;
}
