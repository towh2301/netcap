"use client";

import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

type DropdownProps<T> = {
	items?: T[];
	label: string;
	getKey: (item: T) => string | number;
	getHref: (item: T) => string;
	getLabel: (item: T) => string;
};

export default function GenericDropdown<T>({
	items,
	label,
	getKey,
	getHref,
	getLabel,
}: DropdownProps<T>) {
	return (
		<DropdownMenu>
			{/* Trigger with arrow */}
			<DropdownMenuTrigger asChild>
				<span className="flex items-center gap-1 cursor-pointer text-white hover:text-gray-300">
					{label}
					<ChevronDown className="w-4 h-4" />
				</span>
			</DropdownMenuTrigger>

			{/* Content */}
			<DropdownMenuContent
				align="start"
				className="bg-white/30 backdrop-blur-md text-white rounded-md shadow-lg p-2 grid grid-cols-2 md:grid-cols-4 gap-2 max-h-[300px] overflow-y-auto scrollbar-hide"
			>
				{items && items.length > 0 ? (
					items.map((item) => (
						<DropdownMenuItem
							key={getKey(item)}
							asChild
							className="col-span-1 p-0"
						>
							<Link
								href={getHref(item)}
								className="block w-full text-center px-2 py-1 hover:bg-gray-700 rounded-md"
							>
								{getLabel(item)}
							</Link>
						</DropdownMenuItem>
					))
				) : (
					<div className="px-2 py-1 text-gray-400 col-span-6 text-center">
						No items
					</div>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
