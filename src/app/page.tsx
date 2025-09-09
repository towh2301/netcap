"use client";

import { Hero, LoadingMovies, MovieRow } from "@/components";
import LoadingIndicator from "@/components/ui/loading-indicator";
import { useGetNewMovies } from "@/queries";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HomePage() {
	const {
		movies = [],
		isSuccess,
		isLoading,
	} = useGetNewMovies({ pageNumber: 1 });
	const [currentIndex, setCurrentIndex] = useState(0);

	// Auto-change banner every 10s
	useEffect(() => {
		if (movies.length === 0) return;

		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % movies.length);
		}, 10000);

		return () => clearInterval(interval);
	}, [movies]);

	if (isLoading) {
		return <LoadingMovies />;
	}
	return (
		<main className="bg-black min-h-screen text-white pt-12">
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
