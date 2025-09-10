import { BASE_URL } from "../keys";
import { useHttpPublicRequest } from "@/services";
import { API_URLS } from "../keys";

const useApis = (baseUrl = BASE_URL) => {
	const publicApi = useHttpPublicRequest(baseUrl);

	const getGenres = () => {
		return publicApi.get(`${API_URLS.GENRES}`);
	};

	const getCountries = () => {
		return publicApi.get(`${API_URLS.COUNTRIES}`);
	};

	return {
		getGenres,
		getCountries,
	};
};

export default useApis;
