import type { Metadata } from "next";
import { AccessibleForm, AccessibleModalTrigger } from "./_components";

export const metadata: Metadata = {
  title: "Accessibility Examples | Batch 25 Web",
  description: "Examples for implementing accessibility: skip links, ARIA, semantic HTML, focus management.",
};

export default function AccessibilityExamplesPage() {
  return (
    <main className="min-h-screen p-6" role="main">
      <article className="mx-auto max-w-3xl space-y-10">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">
            Accessibility Examples
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Skip links, semantic HTML, ARIA, keyboard support, and focus
            management.
          </p>
        </header>

        <section aria-labelledby="skip-link-heading">
          <h2 id="skip-link-heading" className="text-xl font-semibold">
            1. Skip link
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            A skip link lets keyboard users jump to the main content. It’s
            visible on focus (see root layout). Tab once on page load to see it.
          </p>
        </section>

        <section aria-labelledby="semantic-heading">
          <h2 id="semantic-heading" className="text-xl font-semibold">
            2. Semantic HTML
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Use <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">&lt;main&gt;</code>,{" "}
            <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">&lt;nav&gt;</code>,{" "}
            <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">&lt;article&gt;</code>,{" "}
            <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">&lt;section&gt;</code> and
            heading levels (h1 → h2) so screen readers and SEO understand
            structure.
          </p>
        </section>

        <section aria-labelledby="aria-heading">
          <h2 id="aria-heading" className="text-xl font-semibold">
            3. ARIA and labels
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Buttons and icons need <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">aria-label</code> when
            there’s no visible text. Use <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">aria-labelledby</code> to
            associate sections with headings.
          </p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              aria-label="Close dialog"
              className="rounded border border-zinc-300 px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-zinc-600"
            >
              Close (aria-label)
            </button>
            <button
              type="button"
              aria-label="Open menu"
              className="rounded border border-zinc-300 px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-zinc-600"
            >
              Menu
            </button>
          </div>
        </section>

        <section aria-labelledby="form-heading">
          <h2 id="form-heading" className="text-xl font-semibold">
            4. Accessible form
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Every input has a visible label (or aria-label). Errors use{" "}
            <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">aria-describedby</code> and{" "}
            <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">aria-invalid</code>.
          </p>
          <AccessibleForm />
        </section>

        <section aria-labelledby="modal-heading">
          <h2 id="modal-heading" className="text-xl font-semibold">
            5. Focus trap (modal)
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Modals should trap focus and return it when closed. This example
            uses a simple focusable wrapper.
          </p>
          <AccessibleModalTrigger />
        </section>
      </article>
    </main>
  );
}
