import { MovieDetail } from "@/types";

export type MovieApiResponse = {
	status: boolean;
	msg: string;
	items: MovieDetail[];
	pagination: {
		totalItems: number;
		totalItemsPerPage: number;
		currentPage: number;
		totalPages: number;
	};
};
