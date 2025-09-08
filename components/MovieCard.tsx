"use client";

import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/types/movie";

const POSTER_BASE = "https://image.tmdb.org/t/p/w342";

export default function MovieCard({ movie }: { movie: Movie }) {
	const poster = movie.poster_path
		? `${POSTER_BASE}${movie.poster_path}`
		: "/app-images/poster-placeholder.png";

	return (
		<article className="w-40 sm:w-48">
			<Link href={`/movie/${movie.id}`} className="block group">
				<div className="relative h-60 sm:h-72 rounded-md overflow-hidden bg-muted">
					<Image
						src={poster}
						alt={movie.title}
						fill
						sizes="(max-width: 640px) 40vw, 200px"
						className="object-cover transition-transform group-hover:scale-105"
					/>
				</div>
				<h3 className="mt-2 text-sm font-medium line-clamp-2">
					{movie.title}
				</h3>
				<p className="text-xs text-muted-foreground">
					{movie.release_date?.slice(0, 4)}
				</p>
			</Link>
		</article>
	);
}
