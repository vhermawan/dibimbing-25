/**
 * AFTER: Same structure as "before" but with best practices for Performance ~90,
 * Accessibility, Best Practices, and SEO.
 *
 * Practices:
 * - Semantic HTML (main, article, section, h1/h2), list/table markup
 * - next/image with width/height (no CLS), priority on LCP image only
 * - No blocking scripts; no heavy client JS on this page
 * - Descriptive alt, labels, unique ids, rel="noopener noreferrer"
 * - Sufficient contrast, touch targets min 44px, focus-visible
 */
import Image from "next/image";
import { JsonLd } from "@/app/examples/seo/_components/json-ld";
import { NewsletterForm } from "./_components/newsletter-form";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const pageUrl = `${siteUrl}/examples/compare/after`;

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Premium Wireless Headphones",
  description:
    "High-quality wireless headphones with noise canceling, 30hr battery, and Bluetooth 5.0. Comfortable fit, premium sound.",
  image: [
    "https://picsum.photos/seed/headphones/300/300",
    "https://picsum.photos/seed/1/400/300",
    "https://picsum.photos/seed/2/400/300",
    "https://picsum.photos/seed/3/400/300",
  ],
  url: pageUrl,
  sku: "PWH-001",
  brand: {
    "@type": "Brand",
    name: "Batch 25 Audio",
  },
  offers: {
    "@type": "Offer",
    price: "199",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: pageUrl,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Examples", item: `${siteUrl}/examples` },
    { "@type": "ListItem", position: 3, name: "Premium Wireless Headphones", item: pageUrl },
  ],
};

export default function CompareAfterPage() {
  return (
    <main id="main-content" className="min-h-screen p-6" role="main">
      <article className="mx-auto max-w-2xl" aria-labelledby="product-title">
        <JsonLd data={productJsonLd} />
        <JsonLd data={breadcrumbJsonLd} />

        <header>
          <h1 id="product-title" className="text-3xl font-bold tracking-tight">
            Premium Wireless Headphones
          </h1>
        </header>

        {/* Product hero - LCP image with priority */}
        <section
          className="mt-6 flex flex-col gap-6 sm:flex-row"
          aria-labelledby="product-details-heading"
        >
          <h2 id="product-details-heading" className="sr-only">
            Product details
          </h2>
          <Image
            src="https://picsum.photos/seed/headphones/300/300"
            alt="Premium Wireless Headphones product image"
            width={200}
            height={200}
            className="rounded-lg object-cover"
            priority
            sizes="200px"
          />
          <div className="flex flex-1 flex-col justify-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              High-quality sound. 30hr battery.
            </p>
            <p className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              $199.00
            </p>
            <button
              type="button"
              aria-label="Increase quantity"
              className="mt-4 flex min-h-[44px] min-w-[44px] items-center justify-center self-start rounded-lg border border-zinc-300 bg-zinc-100 px-3 py-2 text-lg font-medium text-zinc-900 transition-colors hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:focus-visible:outline-zinc-400"
            >
              +
            </button>
          </div>
        </section>

        {/* Banner - dimensions to avoid CLS */}
        <section className="mt-8" aria-labelledby="banner-heading">
          <h2 id="banner-heading" className="sr-only">
            Promotional banner
          </h2>
          <Image
            src="https://picsum.photos/seed/banner/800/200"
            alt="Promotional banner - summer collection"
            width={400}
            height={100}
            className="max-w-full rounded-lg object-cover"
            sizes="(max-width: 400px) 100vw, 400px"
          />
        </section>

        {/* Gallery - lazy loaded, explicit dimensions */}
        <section className="mt-6 flex flex-wrap gap-4" aria-labelledby="gallery-heading">
          <h2 id="gallery-heading" className="sr-only">
            Product gallery
          </h2>
          <Image
            src="https://picsum.photos/seed/1/400/300"
            alt="Premium Wireless Headphones - angle view 1"
            width={400}
            height={300}
            className="rounded-lg object-cover"
            sizes="(max-width: 400px) 100vw, 400px"
          />
          <Image
            src="https://picsum.photos/seed/2/400/300"
            alt="Premium Wireless Headphones - angle view 2"
            width={400}
            height={300}
            className="rounded-lg object-cover"
            sizes="(max-width: 400px) 100vw, 400px"
          />
          <Image
            src="https://picsum.photos/seed/3/400/300"
            alt="Premium Wireless Headphones - angle view 3"
            width={400}
            height={300}
            className="rounded-lg object-cover"
            sizes="(max-width: 400px) 100vw, 400px"
          />
        </section>

        {/* Features - semantic list */}
        <section className="mt-6" aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-lg font-bold">
            Features
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-zinc-600 dark:text-zinc-400">
            <li>Noise canceling</li>
            <li>30hr battery</li>
            <li>Bluetooth 5.0</li>
          </ul>
        </section>

        {/* Specs table - proper th/scope */}
        <section className="mt-6 overflow-x-auto" aria-labelledby="specs-heading">
          <h2 id="specs-heading" className="text-lg font-bold">
            Specifications
          </h2>
          <table className="mt-2 min-w-[200px] border border-zinc-300 dark:border-zinc-600">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="border border-zinc-300 px-2 py-1 text-left text-sm font-medium dark:border-zinc-600"
                >
                  Spec
                </th>
                <th
                  scope="col"
                  className="border border-zinc-300 px-2 py-1 text-left text-sm font-medium dark:border-zinc-600"
                >
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th
                  scope="row"
                  className="border border-zinc-300 px-2 py-1 text-left text-sm font-normal dark:border-zinc-600"
                >
                  Weight
                </th>
                <td className="border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-600">
                  250g
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="border border-zinc-300 px-2 py-1 text-left text-sm font-normal dark:border-zinc-600"
                >
                  Driver
                </th>
                <td className="border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-600">
                  40mm
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Newsletter - labeled form, unique ids */}
        <section className="mt-8" aria-labelledby="newsletter-heading">
          <h2 id="newsletter-heading" className="text-lg font-bold">
            Newsletter
          </h2>
          <NewsletterForm />
        </section>

        {/* External links - descriptive text for SEO, rel="noopener noreferrer" */}
        <nav className="mt-8" aria-label="Related links">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-900 underline hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:text-zinc-100"
            >
              View full product info and specifications at example.com
            </a>
            {" · "}
            <a
              href="https://example.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-900 underline hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:text-zinc-100"
            >
              Learn more about Premium Wireless Headphones
            </a>
            {" · "}
            <a
              href="https://example.net"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-900 underline hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:text-zinc-100"
            >
              Contact support for Premium Wireless Headphones
            </a>
          </p>
        </nav>

        {/* Related - accessible button */}
        <section className="mt-6" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-2xl font-bold">
            Related
          </h2>
          <button
            type="button"
            aria-label="View related products"
            className="mt-2 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-zinc-300 bg-zinc-100 px-4 py-2 text-zinc-900 transition-colors hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:focus-visible:outline-zinc-400"
          >
            <span aria-hidden="true">→</span>
          </button>
        </section>
      </article>
    </main>
  );
}
