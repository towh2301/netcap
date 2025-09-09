"use client";

import { Hero, MovieRow } from "@/components";
import { useGetNewMovies } from "@/queries";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HomePage() {
	const { movies = [], isSuccess } = useGetNewMovies({ pageNumber: 1 });
	const [currentIndex, setCurrentIndex] = useState(0);

	// Auto-change banner every 10s
	useEffect(() => {
		if (movies.length === 0) return;

		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % movies.length);
		}, 10000);

		return () => clearInterval(interval);
	}, [movies]);

	return (
		<main className="bg-black min-h-screen text-white">
			{/* ✅ Netflix Hero Banner */}
			{isSuccess && movies.length > 0 && (
				<AnimatePresence mode="wait">
					<motion.div
						key={movies[currentIndex]._id}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 1 }}
						className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden"
					>
						<Hero movie={movies[currentIndex]} />

						{/* Gradient overlay */}
						<div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

						{/* Hero content */}
						<div className="absolute bottom-20 left-6 md:left-12 space-y-4 max-w-xl">
							<h1 className="text-2xl md:text-4xl font-extrabold">
								{movies[currentIndex].origin_name}
							</h1>
							<p className="hidden md:block text-lg text-gray-200 line-clamp-3">
								{movies[currentIndex].year ||
									"No description available."}
							</p>

							<div className="flex gap-4">
								<button className="bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-200">
									Play
								</button>
								<button className="bg-gray-700/70 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-600/90">
									More Info
								</button>
							</div>
						</div>
					</motion.div>
				</AnimatePresence>
			)}

			{/* ✅ Netflix Rows */}
			<section className="pb-12 md:px-8 space-y-8 -mt-16 relative z-10">
				<MovieRow title="Trending Now" movies={movies} />
				<MovieRow title="New Releases" movies={movies} />
				<MovieRow title="Top Rated" movies={movies} />
			</section>
		</main>
	);
}
