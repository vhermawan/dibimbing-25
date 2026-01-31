"use client";

import { useState } from "react";

export function AccessibleForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
  };

  const errorId = "email-error";
  const inputId = "accessible-email";

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 max-w-sm space-y-2"
      noValidate
      aria-describedby={error ? errorId : undefined}
    >
      <label htmlFor={inputId} className="block text-sm font-medium">
        Email address
      </label>
      <input
        id={inputId}
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError("");
        }}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className="w-full rounded border border-zinc-300 px-3 py-2 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500 aria-[invalid=true]:border-red-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
      />
      {error && (
        <p id={errorId} role="alert" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
      <button
        type="submit"
        className="rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:bg-white dark:text-zinc-900"
      >
        Submit
      </button>
    </form>
  );
}
