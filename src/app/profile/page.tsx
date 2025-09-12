"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/stores";

import { logout } from "@/services";

export default function ProfilePage() {
	const { user, loading } = useAuthStore();

	if (loading) {
		return (
			<main className="bg-black min-h-screen text-white pt-20">
				<section className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
					<h1 className="text-3xl md:text-4xl font-bold mb-4">Profile</h1>
					<p className="text-gray-300">Loading your profile...</p>
				</section>
			</main>
		);
	}

	if (!user) {
		return (
			<main className="bg-black min-h-screen text-white pt-20">
				<section className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
					<h1 className="text-3xl md:text-4xl font-bold mb-4">Profile</h1>
					<p className="text-gray-300 mb-6">You are not signed in.</p>
					<Link href="/" className="text-sm text-red-400 hover:underline">Go back Home</Link>
				</section>
			</main>
		);
	}

	return (
		<main className="bg-black min-h-screen text-white pt-14">
			{/* Hero header */}
			<section className="relative">
				<div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-black/60 to-black pointer-events-none" />
				<div className="h-40 md:h-48 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-black to-black" />
				<div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 -mt-16 md:-mt-20 relative z-10">
					<div className="flex items-center gap-5">
						<div className="w-24 h-24 md:w-28 md:h-28 rounded-md overflow-hidden ring-2 ring-white/20 bg-gray-800">
							{user.photoURL ? (
								<Image src={user.photoURL} alt="avatar" width={112} height={112} className="w-full h-full object-cover" />
							) : (
								<div className="w-full h-full flex items-center justify-center text-3xl">
									{user.email?.[0]?.toUpperCase()}
								</div>
							)}
						</div>
						<div className="min-w-0">
							<h1 className="text-2xl md:text-3xl font-bold truncate">{user.displayName || user.email}</h1>
							<p className="text-gray-300 text-sm md:text-base truncate">{user.email}</p>
							<div className="mt-4 flex flex-wrap gap-2">
								<Link href="/my-list" className="px-3 py-1.5 text-sm rounded bg-red-600 hover:bg-red-500">My List</Link>
								<button onClick={() => logout()} className="px-3 py-1.5 text-sm rounded border border-gray-700 bg-gray-900 hover:bg-gray-800">Sign out</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Account info cards */}
			<section className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-8 md:py-10">
				<h2 className="text-lg font-semibold mb-4">Account</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="bg-gray-900 rounded-lg p-4">
						<h3 className="text-base font-semibold mb-2">Membership & Billing</h3>
						<ul className="text-gray-300 text-sm space-y-1">
							<li>Email: <span className="text-gray-400">{user.email}</span></li>
							<li>Provider: <span className="text-gray-400">{user.providerData?.[0]?.providerId || "n/a"}</span></li>
							<li>Email verified: <span className="text-gray-400">{user.emailVerified ? "Yes" : "No"}</span></li>
						</ul>
					</div>
					<div className="bg-gray-900 rounded-lg p-4">
						<h3 className="text-base font-semibold mb-2">Security</h3>
						<ul className="text-gray-300 text-sm space-y-1">
							<li>UID: <span className="text-gray-400">{user.uid}</span></li>
							<li>Created: <span className="text-gray-400">{user.metadata?.creationTime}</span></li>
							<li>Last sign-in: <span className="text-gray-400">{user.metadata?.lastSignInTime}</span></li>
						</ul>
					</div>
				</div>
			</section>
		</main>
	);
}
