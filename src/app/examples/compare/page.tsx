import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lighthouse Compare",
  description:
    "Compare Lighthouse scores: before (no best practices) vs after (accessibility, SEO, Core Web Vitals).",
};

export default function ComparePage() {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">
            Lighthouse Compare
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Run Lighthouse on both pages and compare scores to see the impact of
            accessibility, SEO, and Core Web Vitals best practices.
          </p>
        </header>

        <section aria-labelledby="how-to-heading">
          <h2 id="how-to-heading" className="text-xl font-semibold">
            How to compare
          </h2>
          <ol className="mt-4 list-inside list-decimal space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>
              Open Chrome DevTools (F12 or right-click → Inspect).
            </li>
            <li>
              Go to the <strong>Lighthouse</strong> tab.
            </li>
            <li>
              Select <strong>Performance</strong>, <strong>Accessibility</strong>,{" "}
              <strong>Best Practices</strong>, and <strong>SEO</strong>.
            </li>
            <li>
              Run Lighthouse on the <strong>Before</strong> page and save or
              note the scores.
            </li>
            <li>
              Run Lighthouse on the <strong>After</strong> page and compare.
            </li>
          </ol>
        </section>

        <nav
          aria-label="Compare pages"
          className="grid gap-4 sm:grid-cols-2"
        >
          <Link
            href="/examples/compare/before"
            className="rounded-xl border-2 border-red-200 bg-red-50 p-6 transition-colors hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 dark:border-red-900/50 dark:bg-red-950/30 dark:hover:bg-red-950/50"
          >
            <h2 className="text-lg font-semibold text-red-800 dark:text-red-200">
              Before
            </h2>
            <p className="mt-2 text-sm text-red-700 dark:text-red-300">
              Same content without best practices: poor metadata, no semantic
              HTML, missing alt text, unlabeled form, low contrast, layout
              shifts, no focus styles.
            </p>
            <span className="mt-4 inline-block text-sm font-medium text-red-600 dark:text-red-400">
              Open Before page →
            </span>
          </Link>

          <Link
            href="/examples/compare/after"
            className="rounded-xl border-2 border-green-200 bg-green-50 p-6 transition-colors hover:bg-green-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 dark:border-green-900/50 dark:bg-green-950/30 dark:hover:bg-green-950/50"
          >
            <h2 className="text-lg font-semibold text-green-800 dark:text-green-200">
              After
            </h2>
            <p className="mt-2 text-sm text-green-700 dark:text-green-300">
              Same content with best practices: full metadata, semantic HTML,
              descriptive alt, labeled form, good contrast, stable layout,
              focus-visible, JSON-LD.
            </p>
            <span className="mt-4 inline-block text-sm font-medium text-green-600 dark:text-green-400">
              Open After page →
            </span>
          </Link>
        </nav>

        <section aria-labelledby="what-heading">
          <h2 id="what-heading" className="text-xl font-semibold">
            What to look for in Lighthouse
          </h2>
          <ul className="mt-4 list-inside list-disc space-y-1 text-zinc-600 dark:text-zinc-400">
            <li>
              <strong>Performance</strong> – LCP, FID/INP, CLS; “After” should
              have better LCP/CLS (e.g. image dimensions, priority).
            </li>
            <li>
              <strong>Accessibility</strong> – “Before” will show issues like
              missing alt, low contrast, small targets, no labels; “After” should
              pass most checks.
            </li>
            <li>
              <strong>SEO</strong> – “Before” has minimal meta; “After” has
              description, canonical, structured data.
            </li>
            <li>
              <strong>Best Practices</strong> – “After” uses rel=noopener on
              external links, valid markup, etc.
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
