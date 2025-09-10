"use client";

import { LoadingMovies, MovieCard } from "@/components";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchMovies } from "@/queries";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = (searchParams.get("query") || "").trim();
  const pageParam = Number(searchParams.get("page") || "1");
  const [page, setPage] = useState(Math.max(1, pageParam));

  useEffect(() => {
    setPage(Math.max(1, pageParam));
  }, [pageParam]);

  const { movies, pagination, isLoading, isError } = useSearchMovies({ keyword: query, pageNumber: page });

  const canPrev = page > 1;
  const canNext = page < (pagination?.totalPages ?? page);

  const onChangePage = (next: number) => {
    const p = Math.max(1, next);
    const usp = new URLSearchParams(searchParams.toString());
    usp.set("page", String(p));
    router.push(`/search?${usp.toString()}`);
  };

  if (!query) {
    return (
      <main className="bg-black min-h-screen text-white pt-20 px-6 md:px-10 lg:px-16 pb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Search</h1>
        <p className="text-gray-300">Type a query in the search bar to find movies.</p>
      </main>
    );
  }

  if (isLoading) return <LoadingMovies />;

  return (
    <main className="bg-black min-h-screen text-white pt-20 px-6 md:px-10 lg:px-16 pb-10">
      <header className="flex items-end justify-between mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">Results for "{query}"</h1>
        <div className="text-sm text-gray-400">
          Page {pagination?.currentPage ?? page} / {pagination?.totalPages ?? 1}
        </div>
      </header>

      {isError && (
        <p className="text-red-400 mb-4">Failed to search. Please try again.</p>
      )}

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {movies?.map((m) => (
          <MovieCard key={m._id} movie={m} />
        ))}
      </section>

      <footer className="mt-8 flex items-center justify-center gap-4">
        <Button variant="secondary" disabled={!canPrev} onClick={() => canPrev && onChangePage(page - 1)}>
          Prev
        </Button>
        <Button variant="secondary" disabled={!canNext} onClick={() => canNext && onChangePage(page + 1)}>
          Next
        </Button>
      </footer>
    </main>
  );
}
