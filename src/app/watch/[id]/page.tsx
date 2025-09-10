"use client";

import { useGetMovieDetail } from "@/queries";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function WatchPage() {
	const params = useParams<{ id: string }>();
	const router = useRouter();
	const slug = params?.id as string; // treat dynamic segment as slug

	const { data, isLoading, isError } = useGetMovieDetail(slug);

	const allEpisodes = data?.episodes ?? [];
	const firstServer = allEpisodes[0];
	const [serverIndex, setServerIndex] = useState(0);
	const [episodeIndex, setEpisodeIndex] = useState(0);

	const currentServer = allEpisodes[serverIndex] ?? firstServer;
	const currentEpisode = currentServer?.server_data?.[episodeIndex];

	const playerSrc = useMemo(() => {
		console.log(currentEpisode?.link_m3u8)
		return currentEpisode?.link_embed || currentEpisode?.link_m3u8 || "";
	}, [currentEpisode]);

	return (
		<main className="bg-black min-h-screen text-white pt-20 px-6 md:px-10 lg:px-16 pb-10">
			<button
				onClick={() => router.back()}
				className="text-sm text-gray-300 hover:text-white mb-4"
			>
				← Back
			</button>

			{isLoading && <p>Loading...</p>}
			{isError && <p className="text-red-400">Failed to load movie.</p>}

			{data?.movie ? (
				<div className="grid md:grid-cols-3 gap-6">
					<div className="md:col-span-2 aspect-video bg-netflix-dark rounded-lg overflow-hidden">
						{playerSrc ? (
							<iframe
								title={data.movie?.name || data.movie?.origin_name || slug}
								src={playerSrc}
								className="w-full h-full"
								allowFullScreen
							/>
						) : (
							<div className="w-full h-full flex items-center justify-center text-gray-400">
								No playable source for this episode.
							</div>
						)}
					</div>
					<div>
						<h1 className="text-2xl font-bold mb-2">{data.movie?.origin_name || data.movie?.name}</h1>
						<p className="text-sm text-gray-300 mb-4">{data.movie?.year && `Year: ${data.movie.year}`}</p>

						{/* Servers */}
						<div className="flex flex-wrap gap-2 mb-4">
							{allEpisodes.map((srv, idx) => (
								<button
									key={idx}
									onClick={() => {
										setServerIndex(idx);
										setEpisodeIndex(0);
									}}
									className={`px-3 py-1 rounded text-sm ${idx === serverIndex ? "bg-red-600" : "bg-gray-700"}`}
								>
									{srv.server_name}
								</button>
							))}
						</div>

						{/* Episodes */}
						<div className="flex flex-wrap gap-2 max-h-64 overflow-auto pr-2">
							{(currentServer?.server_data ?? []).map((ep, idx) => (
								<button
									key={idx}
									onClick={() => setEpisodeIndex(idx)}
									className={`px-3 py-1 rounded text-sm ${idx === episodeIndex ? "bg-red-500" : "bg-gray-800"}`}
								>
									{ep.name}
								</button>
							))}
						</div>
					</div>
				</div>
			) : (
				<p>Cannot find movie with slug: {slug}</p>
			)}
		</main>
	);
}
