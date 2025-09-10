import { Country } from "@/types";
import {
	UseQueryOptions,
	useQuery,
	keepPreviousData,
	useQueryClient,
} from "@tanstack/react-query";
import { genericApis } from ".";
import { responseWrapper } from "../helpers";
import { API_GENERIC_QUERIES } from "./keys";

export const useGetCountries = (
	options?: UseQueryOptions<Country[], Error>
) => {
	const queryResult = useQuery<Country[], Error>({
		queryKey: [API_GENERIC_QUERIES.GET_COUNTRIES],
		queryFn: async () => {
			return responseWrapper<Country[]>(genericApis.getCountries);
		},
		notifyOnChangeProps: ["data", "isFetching"],
		placeholderData: keepPreviousData,
		enabled: true,
		...options,
	});

	const queryClient = useQueryClient();

	const handleInvalidateCountries = () =>
		queryClient.invalidateQueries({
			queryKey: [API_GENERIC_QUERIES.GET_COUNTRIES],
		});

	const countries: Country[] = queryResult.data ?? [];

	return {
		queryResult,
		countries,
		handleInvalidateCountries,
	};
};
