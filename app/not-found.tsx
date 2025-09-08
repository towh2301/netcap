import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
	const t = useTranslations("not-found");

	return (
		<div className="relative h-screen w-full flex items-center justify-center text-white">
			{/* Background image */}
			<div className="absolute inset-0">
				<img
					src="/images/astronaut-in-space.jpg"
					alt="Lost in Space"
					className="h-full w-full object-cover"
				/>
				{/* Dark blur Overlay */}
				<div className="absolute inset-0 bg-black/60" />
			</div>

			{/* Content */}
			<div className="relative z-10 text-center px-4">
				<h1 className="text-4xl md:text-6xl font-bold mb-4">
					{t(`title`)}
				</h1>
				<p className="text-lg md:text-xl mb-6">{t(`description`)}</p>

				<Link
					href="/"
					className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition"
				>
					NetCap Home
				</Link>

				<p className="text-lg mt-6 text-gray-300">
					{t(`code`)}{" "}
					<span className="text-white font-bold">NA-404</span>
				</p>
			</div>
		</div>
	);
}
