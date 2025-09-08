"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Movie } from "@/types/movie";
import { Button } from "@/components/ui/button";

interface HeroBannerProps {
	movie: Movie;
}

export default function HeroBanner({ movie }: HeroBannerProps) {
	const t = useTranslations("Home");
	const backdropPath = movie.backdrop_path
		? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
		: "/app-images/default-backdrop.jpg";

	return (
		<div className="relative h-[85vh] w-full">
			{/* Backdrop Image */}
			<div className="absolute inset-0">
				<Image
					src={backdropPath}
					alt={movie.title}
					fill
					className="object-cover"
					priority
				/>
				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
			</div>

			{/* Content */}
			<div className="relative h-full w-full">
				<div className="container flex h-full max-w-6xl flex-col justify-center space-y-4 px-4 pt-24 md:pt-32">
					<h1 className="max-w-2xl text-3xl font-bold md:text-5xl lg:text-6xl">
						{movie.title}
					</h1>

					<p className="max-w-lg text-sm text-muted-foreground md:text-base lg:text-lg">
						{movie.overview}
					</p>

					<div className="flex items-center gap-4 pt-4">
						<Button size="lg" asChild>
							<Link href={`/movie/${movie.id}`}>
								{t("watchNow")}
							</Link>
						</Button>
						<Button variant="outline" size="lg" asChild>
							<Link href={`/movie/${movie.id}`}>
								{t("moreInfo")}
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
