import Link from "next/link";
import ButtonAction from "./_components/button-action";
import { getUsers } from "../_actions/users";
import type { User } from "../types/user";

export default async function Contact() {
  const users = await getUsers();
  return <div className="flex flex-col items-center justify-center">
    Contact page
    <ButtonAction />
    <Link href="/contact/1">Contact 1</Link>
    <ul>
      {users.map((user: User) => (
        <li key={user.id}>Username: {user.username} - Name: {user.name}</li>
      ))}
    </ul>
  </div>;
}

// server component