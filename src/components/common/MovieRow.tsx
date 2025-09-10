"use client";

import { MovieDetail } from "@/types";
import { MovieCard } from "./MovieCard";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button"; // Shadcn/UI Button
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface MovieRowProps {
  title: string;
  movies: MovieDetail[];
  ctaHref?: string; // optional "See all" link
  ctaLabel?: string; // custom label (defaults to "See all")
}

export const MovieRow = ({ title, movies, ctaHref, ctaLabel }: MovieRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const itemMinWidth = 220; // px (approx for scroll step)

  // Determine scrollability
  const updateScrollability = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollability();
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => updateScrollability();
    el.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => updateScrollability();
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll as any);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollRef.current, movies?.length]);

  // Smooth scroll by one card width-ish
  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const delta = direction === "left" ? -itemMinWidth * 2 : itemMinWidth * 2;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  // Wheel horizontal scrolling support
  const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    // If vertical scroll attempt inside the row, convert to horizontal
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      el.scrollBy({ left: e.deltaY, behavior: "smooth" });
    }
  };

  // Keyboard navigation for accessibility
  const handleKeyDown = (
    e: React.KeyboardEvent,
    direction: "left" | "right"
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scroll(direction);
    }
  };

  const hasMovies = (movies?.length ?? 0) > 0;
  const showArrows = hasMovies && (isHovered || canScrollLeft || canScrollRight);

  const seeAll = useMemo(() => {
    if (!ctaHref) return null;
    const label = ctaLabel || "See all";
    return (
      <Link
        href={ctaHref}
        className="text-sm text-gray-300 hover:text-white focus-visible:ring-2 focus-visible:ring-red-500 rounded"
        aria-label={`${label} for ${title}`}
      >
        {label}
      </Link>
    );
  }, [ctaHref, ctaLabel, title]);

  return (
    <section className="mt-10 px-4 sm:px-6 md:px-10 lg:px-14">
      <header className="flex items-baseline justify-between mb-5">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight z-20">
          {title}
        </h2>
        {seeAll}
      </header>

      <div
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Edge fades */}
        {canScrollLeft && (
          <div className="pointer-events-none absolute left-0 top-0 h-full w-10 sm:w-16 bg-gradient-to-r from-background to-transparent z-10" />
        )}
        {canScrollRight && (
          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 sm:w-16 bg-gradient-to-l from-background to-transparent z-10" />
        )}

        {/* Left Arrow */}
        {showArrows && canScrollLeft && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("left")}
            onKeyDown={(e) => handleKeyDown(e, "left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-black/60 to-transparent rounded-r-lg text-white opacity-70 hover:opacity-100 transition duration-300 hidden sm:flex"
            aria-label={`Scroll ${title} left`}
          >
            <ChevronLeft size={32} strokeWidth={2.5} />
          </Button>
        )}

        {/* Movie list */}
        <div
          role="list"
          aria-label={`${title} list`}
          ref={scrollRef}
          onWheel={onWheel}
          className="flex gap-6 md:gap-10 overflow-x-auto custom-scrollbar snap-x snap-mandatory pb-10 px-12 sm:px-16 md:px-20 pt-2 z-10"
        >
          {hasMovies ? (
            movies.map((movie) => (
              <div
                role="listitem"
                key={movie._id}
                className="snap-start min-w-[150px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px] xl:min-w-[250px] transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl"
              >
                <MovieCard movie={movie} />
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-400 py-6">No movies found.</div>
          )}
        </div>

        {/* Right Arrow */}
        {showArrows && canScrollRight && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("right")}
            onKeyDown={(e) => handleKeyDown(e, "right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-l from-black/60 to-transparent rounded-l-lg text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex"
            aria-label={`Scroll ${title} right`}
          >
            <ChevronRight size={32} strokeWidth={2.5} />
          </Button>
        )}
      </div>
    </section>
  );
};
