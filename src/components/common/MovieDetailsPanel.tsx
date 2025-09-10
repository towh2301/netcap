"use client";

import React from "react";
import { EpisodeServer } from "@/queries/movie/useGetMovieDetail";
import { Genre, Country } from "@/types";
import { cn } from "@/lib/utils";

export type MovieDetailsPanelProps = {
  movie?: {
    name?: string;
    origin_name?: string;
    year?: number;
    time?: string;
    quality?: string;
    lang?: string;
    episode_current?: string;
    category?: Genre[];
    country?: Country[];
  } | null;
  episodes?: EpisodeServer[];
  serverIndex: number;
  setServerIndex: (index: number) => void;
  episodeIndex: number;
  setEpisodeIndex: (index: number) => void;
  className?: string;
};

export function MovieDetailsPanel({
  movie,
  episodes = [],
  serverIndex,
  setServerIndex,
  episodeIndex,
  setEpisodeIndex,
  className,
}: MovieDetailsPanelProps) {
  const title = movie?.origin_name || movie?.name || "Unknown";
  const metaBits = [
    movie?.year ? String(movie.year) : undefined,
    movie?.time,
    movie?.quality,
    movie?.lang,
    movie?.episode_current,
  ].filter(Boolean) as string[];

  const categories = (movie?.category || []).map((c) => c.name).join(", ");
  const countries = (movie?.country || []).map((c) => c.name).join(", ");

  const currentServer = episodes[serverIndex];

  return (
    <aside className={cn("space-y-3", className)}>
      <div>
        <h1 className="text-2xl font-bold mb-1 line-clamp-2">{title}</h1>
        {metaBits.length > 0 && (
          <p className="text-sm text-gray-300">{metaBits.join(" • ")}</p>
        )}
        {(categories || countries) && (
          <p className="text-xs text-gray-400 mt-1">
            {categories && <span>Genres: {categories}</span>}
            {categories && countries && <span> • </span>}
            {countries && <span>Country: {countries}</span>}
          </p>
        )}
      </div>

      {/* Servers */}
      {episodes.length > 0 && (
        <div>
          <h2 className="text-sm uppercase tracking-wide text-gray-400 mb-2">Servers</h2>
          <div className="flex flex-wrap gap-2">
            {episodes.map((srv, idx) => (
              <button
                key={`${srv.server_name}-${idx}`}
                onClick={() => {
                  setServerIndex(idx);
                  setEpisodeIndex(0);
                }}
                className={cn(
                  "px-3 py-1 rounded text-xs border transition-colors",
                  idx === serverIndex
                    ? "bg-red-600 border-red-600 text-white"
                    : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                )}
                aria-pressed={idx === serverIndex}
              >
                {srv.server_name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Episodes */}
      {currentServer?.server_data?.length ? (
        <div>
          <h2 className="text-sm uppercase tracking-wide text-gray-400 mb-2">Episodes</h2>
          <div className="flex flex-wrap gap-2 max-h-64 overflow-auto pr-2 custom-scrollbar">
            {currentServer.server_data.map((ep, idx) => (
              <button
                key={`${ep.name}-${idx}`}
                onClick={() => setEpisodeIndex(idx)}
                className={cn(
                  "px-3 py-1 rounded text-xs border transition-colors",
                  idx === episodeIndex
                    ? "bg-red-500 border-red-500 text-white"
                    : "bg-gray-900 border-gray-700 hover:bg-gray-800"
                )}
                aria-pressed={idx === episodeIndex}
              >
                {ep.name}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </aside>
  );
}
