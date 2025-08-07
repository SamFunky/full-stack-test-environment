'use client';

import { useEffect, useState } from 'react';

export default function UsersPage() {
	type User = {
		id: string | number;
		name: string;
	}
	const [users, setUsers] = useState<User[]>([]);
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await fetch("/api/users");
				if (!res.ok) {
					throw new Error('Failed to fetch users');
				}
				const data = await res.json();
				setUsers(data);
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		};

		fetchUsers();
	}, []);

	return (
		<main className="p-6">
			<h1 className="text-2xl font-bold mb-4">Users</h1>
			{users.length === 0 ? (
				<p>No users found.</p>
			) : (
				<ul className="list-disc list-inside">
					{users.map((user: User) => (
						<li key={user.id}>{user.name}</li>
					))}
				</ul>
			)}
		</main>
	);
}
