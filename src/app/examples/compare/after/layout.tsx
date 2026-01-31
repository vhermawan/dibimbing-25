import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const pageUrl = `${siteUrl}/examples/compare/after`;
const ogImage = "https://picsum.photos/seed/headphones/1200/630";

/**
 * Best-practice metadata for Lighthouse "after" comparison (SEO optimized).
 */
export const metadata: Metadata = {
  title: "Premium Wireless Headphones | Batch 25 Web",
  description:
    "Buy Premium Wireless Headphones with noise canceling, 30hr battery, and Bluetooth 5.0. High-quality sound, comfortable fit. $199. Free shipping. Shop now.",
  keywords: [
    "wireless headphones",
    "noise canceling headphones",
    "Bluetooth headphones",
    "premium audio",
    "headphones 30hr battery",
  ],
  openGraph: {
    title: "Premium Wireless Headphones | Batch 25 Web",
    description:
      "Buy Premium Wireless Headphones with noise canceling, 30hr battery, Bluetooth 5.0. $199. Free shipping.",
    url: pageUrl,
    type: "website",
    siteName: "Batch 25 Web",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Premium Wireless Headphones - product image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Wireless Headphones | Batch 25 Web",
    description:
      "Buy Premium Wireless Headphones. Noise canceling, 30hr battery, $199.",
    images: [ogImage],
  },
  alternates: {
    canonical: pageUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  other: {
    "theme-color": "#171717",
  },
};

export default function AfterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
