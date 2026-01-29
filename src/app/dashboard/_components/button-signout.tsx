"use client";
import { signOut } from "next-auth/react";

export default function ButtonSignout() {
  const handleSignOut = async () => {
    try {     
      await signOut({ 
        callbackUrl: "/auth/register",
        redirect: true
      });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <button onClick={handleSignOut}>Sign out</button>
  )
}