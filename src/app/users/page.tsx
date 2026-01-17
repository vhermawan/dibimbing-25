'use client';

import { useEffect, useState } from "react";
// import { getUsers } from "../_actions/users";
import type { User } from "../types/user";

export default function Users() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);

	
	useEffect(() => {
		const fetchUsers = async () => {
			const users = await fetch('');
			const data = await users.json();
			setUsers(data);
			setLoading(false);
		}
		fetchUsers();
	}, [])

	if (loading) {
		return <div>Loading...</div>;
	}

  return <div>
    <h1>Users</h1>
    <ul>
      {users.map((user) => <li key={user.id}>{user.name}</li>)}
    </ul>
  </div>;
}

// password supabase KBY7ZmGF5sY9uoX8