/**
 * Renders JSON-LD structured data in a script tag.
 * Use for WebPage, Article, Organization, etc. for SEO.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
