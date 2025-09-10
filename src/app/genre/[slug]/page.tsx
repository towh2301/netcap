"use client";

import {LoadingMovies, MovieCard} from "@/components";
import {Button} from "@/components/ui/button";
import {MOVIE_TYPES} from "@/queries/keys";
import {useGetMovieList} from "@/queries/movie/useGetMovieList";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import React, {useMemo} from "react";

export default function GenrePage({params}: { params: Promise<{ slug: string }>; }) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	// unwrap
	const {slug} = React.use(params);

	const page = Number(searchParams.get("page") || 1);
	const type = (searchParams.get("type") as MOVIE_TYPES) || MOVIE_TYPES.MOVIE;

	const {movies, pagination, isLoading, isError, isFetching} = useGetMovieList({
		type,
		pageNumber: page,
		options: {category: slug},
	});

	const canPrev = page > 1;
	const canNext = page < (pagination?.totalPages ?? page);

	const setParam = (key: string, value: string) => {
		const sp = new URLSearchParams(searchParams);
		sp.set(key, value);
		router.push(`${pathname}?${sp.toString()}`);
	};

	const typeOptions = useMemo(() => [
		{label: "Movies", value: MOVIE_TYPES.MOVIE},
		{label: "Series", value: MOVIE_TYPES.SERIES},
		{label: "Cartoon", value: MOVIE_TYPES.CARTOON},
		{label: "Theater", value: MOVIE_TYPES.THEATER},
	], []);

	if (isLoading) return <LoadingMovies/>;

	return (
		<main className="bg-black min-h-screen text-white pt-20 px-6 md:px-10 lg:px-16 pb-10">
			<header className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
				<div>
					<h1 className="text-2xl md:text-3xl font-bold py-3">Genre: {slug.replace(/-/g, " ")}</h1>
					<div className="text-sm text-gray-400 py-4">Type:
						<div className="inline-flex gap-2 ml-2">
							{typeOptions.map(opt => (
								<button
									key={opt.value}
									onClick={() => setParam("type", opt.value)}
									className={`px-3 py-1 rounded-md border ${type === opt.value ? "bg-white/20 border-white" : "border-white/20 hover:bg-white/10"}`}
									aria-pressed={type === opt.value}
								>{opt.label}</button>
							))}
						</div>
					</div>
				</div>
				<div
					className="text-sm text-gray-400">Page {pagination?.currentPage ?? page} / {pagination?.totalPages ?? 1}{isFetching ? " · Updating..." : ""}</div>
			</header>

			{isError && (
				<p className="text-red-400 mb-4">Failed to load movies. Please try again.</p>
			)}

			<section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
				{movies?.map((m) => (
					<MovieCard key={m._id} movie={m}/>
				))}
			</section>

			<footer className="mt-8 flex items-center justify-center gap-4">
				<Button
					variant="secondary"
					disabled={!canPrev}
					onClick={() => canPrev && setParam("page", String(page - 1))}
					aria-label="Previous page"
				>Prev</Button>
				<Button
					variant="secondary"
					disabled={!canNext}
					onClick={() => canNext && setParam("page", String(page + 1))}
					aria-label="Next page"
				>Next</Button>
			</footer>
		</main>
	);
}
