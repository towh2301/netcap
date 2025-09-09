import {
	keepPreviousData,
	useQuery,
	useQueryClient,
	UseQueryOptions,
} from "@tanstack/react-query";
import { ApiResponseType, responseWrapper } from "../helpers";
import { Genre } from "@/types";
import { API_GENRE_QUERIES } from "./keys";
import { AxiosResponse } from "axios";
import { MovieApiResponse } from "../movie/types";
import { genreApis } from ".";

export const useGetGenres = (
	options?: UseQueryOptions<ApiResponseType<Genre[]>, Error>
) => {
	const queryResult = useQuery<ApiResponseType<Genre[]>, Error>({
		queryKey: [API_GENRE_QUERIES.GET_GENRES],
		queryFn: async ({ queryKey }) => {
			const [] = queryKey;

			return responseWrapper<ApiResponseType<Genre[]>>(
				genreApis.getGenres
			);
		},

		notifyOnChangeProps: ["data", "isFetching"],
		placeholderData: keepPreviousData,
		enabled: true,
		...options,
	});

	const queryClient = useQueryClient();

	const handleInvalidateGenres = () =>
		queryClient.invalidateQueries({
			queryKey: [API_GENRE_QUERIES.GET_GENRES],
		});

	const { data: genres } = queryResult?.data || {};

	return {
		queryResult,
		genres,
		handleInvalidateGenres,
	};
};
