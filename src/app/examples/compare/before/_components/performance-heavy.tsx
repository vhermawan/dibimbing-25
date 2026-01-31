"use client";

import { useEffect } from "react";

/**
 * Intentionally blocks the main thread on mount to hurt Lighthouse Performance.
 * Simulates heavy synchronous JS (e.g. unoptimized analytics, polyfills).
 */
export function PerformanceHeavy() {
  useEffect(() => {
    const start = Date.now();
    while (Date.now() - start < 1800) {
      // Block main thread ~1.8s to tank TBT and INP
    }
  }, []);

  return null;
}
