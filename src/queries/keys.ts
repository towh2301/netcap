export const BASE_URL = process.env.API_URL || "https://phimapi.com";

// Movie types for consistent usage
export enum MOVIE_TYPES {
	SERIES = "phim-bo",
	MOVIE = "phim-le",
	CARTOON = "hoat-hinh",
	THEATER = "chieu-rap",
}

export const API_URLS = {
	// Latest updated movies
	NEW_MOVIES: (page: number = 1) =>
		`${BASE_URL}/danh-sach/phim-moi-cap-nhat?page=${page}`,

	NEW_MOVIES_V2: (page: number = 1) =>
		`${BASE_URL}/danh-sach/phim-moi-cap-nhat?page=${page}`,

	NEW_MOVIES_V3: (page: number = 1) =>
		`${BASE_URL}/danh-sach/phim-moi-cap-nhat?page=${page}`,

	// Movie detail + episodes
	MOVIE_DETAIL: (slug: string) => `${BASE_URL}/phim/${slug}`,

	// Movie list with filter/sort options
	MOVIE_LIST: (
		type: MOVIE_TYPES,
		page: number = 1,
		options?: {
			sort_field?: string;
			sort_type?: "asc" | "desc";
			sort_lang?: string;
			category?: string;
			country?: string;
			year?: number;
			limit?: number;
		}
	) => {
		const query = new URLSearchParams({
			page: String(page),
			...(options?.sort_field && { sort_field: options.sort_field }),
			...(options?.sort_type && { sort_type: options.sort_type }),
			...(options?.sort_lang && { sort_lang: options.sort_lang }),
			...(options?.category && { category: options.category }),
			...(options?.country && { country: options.country }),
			...(options?.year && { year: String(options.year) }),
			...(options?.limit && { limit: String(options.limit) }),
		});
		return `${BASE_URL}/v1/api/danh-sach/${type}?${query.toString()}`;
	},

	// Search movies
	SEARCH: (keyword: string, page: number = 1) =>
		`${BASE_URL}/v1/api/tim-kiem?keyword=${keyword}&page=${page}`,

	// Genre list
	GENRES: `${BASE_URL}/the-loai`,

	// Country list
	COUNTRIES: `${BASE_URL}/quoc-gia`,

	// Movies by year
	YEAR: (year: number, page: number = 1) =>
		`${BASE_URL}/v1/api/nam/${year}?page=${page}`,

	// Convert image to webp format
	TO_WEBP: (imageUrl: string) =>
		`${BASE_URL}/image.php?url=${encodeURIComponent(imageUrl)}`,
};
