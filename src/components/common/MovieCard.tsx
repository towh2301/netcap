interface MovieCardProps {
	title: string;
	image: string;
}

export const MovieCard = ({ title, image }: MovieCardProps) => {
	return (
		<div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-gray-900 shadow-md group">
			{/* Poster Image */}
			<img
				src={image}
				alt={title}
				loading="lazy"
				className="w-full h-full object-cover transition-transform duration-300 group-hover:brightness-105"
			/>
			{/* Hover Overlay with Title */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
				<h3 className="text-sm font-semibold text-white truncate">
					{title}
				</h3>
				{/* Optional: Add more details like rating or year */}
				<p className="text-xs text-gray-300 hidden group-hover:block">
					2023 • ★ 8.5
				</p>
			</div>
		</div>
	);
};
