import type { Metadata } from "next";
import Link from "next/link";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const description =
  "Product designer building scalable platforms that help companies build and ship faster and better. Walmart, Sam's Club, Twitter, Tesla.";

export const metadata: Metadata = {
  metadataBase: new URL("https://fredkimdesign.github.io"),
  title: {
    default: "Fred Kim — Product Designer",
    template: "%s — Fred Kim",
  },
  description,
  openGraph: {
    title: "Fred Kim — Product Designer",
    description,
    url: "/",
    siteName: "Fred Kim",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Fred Kim — product designer" }],
  },
  twitter: { card: "summary_large_image", creator: "@fredkimdesign", images: ["/og.png"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="bg-paper text-ink flex min-h-full flex-col">
        <a href="#main" className="skip-link">Skip to content</a>
        <header className="mx-auto flex w-full max-w-5xl items-baseline justify-between px-8 py-10">
          <Link href="/" className="font-display text-lg tracking-tight">
            Fred Kim
          </Link>
          <nav className="flex gap-7 text-sm text-muted">
            <Link href="/" className="hover:text-ink transition-colors">
              Work
            </Link>
            <Link href="/about" className="hover:text-ink transition-colors">
              About
            </Link>
            <a
              href="mailto:fredkimdesign@gmail.com"
              className="hover:text-ink transition-colors"
            >
              Email
            </a>
          </nav>
        </header>
        <main id="main" className="flex-1">{children}</main>
        <footer className="mx-auto mt-40 w-full max-w-5xl px-8 text-sm text-faint">
          <div className="border-rule flex flex-wrap items-baseline justify-between gap-4 border-t py-12">
            <a
              href="mailto:fredkimdesign@gmail.com"
              className="hover:text-ink transition-colors"
            >
              fredkimdesign@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/fredjameskim/" className="hover:text-ink transition-colors">
              LinkedIn
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
