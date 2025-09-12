"use client";

import {useGetCountries, useGetGenres} from "@/queries/generic";
import clsx from "clsx";
import {Menu, Search, X} from "lucide-react";
import Link from "next/link";
import React, {JSX, useState} from "react";
import {ModeToggle} from "./ModeToggle";
import GenericDropdown from "./GenericDropdown";
import {Country, Genre} from "@/types";
import {useRouter} from "next/navigation";
import {useAuthStore} from "@/stores";
import Image from "next/image";
import {loginWithGoogle, logout} from "@/services";

export const NavBar = (): JSX.Element => {
	const [search, setSearch] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const {genres} = useGetGenres();
	const {countries} = useGetCountries();
	const router = useRouter();
	const {user, loading} = useAuthStore();

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		const q = search.trim();
		if (q) {
			router.push(`/search?query=${encodeURIComponent(q)}`);
		}
	};

	return (
		<nav className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-md shadow-md z-50">
			<div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 ">
				{/* Logo */}
				<Link href="/" className="text-2xl font-bold text-red-600">
					NetCap
				</Link>

				{/* Navigation Links */}
				<div className="hidden md:flex space-x-6 text-white">
					<Link href="/">Home</Link>
					<Link href="/movies">Movies</Link>
					<Link href="/series">Series</Link>
					<Link href="/cartoon">Cartoons</Link>

					<GenericDropdown<Genre>
						items={genres}
						label="Categories"
						getKey={(item) => item._id}
						getHref={(item) => `/genre/${item.slug}`}
						getLabel={(item) => item.name}
					/>
					<GenericDropdown<Country>
						items={countries}
						label="Countries"
						getKey={(item) => item._id}
						getHref={(item) => `/country/${item.slug}`}
						getLabel={(item) => item.name}
					/>
					{user ? <Link href="/my-list">My List</Link> : null}
					<Link href="/about">About</Link>
				</div>

				{/* Search */}
				<div className="flex gap-4">
					{/*<ModeToggle/>*/}
					<form
						onSubmit={handleSearch}
						className="hidden md:flex items-center bg-gray-800 rounded-lg px-3 py-1"
					>
						<input
							type="text"
							placeholder="Search..."
							aria-label="Search movies"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="bg-transparent text-white px-2 outline-none rounded"
						/>
						<button
							type="submit"
							aria-label="Submit search"
							className="text-gray-400 hover:text-white outline-none rounded"
						>
							<Search size={18}/>
						</button>
					</form>

					{/* Auth/User */}
					<div className="hidden md:flex items-center gap-3 text-white">
						{loading ? (
							<span className="text-sm text-gray-300">Loading...</span>
						) : user ? (
							<div className="flex items-center gap-3">
								<div className="relative group">
									<Link href="/profile" className="flex items-center gap-2">
										<div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700">
											{user.photoURL ? (
												<Image src={user.photoURL} alt="avatar" width={32} height={32}/>
											) : (
												<div className="w-full h-full flex items-center justify-center text-xs">
													{user.email?.[0]?.toUpperCase()}
												</div>
											)}
										</div>
										<span
											className="text-sm hidden lg:inline max-w-[160px] truncate">{user.displayName || user.email}</span>
									</Link>
									{/* Hover dropdown */}
									<div
										className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-700 rounded-md shadow-lg py-1">
										<Link href="/profile"
										      className="block px-3 py-2 text-sm hover:bg-gray-800">Profile</Link>
										<button onClick={() => logout()}
										        className="w-full text-left block px-3 py-2 text-sm text-red-300 hover:text-red-400 hover:bg-gray-800">Sign
											out
										</button>
									</div>
								</div>
							</div>
						) : (
							<button onClick={() => loginWithGoogle()}
							        className="text-sm font-medium text-black bg-white px-4 py-1.5 rounded-full border border-gray-200 shadow hover:bg-gray-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
								Sign in
							</button>
						)}
					</div>

					{/* Mobile Hamburger */}
					<button
						className="md:hidden text-white focus-visible:ring-2 focus-visible:ring-red-500 rounded"
						onClick={() => setIsOpen(!isOpen)}
						aria-label={isOpen ? "Close menu" : "Open menu"}
						aria-controls="mobile-menu"
						aria-expanded={isOpen}
					>
						{isOpen ? <X size={28}/> : <Menu size={28}/>}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			{isOpen && (
				<div
					className={clsx(
						"md:hidden fixed top-14 left-0 w-full bg-black/95 px-6 pb-6 flex flex-col space-y-4 text-white transform transition-all duration-500 ease-in-out",
						isOpen
							? "translate-y-0 opacity-100"
							: "-translate-y-full opacity-0"
					)}
				>
					<Link href="/" onClick={() => setIsOpen(false)}>
						Home
					</Link>
					<Link href="/movies" onClick={() => setIsOpen(false)}>
						Movies
					</Link>
					<Link href="/series" onClick={() => setIsOpen(false)}>
						Series
					</Link>
					<Link href="/cartoon" onClick={() => setIsOpen(false)}>Cartoons</Link>

					<GenericDropdown<Genre>
						items={genres}
						label="Categories"
						getKey={(item) => item._id}
						getHref={(item) => `/genre/${item.slug}`}
						getLabel={(item) => item.name}
						onClick={() => setIsOpen(false)}
					/>
					<GenericDropdown<Country>
						items={countries}
						label="Countries"
						getKey={(item) => item._id}
						getHref={(item) => `/country/${item.slug}`}
						getLabel={(item) => item.name}
						onClick={() => setIsOpen(false)}
					/>
					{user ? <Link href="/my-list" onClick={() => setIsOpen(false)}>
						My List
					</Link> : null}
					<Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
					{/* Auth/User */}
					{/* Auth/User - Mobile */}
					<div className="flex md:hidden items-center gap-3 text-white">
						{loading ? (
							<span className="text-sm text-gray-300">Loading...</span>
						) : user ? (
							<div className="flex items-center gap-3">
								<Link href="/profile" onClick={() => setIsOpen(false)}
								      className="flex items-center gap-2">
									<div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700">
										{user.photoURL ? (
											<Image src={user.photoURL} alt="avatar" width={32} height={32}/>
										) : (
											<div className="w-full h-full flex items-center justify-center text-xs">
												{user.email?.[0]?.toUpperCase()}
											</div>
										)}
									</div>
									<span
										className="text-sm max-w-[160px] truncate">{user.displayName || user.email}</span>
								</Link>
								<button
									onClick={() => {
										logout();
										setIsOpen(false);
									}}
									className="text-sm text-red-300 hover:text-red-400"
								>
									Sign out
								</button>
							</div>
						) : (
							<button
								onClick={() => {
									loginWithGoogle();
									setIsOpen(false);
								}}
								className="text-sm font-medium text-black bg-white px-4 py-1.5 rounded-full border border-gray-200 shadow hover:bg-gray-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
							>
								Sign in
							</button>
						)}
					</div>

					{/* Mobile Search */}
					<form
						onSubmit={handleSearch}
						className="flex items-center bg-gray-800 rounded-lg px-3 py-1"
					>
						<input
							type="text"
							placeholder="Search..."
							aria-label="Search movies"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="bg-transparent outline-none text-white px-2 w-full rounded"
						/>
						<button
							type="submit"
							aria-label="Submit search"
							className="text-gray-400 hover:text-white focus-visible:ring-2 focus-visible:ring-red-500 rounded"
						>
							<Search size={18}/>
						</button>
					</form>


				</div>
			)}
		</nav>
	);
};
