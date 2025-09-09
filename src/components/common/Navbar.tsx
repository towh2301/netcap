"use client";

import clsx from "clsx";
import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import React, { JSX, useState } from "react";

export const NavBar = (): JSX.Element => {
	const [search, setSearch] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault;
		if (search.trim()) {
			console.log("Searching: ", search);
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
					<Link href="/my-list">My List</Link>
					<Link href="/about">About</Link>
				</div>

				{/* Search */}
				<form
					onSubmit={handleSearch}
					className="hidden md:flex items-center bg-gray-800 rounded-lg px-3 py-1"
				>
					<input
						type="text"
						placeholder="Search..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="bg-transparent outline-none text-white px-2"
					/>
					<button
						type="submit"
						className="text-gray-400 hover:text-white"
					>
						<Search size={18} />
					</button>
				</form>

				{/* Mobile Hamburger */}
				<button
					className="md:hidden text-white"
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? <X size={28} /> : <Menu size={28} />}
				</button>
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
					<Link href="/my-list" onClick={() => setIsOpen(false)}>
						My List
					</Link>

					{/* Mobile Search */}
					<form
						onSubmit={handleSearch}
						className="flex items-center bg-gray-800 rounded-lg px-3 py-1"
					>
						<input
							type="text"
							placeholder="Search..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="bg-transparent outline-none text-white px-2 w-full"
						/>
						<button
							type="submit"
							className="text-gray-400 hover:text-white"
						>
							<Search size={18} />
						</button>
					</form>
				</div>
			)}
		</nav>
	);
};
