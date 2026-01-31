"use client";

/**
 * Client component so we can use onSubmit without making the whole page a client component.
 * Mirrors "before" form (email + name) with labels and unique ids.
 */
export function NewsletterForm() {
  return (
    <form
      className="mt-4 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end"
      onSubmit={(e) => e.preventDefault()}
      noValidate
      aria-describedby="newsletter-desc"
    >
      <p id="newsletter-desc" className="sr-only">
        Enter your email and name to subscribe to product updates.
      </p>
      <div className="flex flex-col gap-1">
        <label htmlFor="newsletter-email" className="text-sm font-medium">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          className="min-h-[44px] rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          aria-required="true"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="newsletter-name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="newsletter-name"
          type="text"
          autoComplete="name"
          placeholder="Name"
          className="min-h-[44px] rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
        />
      </div>
      <button
        type="submit"
        className="min-h-[44px] min-w-[44px] rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:bg-white dark:text-zinc-900 dark:focus-visible:outline-zinc-400"
      >
        Subscribe
      </button>
    </form>
  );
}
