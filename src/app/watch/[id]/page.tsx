"use client";

import { useGetMovieDetail } from "@/queries";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { MovieDetailsPanel } from "@/components";
import Hls from "hls.js";

export default function WatchPage() {
	const params = useParams<{ id: string }>();
	const router = useRouter();
	const slug = params?.id as string;

	const { data, isLoading, isError } = useGetMovieDetail(slug);

	const allEpisodes = data?.episodes ?? [];
	const firstServer = allEpisodes[0];
	const [serverIndex, setServerIndex] = useState(0);
	const [episodeIndex, setEpisodeIndex] = useState(0);

	const currentServer = allEpisodes[serverIndex] ?? firstServer;
	const currentEpisode = currentServer?.server_data?.[episodeIndex];

	const playerSrc = useMemo(() => {
		return currentEpisode?.link_m3u8 || currentEpisode?.link_embed || "";
	}, [currentEpisode]);

	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [videoLoading, setVideoLoading] = useState(true);

	useEffect(() => {
		if (!playerSrc || !videoRef.current) return;

		let hls: Hls | null = null;

		if (Hls.isSupported()) {
			hls = new Hls();
			hls.loadSource(playerSrc);
			hls.attachMedia(videoRef.current);
		} else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
			// Safari fallback
			videoRef.current.src = playerSrc;
		}

		return () => {
			if (hls) {
				hls.destroy();
			}
		};
	}, [playerSrc]);

	return (
		<main className="bg-black min-h-screen text-white pt-20 px-6 md:px-10 lg:px-16 pb-10">
			<button
				onClick={() => router.back()}
				className="text-sm md:text-xl text-gray-300 hover:text-white mb-4"
			>
				← Back
			</button>

			<div className="w-full h-full flex items-center justify-center">
				{isLoading && <Spinner />}
				{isError && <p className="text-red-400">Failed to load movie.</p>}

				{data?.movie ? (
					<div className="grid md:grid-cols-3 gap-6 w-full">
						{/* Video Player */}
						<div className="md:col-span-2 aspect-video bg-netflix-dark rounded-lg overflow-hidden relative">
							{playerSrc ? (
								<div className="relative w-full h-full overflow-hidden rounded-2xl shadow-lg bg-black">
									<video
										ref={videoRef}
										controls
										playsInline
										className="w-full h-full rounded-2xl"
										onCanPlay={() => setVideoLoading(false)}
									/>
									{videoLoading && (
										<div className="absolute inset-0 flex items-center justify-center bg-black/50">
											<Spinner />
										</div>
									)}
								</div>
							) : (
								<div className="w-full h-full flex items-center justify-center text-gray-400">
									No playable source for this episode.
								</div>
							)}
						</div>

						{/* Movie Details & Episodes */}
						<MovieDetailsPanel
							movie={data.movie}
							episodes={allEpisodes}
							serverIndex={serverIndex}
							setServerIndex={setServerIndex}
							episodeIndex={episodeIndex}
							setEpisodeIndex={setEpisodeIndex}
						/>
					</div>
				) : (
					<p />
				)}
			</div>
		</main>
	);
}
