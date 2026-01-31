"use client";
import { signOut } from "next-auth/react";

export default function ButtonSignout() {
  const handleSignOut = async () => {
    try {
      await signOut({
        callbackUrl: "/auth/register",
        redirect: true,
      });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSignOut();
    }
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      onKeyDown={handleKeyDown}
      aria-label="Sign out of your account"
      className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:border-zinc-600 dark:hover:bg-zinc-800 dark:focus-visible:outline-zinc-400"
    >
      Sign out
    </button>
  );
}
