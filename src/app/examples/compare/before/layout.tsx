import type { Metadata } from "next";
import { PerformanceHeavy } from "./_components/performance-heavy";

/**
 * Intentionally poor metadata for Lighthouse "before" comparison.
 * No description, no Open Graph, minimal title.
 */
export const metadata: Metadata = {
  title: "Product",
  // No description - hurts SEO
  // No openGraph - hurts social sharing / SEO
  // No robots, no canonical
};

export default function BeforeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Render-blocking script: blocks main thread during parse to hurt FCP/LCP/TBT */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var s=Date.now();while(Date.now()-s<1600){}})();`,
        }}
      />
      <PerformanceHeavy />
      {children}
    </>
  );
}
