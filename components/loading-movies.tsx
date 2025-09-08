export default function LoadingMovies() {
	return (
		<div className="space-y-4 p-4">
			<div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
			<div className="flex gap-4">
				{Array.from({ length: 6 }).map((_, i) => (
					<div
						key={i}
						className="aspect-[2/3] w-40 animate-pulse rounded-md bg-muted"
					/>
				))}
			</div>
		</div>
	);
}
