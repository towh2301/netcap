"use client";

import { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";

interface MovieRowProps {
	title: string;
	movies: Movie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
	if (!movies?.length) return null;

	return (
		<section className="space-y-4 py-4">
			<h2 className="px-4 text-2xl font-semibold">{title}</h2>
			<div className="relative">
				<div className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide">
					{movies.map((movie) => (
						<MovieCard key={movie.id} movie={movie} />
					))}
				</div>
			</div>
		</section>
	);
}
