"use client";

import { useState } from "react";

/**
 * Simple demo: shows that Web Vitals are collected on this page.
 * In a real app you'd send metrics to analytics (e.g. gtag).
 */
export function WebVitalsDemo() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Interact with the button below. FID/INP will be reported when you
        click. Check the browser console for Web Vitals logs.
      </p>
      <button
        type="button"
        onClick={() => setClicked(true)}
        className="mt-3 rounded bg-zinc-900 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:bg-white dark:text-zinc-900"
      >
        {clicked ? "Clicked! (check console)" : "Click me"}
      </button>
    </div>
  );
}
