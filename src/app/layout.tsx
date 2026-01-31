import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { WebVitals } from "@/app/_components/web-vitals";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Batch 25 Web",
    template: "%s | Batch 25 Web",
  },
  description:
    "Next.js app with accessibility, SEO, and Core Web Vitals examples.",
  openGraph: {
    type: "website",
    siteName: "Batch 25 Web",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WebVitals />
        {/* Skip link: first focusable element for keyboard users (accessibility) */}
        <a
          href="#main-content"
          className="skip-link absolute left-4 top-4 z-50 -translate-y-16 rounded-md bg-zinc-900 px-4 py-2 text-white transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:bg-white dark:text-zinc-900"
        >
          Skip to main content
        </a>
        <header className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800" role="banner">
          <nav aria-label="Main navigation" className="flex gap-4">
            <Link href="/" className="text-sm font-medium hover:underline focus-visible:outline focus-visible:ring-2 focus-visible:ring-zinc-500">
              Home
            </Link>
            <Link href="/examples/accessibility" className="text-sm font-medium hover:underline focus-visible:outline focus-visible:ring-2 focus-visible:ring-zinc-500">
              Accessibility
            </Link>
            <Link href="/examples/seo" className="text-sm font-medium hover:underline focus-visible:outline focus-visible:ring-2 focus-visible:ring-zinc-500">
              SEO
            </Link>
            <Link href="/examples" className="text-sm font-medium hover:underline focus-visible:outline focus-visible:ring-2 focus-visible:ring-zinc-500">
              Examples
            </Link>
          </nav>
        </header>
        <div id="main-content" tabIndex={-1}>
          <SessionProvider>
            {children}
          </SessionProvider>
        </div>
        <footer className="border-t border-zinc-200 px-4 py-3 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400" role="contentinfo">
          Batch 25 Web — Accessibility, SEO & Core Web Vitals examples
        </footer>
      </body>
    </html>
  );
}
