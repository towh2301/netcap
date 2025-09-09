import { useHttpPublicRequest } from "@/services";
import { API_URLS, BASE_URL } from "../keys";

const useApis = (baseUrl = BASE_URL) => {
	const publicApi = useHttpPublicRequest(baseUrl);

	const getNewMovies = (pageNumber?: number) => {
		return publicApi.get(`${API_URLS.NEW_MOVIES(pageNumber)}`);
	};

	return {
		getNewMovies,
	};
};

export default useApis;
