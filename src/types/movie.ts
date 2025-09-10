// =========================
// 🔹 Movie (basic)
// =========================
export interface MovieBasic {
	_id: string;
	name: string;
	slug: string;
	origin_name: string;
	poster_url: string;
	thumb_url: string;
	year: number;
	tmdb?: Tmdb;
	imdb?: Imdb;
	modified?: Modified;
}

export interface Tmdb {
	type?: string | null;
	id?: string | null;
	season?: number | null;
	vote_average: number;
	vote_count: number;
}

export interface Imdb {
	id: string | null;
}

export interface Modified {
	time: string;
}

// =========================
// 🔹 Movie (detailed)
// =========================
export interface MovieDetail extends MovieBasic {
	type: string;
	sub_docquyen: boolean;
	chieurap: boolean;
	time: string;
	episode_current: string;
	quality: string;
	lang: string;
	category: Genre[];
	country: Country[];
	created?: Created;
}

export interface Created {
	time: string;
}

// =========================
// 🔹 Category / Country / Year
// =========================
export interface Genre {
	_id: string;
	name: string;
	slug: string;
}

export interface Country {
	_id: string;
	name: string;
	slug: string;
}

// For API `/nam`
export interface YearItem {
	_id: string;
	year: number;
	slug: string;
}

// =========================
// 🔹 SEO & Pagination
// =========================
export interface SeoOnPage {
	og_type: string;
	titleHead: string;
	descriptionHead: string;
	og_image: string[];
	og_url: string;
}

export interface BreadCrumb {
	name: string;
	slug?: string;
	isCurrent: boolean;
	position: number;
}

// // =========================
// // 🔹 Wrapper for list APIs
// // =========================
// export interface MovieListResponse {
// 	status: boolean;
// 	msg: string;
// 	data: {
// 		seoOnPage: SeoOnPage;
// 		breadCrumb: BreadCrumb[];
// 		titlePage: string;
// 		items: MovieDetail[];
// 		params: Params;
// 		type_list: string;
// 		APP_DOMAIN_FRONTEND: string;
// 		APP_DOMAIN_CDN_IMAGE: string;
// 	};
// }
