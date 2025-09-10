import { useHttpPublicRequest } from "@/services";
import { API_URLS, BASE_URL, MOVIE_TYPES } from "../keys";

const useApis = (baseUrl = BASE_URL) => {
	const publicApi = useHttpPublicRequest(baseUrl);

	// New/updated movies
	const getNewMovies = (pageNumber?: number) => {
		return publicApi.get(`${API_URLS.NEW_MOVIES(pageNumber)}`);
	};

	const getNewMoviesV2 = (pageNumber?: number) => {
		return publicApi.get(`${API_URLS.NEW_MOVIES_V2(pageNumber)}`);
	};
	const getNewMoviesV3 = (pageNumber?: number) => {
		return publicApi.get(`${API_URLS.NEW_MOVIES_V3(pageNumber)}`);
	};

	// Search
	const searchMovies = (keyword: string, pageNumber?: number) => {
		return publicApi.get(`${API_URLS.SEARCH(keyword, pageNumber)}`);
	};

	// Detail
	const getMovieDetail = (slug: string) => {
		return publicApi.get(`${API_URLS.MOVIE_DETAIL(slug)}`);
	};

	// List by type and options
	const getMovieList = (
		type: MOVIE_TYPES,
		pageNumber?: number,
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
		return publicApi.get(`${API_URLS.MOVIE_LIST(type, pageNumber, options)}`);
	};

	return {
		getNewMovies,
		getNewMoviesV2,
		getNewMoviesV3,
		searchMovies,
		getMovieDetail,
		getMovieList,
	};
};

export default useApis;
