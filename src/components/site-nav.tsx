"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Work", match: (p: string) => p === "/" || p.startsWith("/work") },
  { href: "/about", label: "About", match: (p: string) => p.startsWith("/about") },
] as const;

/** Primary navigation. The section you are in is set in ink; the rest recede. */
export function SiteNav() {
  const pathname = usePathname() ?? "/";
  return (
    <nav aria-label="Primary" className="flex gap-7 text-sm">
      {LINKS.map(({ href, label, match }) => {
        const on = match(pathname);
        return (
          <Link
            key={href}
            href={href}
            aria-current={on ? (pathname === href || pathname === `${href}/` ? "page" : "true") : undefined}
            className={`transition-colors ${on ? "text-ink" : "text-muted hover:text-ink"}`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
