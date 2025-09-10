import {
	keepPreviousData,
	useQuery,
	useQueryClient,
	UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { movieApis } from ".";
import { API_MOVIE_QUERIES } from "./keys";
import { MovieApiResponse } from "./types";
import { MovieDetail } from "@/types";

type CustomParams = {
	pageNumber?: number;
};

export const useGetNewMoviesV2 = (
	{ pageNumber = 1 }: CustomParams = {},
	options?: UseQueryOptions<MovieApiResponse, Error>
) => {
	const queryClient = useQueryClient();

	const queryResult = useQuery<MovieApiResponse, Error>({
		queryKey: [API_MOVIE_QUERIES.NEW_MOVIES, { page: pageNumber }],
		queryFn: async ({ queryKey }) => {
			const [_key, params] = queryKey as [string, { page: number }];
			const res: AxiosResponse<MovieApiResponse> =
				await movieApis.getNewMoviesV2(params.page);

			return res.data; // ✅ unwrap here
		},
		placeholderData: keepPreviousData,
		...options,
	});

	const handleInvalidateNewMovies = () =>
		queryClient.invalidateQueries({
			queryKey: [API_MOVIE_QUERIES.NEW_MOVIES],
		});

	// ✅ neatly extract data + pagination
	const movies_v2: MovieDetail[] = queryResult.data?.items ?? [];
	const pagination = queryResult.data?.pagination ?? {
		totalItems: 0,
		totalItemsPerPage: 0,
		currentPage: 1,
		totalPages: 1,
	};

	return {
		...queryResult,
		movies_v2,
		pagination,
		handleInvalidateNewMovies,
	};
};
