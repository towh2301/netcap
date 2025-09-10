"use client";

import { Hero, LoadingMovies, MovieRow } from "@/components";
import {
	useGetNewMovies,
	useGetNewMoviesV2,
	useGetNewMoviesV3,
} from "@/queries";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HomePage() {
	const {
		movies = [],
		isSuccess: isSucc,
		isLoading: isLoad,
	} = useGetNewMovies({ pageNumber: 1 });
	const [currentIndex, setCurrentIndex] = useState(0);

	const {
		movies_v2 = [],
		isSuccess: isSuccV2,
		isLoading: isLoadV2,
	} = useGetNewMoviesV2({ pageNumber: 2 });

	const {
		movies_v3 = [],
		isSuccess: isSuccV3,
		isLoading: isLoadV3,
	} = useGetNewMoviesV3({ pageNumber: 3 });

	// Auto-change banner every 10s
	useEffect(() => {
		if (movies.length === 0) return;

		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % movies.length);
		}, 10000);

		return () => clearInterval(interval);
	}, [movies]);

	if (isLoad || isLoadV2 || isLoadV3) {
		return <LoadingMovies />;
	}
	return (
		<main className="bg-black min-h-screen text-white pt-12">
			{/* ✅ Netflix Hero Banner */}
			{isSucc && movies.length > 0 && (
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
				{isSucc && <MovieRow title="New Releases" movies={movies} />}
				{isSuccV2 && (
					<MovieRow title="Trending Now" movies={movies_v2} />
				)}
				{isSuccV3 && <MovieRow title="Top Rated" movies={movies_v3} />}
			</section>
		</main>
	);
}
