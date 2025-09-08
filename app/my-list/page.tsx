import MovieCard from "@/components/MovieCard";
import React from "react";
import { sampleMovies } from "@/app/sample";

const page = () => {
	return (
		<div className="flex gap-3">
			{sampleMovies.map((movie) => (
				<MovieCard key={movie.id} movie={movie} />
			))}
		</div>
	);
};

export default page;
