import {cn} from "@/lib/utils";
import {MovieDetail} from "@/types";
import Link from "next/link";
import {Play} from "lucide-react";
import {AddToMyListButton} from "@/components";
import React from "react";

export const MovieCard = ({movie}: { movie: MovieDetail }) => {
	const rating = movie?.tmdb?.vote_average;

	return (
		<div
			className={cn(
				"relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-netflix-dark shadow-md",
				"group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
			)}
		>
			{/* Clickable area (poster + gradient + play button) */}
			<Link href={`/watch/${movie?.slug}`} className="block w-full h-full">
				<img
					src={movie?.poster_url}
					alt={movie?.name}
					loading="lazy"
					className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02] group-hover:brightness-105"
				/>

				{/* Top badges */}
				<div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
					{movie?.quality && (
						<span className="px-2 py-0.5 rounded bg-black/70 text-white text-[10px] border border-white/10">
              {movie.quality}
            </span>
					)}
					{movie?.lang && (
						<span className="px-2 py-0.5 rounded bg-black/70 text-white text-[10px] border border-white/10">
              {movie.lang}
            </span>
					)}
				</div>

				{typeof rating === "number" && rating > 0 && (
					<div
						className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded bg-yellow-500/90 text-black text-[10px] font-semibold">
						★ {rating.toFixed(1)}
					</div>
				)}

				{/* Center play icon on hover */}
				<div
					className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
					<div
						className="size-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white">
						<Play className="size-5"/>
					</div>
				</div>

				{/* Bottom gradient + title */}
				<div
					className={cn(
						"absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent",
						"p-3"
					)}
				>
					<h3 className="text-sm font-semibold text-white truncate">
						{movie?.origin_name}
					</h3>
					<p className="text-[11px] text-gray-300 flex items-center gap-1">
						{movie?.year}
						{movie?.episode_current && (
							<span
								className="ml-2 px-1.5 py-0.5 rounded bg-white/10 text-white/90 border border-white/10">
                {movie.episode_current}
              </span>
						)}
					</p>
				</div>
			</Link>

			{/* Add to My List button (outside the Link, so no navigation) */}
			{movie?._id && (
				<div className="absolute bottom-2 right-2 z-20">
					<AddToMyListButton
						size="sm"
						movie={{
							_id: movie._id,
							name: (movie.name || movie.origin_name || "Unknown") as string,
							slug: (movie as any).slug,
							poster_url: (movie as any).poster_url,
							thumb_url: (movie as any).thumb_url,
							year: (movie.year as number) || 0,
						}}
					/>
				</div>
			)}
		</div>
	);
};
