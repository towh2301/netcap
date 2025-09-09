"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const LocaleSwitcher = () => {
	const pathname = usePathname();

	// remove old locale prefix (/en or /vi)
	const cleanPath = pathname.replace(/^\/(en|vi)/, "");

	return (
		<div className="flex gap-4">
			<Link href={`/en${cleanPath}`} className="hover:underline">
				English
			</Link>
			<Link href={`/vi${cleanPath}`} className="hover:underline">
				Tiếng Việt
			</Link>
		</div>
	);
};
