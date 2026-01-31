"use client";

import { useReportWebVitals } from "next/web-vitals";

/**
 * Core Web Vitals reporting component.
 * Reports: LCP (Largest Contentful Paint), FID (First Input Delay),
 * CLS (Cumulative Layout Shift), FCP (First Contentful Paint), TTFB, INP.
 * In production you'd send these to your analytics (e.g. Google Analytics).
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log in development; in production send to analytics
    if (process.env.NODE_ENV === "development") {
      console.log("[Web Vitals]", metric.name, {
        value: metric.value,
        id: metric.id,
        rating: metric.rating,
        delta: metric.delta,
      });
    }
    // Example: send to Google Analytics (uncomment when gtag is available)
    // if (typeof window !== "undefined" && window.gtag) {
    //   window.gtag("event", metric.name, {
    //     value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
    //     event_label: metric.id,
    //     non_interaction: true,
    //   });
    // }
  });

  return null;
}
