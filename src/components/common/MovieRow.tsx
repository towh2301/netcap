"use client";

import { MovieDetail } from "@/types";
import { MovieCard } from "./MovieCard";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button"; // Shadcn/UI Button
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MovieRowProps {
	title: string;
	movies: MovieDetail[];
}

export const MovieRow = ({ title, movies }: MovieRowProps) => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [isHovered, setIsHovered] = useState(false);

	// Smooth scroll
	const scroll = (direction: "left" | "right") => {
		if (scrollRef.current) {
			const scrollAmount = direction === "left" ? -400 : 400;
			scrollRef.current.scrollBy({
				left: scrollAmount,
				behavior: "smooth",
			});
		}
	};

	// Keyboard navigation for accessibility
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
		<section className="mt-10 px-4 sm:px-6 md:px-10 lg:px-14 bg-netflix-black">
			<h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-5 tracking-tight z-20">
				{title}
			</h2>

			<div
				className="relative group"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{/* Left Arrow */}
				{isHovered && movies.length > 5 && (
					<Button
						variant="ghost"
						size="icon"
						onClick={() => scroll("left")}
						onKeyDown={(e) => handleKeyDown(e, "left")}
						className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-black/60 to-transparent 
             rounded-r-lg text-white opacity-70 hover:opacity-100 transition duration-300 hidden sm:flex"
					>
						<ChevronLeft size={32} strokeWidth={2.5} />
					</Button>
				)}

				{/* Movie list */}
				<div
					ref={scrollRef}
					className="flex gap-6 md:gap-10 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-10 px-20 pt-2 z-10"
				>
					{movies.map((movie) => (
						<div
							key={movie._id}
							className="snap-start min-w-[150px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px] xl:min-w-[250px] 
             transition-all duration-300 hover:scale-104 hover:z-10 hover:shadow-2xl"
						>
							<MovieCard movie={movie} />
						</div>
					))}
				</div>

				{/* Right Arrow */}
				{isHovered && movies.length > 5 && (
					<Button
						variant="ghost"
						size="icon"
						onClick={() => scroll("right")}
						onKeyDown={(e) => handleKeyDown(e, "right")}
						className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-l from-netflix-black/80 to-transparent rounded-l-lg text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex hover:bg-netflix-dark/80"
						aria-label={`Scroll ${title} right`}
					>
						<ChevronRight size={32} strokeWidth={2.5} />
					</Button>
				)}
			</div>
		</section>
	);
};
