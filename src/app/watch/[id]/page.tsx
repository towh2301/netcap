"use client";

import {useGetMovieDetail} from "@/queries";
import {useParams, useRouter} from "next/navigation";
import {useMemo, useState} from "react";
import {Spinner} from '@/components/ui/shadcn-io/spinner';
import {Progress} from "@radix-ui/react-progress";
import { MovieDetailsPanel } from "@/components";

export default function WatchPage() {
	const params = useParams<{ id: string }>();
	const router = useRouter();
	const slug = params?.id as string; // treat dynamic segment as slug

	const {data, isLoading, isError} = useGetMovieDetail(slug);

	const allEpisodes = data?.episodes ?? [];
	const firstServer = allEpisodes[0];
	const [serverIndex, setServerIndex] = useState(0);
	const [episodeIndex, setEpisodeIndex] = useState(0);

	const currentServer = allEpisodes[serverIndex] ?? firstServer;
	const currentEpisode = currentServer?.server_data?.[episodeIndex];

	const playerSrc = useMemo(() => {
		return currentEpisode?.link_embed || currentEpisode?.link_m3u8 || "";
	}, [currentEpisode]);

	return (
		<main className="bg-black min-h-screen text-white pt-20 px-6 md:px-10 lg:px-16 pb-10 ">
			<button
				onClick={() => router.back()}
				className=" text-sm md:text-xl text-gray-300 hover:text-white mb-4"
			>
				← Back
			</button>

			<div className="w-full h-full flex items-center justify-center">
				{isLoading && <Spinner/>}
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
					// <p>Cannot find movie with slug: {slug}</p>
					<p></p>
				)}
			</div>

		</main>
	);
}
