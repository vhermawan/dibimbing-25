import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Examples",
  description:
    "Accessibility, SEO, and Core Web Vitals implementation examples.",
};

export default function ExamplesPage() {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Examples</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Reference implementations for accessibility, SEO, and Core Web
            Vitals.
          </p>
        </header>
        <nav aria-label="Example pages" className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <Link
            href="/examples/accessibility"
            className="rounded-lg border border-zinc-200 p-4 transition-colors hover:bg-zinc-50 focus-visible:outline focus-visible:ring-2 focus-visible:ring-zinc-500 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            <h2 className="text-lg font-semibold">Accessibility</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Skip links, semantic HTML, ARIA, keyboard support, focus
              management.
            </p>
          </Link>
          <Link
            href="/examples/seo"
            className="rounded-lg border border-zinc-200 p-4 transition-colors hover:bg-zinc-50 focus-visible:outline focus-visible:ring-2 focus-visible:ring-zinc-500 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            <h2 className="text-lg font-semibold">SEO</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Metadata, Open Graph, Twitter cards, canonical URLs, JSON-LD.
            </p>
          </Link>
          <Link
            href="/examples/web-vitals"
            className="rounded-lg border border-zinc-200 p-4 transition-colors hover:bg-zinc-50 focus-visible:outline focus-visible:ring-2 focus-visible:ring-zinc-500 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            <h2 className="text-lg font-semibold">Core Web Vitals</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              LCP, FID, CLS, FCP, TTFB, INP reporting and optimization.
            </p>
          </Link>
          <Link
            href="/examples/compare"
            className="rounded-lg border-2 border-amber-200 p-4 transition-colors hover:bg-amber-50 focus-visible:outline focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-amber-800 dark:hover:bg-amber-950/30"
          >
            <h2 className="text-lg font-semibold">Lighthouse Compare</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Before vs After pages to compare Lighthouse scores (a11y, SEO, CWV).
            </p>
          </Link>
        </nav>
      </div>
    </main>
  );
}
