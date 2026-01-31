"use client";

import { useState, useRef, useEffect } from "react";

export function AccessibleModalTrigger() {
  const [open, setOpen] = useState(false);
  const previousActiveRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      previousActiveRef.current = document.activeElement as HTMLElement | null;
      modalRef.current?.focus();
    } else if (previousActiveRef.current) {
      previousActiveRef.current.focus();
      previousActiveRef.current = null;
    }
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [open]);

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="rounded border border-zinc-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:border-zinc-600"
      >
        Open modal
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          ref={modalRef}
          tabIndex={-1}
        >
          <div className="max-w-sm rounded-lg bg-white p-6 shadow-xl dark:bg-zinc-800">
            <h3 id="modal-title" className="text-lg font-semibold">
              Accessible modal
            </h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Focus is moved here. Press Escape to close.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-4 rounded bg-zinc-900 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:bg-white dark:text-zinc-900"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
