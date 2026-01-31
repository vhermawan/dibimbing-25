import type { Metadata } from "next";
import { JsonLd } from "./_components/json-ld";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  title: "SEO Examples | Batch 25 Web",
  description:
    "Examples for implementing SEO in Next.js: metadata, Open Graph, Twitter cards, and JSON-LD structured data.",
  openGraph: {
    title: "SEO Examples | Batch 25 Web",
    description:
      "Examples for implementing SEO in Next.js: metadata, Open Graph, Twitter cards, and JSON-LD.",
    url: `${siteUrl}/examples/seo`,
    siteName: "Batch 25 Web",
    type: "website",
    images: [
      {
        url: `${siteUrl}/api-test.html`, // Replace with your og-image
        width: 1200,
        height: 630,
        alt: "Batch 25 Web - SEO Examples",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Examples | Batch 25 Web",
    description: "Examples for implementing SEO in Next.js.",
  },
  alternates: {
    canonical: `${siteUrl}/examples/seo`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function SeoExamplesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "SEO Examples | Batch 25 Web",
    description:
      "Examples for implementing SEO in Next.js: metadata, Open Graph, Twitter cards, and JSON-LD structured data.",
    url: `${siteUrl}/examples/seo`,
    publisher: {
      "@type": "Organization",
      name: "Batch 25 Web",
    },
  };

  return (
    <main className="min-h-screen p-6">
      <article className="mx-auto max-w-3xl space-y-10">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">
            SEO Examples
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Metadata, Open Graph, Twitter cards, canonical URLs, and JSON-LD
            structured data.
          </p>
        </header>

        <section aria-labelledby="metadata-heading">
          <h2 id="metadata-heading" className="text-xl font-semibold">
            1. Metadata (title, description)
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            This page uses <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">export const metadata</code> in
            Next.js App Router. Set unique title and description per route for
            better search results.
          </p>
        </section>

        <section aria-labelledby="og-heading">
          <h2 id="og-heading" className="text-xl font-semibold">
            2. Open Graph & Twitter cards
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">openGraph</code> and{" "}
            <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">twitter</code> in metadata control how links
            look when shared on social media. Use og:image for a preview image.
          </p>
        </section>

        <section aria-labelledby="canonical-heading">
          <h2 id="canonical-heading" className="text-xl font-semibold">
            3. Canonical URL
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">alternates.canonical</code> tells search
            engines the preferred URL for this page, avoiding duplicate content
            issues.
          </p>
        </section>

        <section aria-labelledby="jsonld-heading">
          <h2 id="jsonld-heading" className="text-xl font-semibold">
            4. JSON-LD structured data
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Structured data helps search engines understand your content. This
            page includes a WebPage schema. Check the page source for the
            script tag.
          </p>
          <JsonLd data={jsonLd} />
        </section>
      </article>
    </main>
  );
}
