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

export const NavBar = (): JSX.Element => {
	const [search, setSearch] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const {genres} = useGetGenres();
	const {countries} = useGetCountries();
	const router = useRouter();

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
					<Link href="/my-list">My List</Link>
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
					<Link href="/about">About</Link>
				</div>

				{/* Search */}
				<div className="flex gap-4">
					<ModeToggle/>
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
							<Search size={18} />
						</button>
					</form>


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
					<Link href="/my-list" onClick={() => setIsOpen(false)}>
						My List
					</Link>
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
					<Link href="/about" onClick={() => setIsOpen(false)}>About</Link>

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
