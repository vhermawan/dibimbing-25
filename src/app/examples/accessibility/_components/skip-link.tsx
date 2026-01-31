/**
 * Skip link: first focusable element, jumps to main content.
 * Styled to be visible only when focused (see globals.css .skip-link).
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link absolute left-4 top-4 z-50 -translate-y-16 rounded-md bg-zinc-900 px-4 py-2 text-white transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:bg-white dark:text-zinc-900"
    >
      Skip to main content
    </a>
  );
}
