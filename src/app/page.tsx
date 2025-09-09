"use client";

import { Hero, MovieRow } from "@/components";
import { useGetNewMovies } from "@/queries";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HomePage() {
	const { movies = [], isSuccess } = useGetNewMovies({ pageNumber: 1 });
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (movies.length === 0) return;

		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % movies.length);
		}, 20000);

		return () => clearInterval(interval);
	}, [movies]);

	return (
		<main className="bg-black min-h-screen text-white">
			{/* Hero Banner */}
			{isSuccess && movies.length > 0 && (
				<AnimatePresence mode="wait">
					<motion.div
						key={movies[currentIndex]._id}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 1 }}
						className="relative w-full h-[60vh] md:h-[80vh] lg:h-[90vh]"
					>
						<Hero movie={movies[currentIndex]} />
					</motion.div>
				</AnimatePresence>
			)}

			{/* Movie Rows */}
			<section className="px-4 md:px-8 space-y-8 mt-8">
				<MovieRow title="Trending Now" movies={movies} />
				<MovieRow title="New Releases" movies={movies} />
				<MovieRow title="Top Rated" movies={movies} />
			</section>
		</main>
	);
}
