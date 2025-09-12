"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "@/stores";
import { MovieBasic } from "@/types";

export default function MyListPage() {
	const { user, loading } = useAuthStore();
	const [items, setItems] = useState<MovieBasic[]>([]);

	const storageKey = useMemo(() => (user ? `mylist:${user.uid}` : ""), [user]);

	useEffect(() => {
		if (!user || !storageKey) {
			setItems([]);
			return;
		}
		try {
			const raw = localStorage.getItem(storageKey);
			setItems(raw ? (JSON.parse(raw) as MovieBasic[]) : []);
		} catch {
			setItems([]);
		}
	}, [user, storageKey]);

	const removeItem = (id: string) => {
		const next = items.filter((m) => m._id !== id);
		setItems(next);
		if (storageKey) localStorage.setItem(storageKey, JSON.stringify(next));
	};

	const clearAll = () => {
		setItems([]);
		if (storageKey) localStorage.removeItem(storageKey);
	};

	return (
		<main className="bg-black min-h-screen text-white pt-20 px-6 md:px-10 lg:px-16 pb-10">
			<h1 className="text-3xl md:text-4xl font-bold mb-4">My List</h1>

			{loading ? (
				<p className="text-gray-300">Loading your list...</p>
			) : !user ? (
				<div>
					<p className="text-gray-300 mb-6">Please sign in to view your list.</p>
					<Link href="/" className="text-sm text-red-400 hover:underline">Go back Home</Link>
				</div>
			) : items.length === 0 ? (
				<div>
					<p className="text-gray-300 mb-6">Your list is empty.</p>
					<Link href="/movies" className="text-sm text-red-400 hover:underline">Browse movies</Link>
				</div>
			) : (
				<div>
					<div className="flex items-center justify-between mb-4">
						<p className="text-gray-300">{items.length} item(s)</p>
						<button onClick={clearAll} className="text-xs text-gray-300 hover:text-white border border-gray-600 px-2 py-1 rounded">Clear all</button>
					</div>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
						{items.map((m) => (
							<div key={m._id} className="bg-gray-900 rounded-lg overflow-hidden group">
								<Link href={`/watch/${m.slug}`} className="block">
									<div className="relative w-full aspect-[2/3]">
										<Image src={m.poster_url || m.thumb_url} alt={m.name} fill sizes="200px" className="object-cover" />
									</div>
									<div className="p-2">
										<p className="text-sm line-clamp-2">{m.name}</p>
										<p className="text-xs text-gray-400">{m.year}</p>
									</div>
								</Link>
								<div className="p-2 pt-0">
									<button onClick={() => removeItem(m._id)} className="text-xs text-red-400 hover:underline">Remove</button>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</main>
	);
}
