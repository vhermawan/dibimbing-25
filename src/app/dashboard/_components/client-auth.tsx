'use client';

import { useSession } from "next-auth/react";

export default function ClientAuth() {
	const session = useSession();
  return <div>ClientAuth: {session.data?.user?.email}</div>;
}