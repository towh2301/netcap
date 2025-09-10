import { Genre } from "@/types";
import {
	UseQueryOptions,
	useQuery,
	keepPreviousData,
	useQueryClient,
} from "@tanstack/react-query";
import { genericApis } from ".";
import { responseWrapper } from "../helpers";
import { API_GENERIC_QUERIES } from "./keys";

export const useGetGenres = (options?: UseQueryOptions<Genre[], Error>) => {
	const queryResult = useQuery<Genre[], Error>({
		queryKey: [API_GENERIC_QUERIES.GET_GENRES],
		queryFn: async () => {
			return responseWrapper<Genre[]>(genericApis.getGenres);
		},
		notifyOnChangeProps: ["data", "isFetching"],
		placeholderData: keepPreviousData,
		enabled: true,
		...options,
	});

	const queryClient = useQueryClient();

	const handleInvalidateGenres = () =>
		queryClient.invalidateQueries({
			queryKey: [API_GENERIC_QUERIES.GET_GENRES],
		});

	const genres: Genre[] = queryResult.data ?? [];

	return {
		queryResult,
		genres,
		handleInvalidateGenres,
	};
};
