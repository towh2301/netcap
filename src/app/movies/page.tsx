"use client";

import { LoadingMovies, MovieCard } from "@/components";
import { Button } from "@/components/ui/button";
import { useGetNewMovies } from "@/queries";
import { useState } from "react";

export default function MoviesPage() {
	const [page, setPage] = useState(1);
	const { movies, pagination, isLoading, isError } = useGetNewMovies({ pageNumber: page });

	const canPrev = page > 1;
	const canNext = page < (pagination?.totalPages ?? page);

	if (isLoading) return <LoadingMovies />;

	return (
		<main className="bg-black min-h-screen text-white pt-20 px-6 md:px-10 lg:px-16 pb-10">
			<header className="flex items-end justify-between mb-6">
				<h1 className="text-3xl md:text-4xl font-bold">Movies</h1>
				<div className="text-sm text-gray-400">
					Page {pagination?.currentPage ?? page} / {pagination?.totalPages ?? 1}
				</div>
			</header>

			{isError && (
				<p className="text-red-400 mb-4">Failed to load movies. Please try again.</p>
			)}

			<section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
				{movies?.map((m) => (
					<MovieCard key={m._id} movie={m} />
				))}
			</section>

			<footer className="mt-8 flex items-center justify-center gap-4">
				<Button variant="secondary" disabled={!canPrev} onClick={() => canPrev && setPage((p) => p - 1)}>
					Prev
				</Button>
				<Button variant="secondary" disabled={!canNext} onClick={() => canNext && setPage((p) => p + 1)}>
					Next
				</Button>
			</footer>
		</main>
	);
}
