"use client";

import { MovieDetail } from "@/types";
import { MovieCard } from "./MovieCard";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MovieRowProps {
	title: string;
	movies: MovieDetail[];
}

export const MovieRow = ({ title, movies }: MovieRowProps) => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [isHovered, setIsHovered] = useState(false);

	// Smooth scroll by a fixed amount
	const scroll = (direction: "left" | "right") => {
		if (scrollRef.current) {
			const scrollAmount = direction === "left" ? -400 : 400;
			scrollRef.current.scrollBy({
				left: scrollAmount,
				behavior: "smooth",
			});
		}
	};

	// Handle keyboard navigation for accessibility
	const handleKeyDown = (
		e: React.KeyboardEvent,
		direction: "left" | "right"
	) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			scroll(direction);
		}
	};

	return (
		<section className="mt-10 px-4 sm:px-6 md:px-10 lg:px-14 bg-black">
			<h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-5 tracking-tight">
				{title}
			</h2>

			<div
				className="relative group"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{/* Left Arrow */}
				{isHovered && movies.length > 5 && (
					<button
						onClick={() => scroll("left")}
						onKeyDown={(e) => handleKeyDown(e, "left")}
						className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-black/80 to-transparent p-3 pr-5 rounded-r-lg text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex focus:outline-none focus:ring-2 focus:ring-white/50"
						aria-label={`Scroll ${title} left`}
					>
						<ChevronLeft size={32} strokeWidth={2.5} />
					</button>
				)}

				{/* Movie list: Ensure scrollbar is hidden */}
				<div
					ref={scrollRef}
					className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 md:grid md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 md:gap-4 lg:gap-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
				>
					{movies.map((movie) => (
						<div
							key={movie._id}
							className="snap-start min-w-[150px] sm:min-w-[180px] md:min-w-0 transition-all duration-300 hover:scale-110 hover:z-20 hover:shadow-2xl"
						>
							<MovieCard
								title={movie.origin_name}
								image={movie.poster_url}
							/>
						</div>
					))}
				</div>

				{/* Right Arrow */}
				{isHovered && movies.length > 5 && (
					<button
						onClick={() => scroll("right")}
						onKeyDown={(e) => handleKeyDown(e, "right")}
						className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-l from-black/80 to-transparent p-3 pl-5 rounded-l-lg text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex focus:outline-none focus:ring-2 focus:ring-white/50"
						aria-label={`Scroll ${title} right`}
					>
						<ChevronRight size={32} strokeWidth={2.5} />
					</button>
				)}
			</div>
		</section>
	);
};
