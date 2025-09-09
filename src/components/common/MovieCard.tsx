import { cn } from "@/lib/utils"; // Shadcn/UI utility for className merging
import { MovieDetail } from "@/types";

export const MovieCard = ({ movie }: { movie: MovieDetail }) => {
	return (
		<div
			className={cn(
				"relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-netflix-dark shadow-md",
				"group transition-all duration-300"
			)}
		>
			<img
				src={movie?.poster_url}
				alt={movie?.name}
				loading="lazy"
				className="w-full h-full object-cover transition-transform duration-300 group-hover:brightness-105"
			/>
			<div
				className={cn(
					"absolute inset-0 bg-gradient-to-t from-netflix-black/90 via-netflix-black/50 to-transparent",
					"opacity-0 group-hover:opacity-100 transition-opacity duration-300",
					"flex flex-col justify-end p-4"
				)}
			>
				<h3 className="text-sm font-semibold text-white truncate">
					{movie?.origin_name}
				</h3>
				{/* Optional: Add more details if MovieDetail provides them */}
				<p className="text-xs text-netflix-gray hidden group-hover:block">
					{movie?.year} - {movie?.tmdb?.vote_average}
				</p>
			</div>
		</div>
	);
};
