import axios, { AxiosInstance } from "axios";

export const useHttpPublicRequest = (baseURL: string): AxiosInstance => {
	return axios.create({
		baseURL: baseURL,
		timeout: 10000,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
