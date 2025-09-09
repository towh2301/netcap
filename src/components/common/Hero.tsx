"use client";

import { MovieDetail } from "@/types";

export const Hero = ({ movie }: { movie: MovieDetail }) => {
	return (
		<section className="relative h-[70vh] w-full bg-black">
			<img
				src={`${movie.thumb_url}`}
				alt="Hero Banner"
				className="absolute inset-0 h-full w-full object-cover opacity-60"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

			<div className="relative z-10 px-6 md:px-12 top-1/2 -translate-y-1/2">
				<h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
					{movie.name}
				</h1>
				<p className="mt-4 max-w-xl text-lg text-gray-200">
					{movie.origin_name}
				</p>
				<div className="mt-6 flex gap-4">
					<button className="rounded bg-white px-6 py-2 font-semibold text-black hover:bg-gray-200 transition">
						Play
					</button>
					<button className="rounded bg-gray-700/80 px-6 py-2 font-semibold text-white hover:bg-gray-600 transition">
						More Info
					</button>
				</div>
			</div>
		</section>
	);
};
