"use client";

import Link from "next/link";

export default function MyListPage() {
	return (
		<main className="bg-black min-h-screen text-white pt-20 px-6 md:px-10 lg:px-16 pb-10">
			<h1 className="text-3xl md:text-4xl font-bold mb-4">My List</h1>
			<p className="text-gray-300 mb-6">
				Your saved movies and series will appear here. This feature is not yet
				connected to a backend in this project scaffold.
			</p>
			<Link
				href="/"
				className="text-sm text-red-400 hover:underline"
			>
				Go back Home
			</Link>
		</main>
	);
}
