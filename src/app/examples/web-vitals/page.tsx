import type { Metadata } from "next";
import { WebVitalsDemo } from "./_components/web-vitals-demo";

export const metadata: Metadata = {
  title: "Core Web Vitals Examples | Batch 25 Web",
  description:
    "Examples for measuring and improving Core Web Vitals: LCP, FID, CLS, FCP, TTFB, INP.",
};

export default function WebVitalsExamplesPage() {
  return (
    <main className="min-h-screen p-6">
      <article className="mx-auto max-w-3xl space-y-10">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">
            Core Web Vitals Examples
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            LCP, FID, CLS, FCP, TTFB, and INP. Metrics are reported in the
            console (dev) or can be sent to analytics.
          </p>
        </header>

        <section aria-labelledby="what-heading">
          <h2 id="what-heading" className="text-xl font-semibold">
            What are Core Web Vitals?
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-zinc-600 dark:text-zinc-400">
            <li>
              <strong>LCP</strong> (Largest Contentful Paint) – loading
              performance
            </li>
            <li>
              <strong>FID</strong> / <strong>INP</strong> – interactivity
            </li>
            <li>
              <strong>CLS</strong> (Cumulative Layout Shift) – visual stability
            </li>
            <li>
              <strong>FCP</strong> (First Contentful Paint) – first paint
            </li>
            <li>
              <strong>TTFB</strong> (Time to First Byte) – server response
            </li>
          </ul>
        </section>

        <section aria-labelledby="implementation-heading">
          <h2 id="implementation-heading" className="text-xl font-semibold">
            Implementation
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            The root layout includes a <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">WebVitals</code>{" "}
            client component that uses <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">useReportWebVitals</code> from{" "}
            <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">next/web-vitals</code>. In development,
            metrics are logged to the console. In production, send them to
            Google Analytics or your analytics provider.
          </p>
        </section>

        <section aria-labelledby="demo-heading">
          <h2 id="demo-heading" className="text-xl font-semibold">
            Live demo
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Open DevTools → Console and reload or interact with the page. You
            should see [Web Vitals] logs with metric name, value, and rating.
          </p>
          <WebVitalsDemo />
        </section>
      </article>
    </main>
  );
}
