import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { movieApis } from ".";
import { API_MOVIE_QUERIES } from "./keys";

export type ServerDataItem = {
	name: string;
	slug?: string;
	filename?: string;
	link_embed?: string;
	link_m3u8?: string;
};

export type EpisodeServer = {
	server_name: string;
	server_data: ServerDataItem[];
};

export type MovieDetailPayload = {
	status: boolean;
	msg?: string;
	movie?: any; // flexible due to varying API shape
	episodes?: EpisodeServer[];
};

export const useGetMovieDetail = (
	slug: string,
	options?: UseQueryOptions<MovieDetailPayload, Error>
) => {
	return useQuery<MovieDetailPayload, Error>({
		queryKey: [API_MOVIE_QUERIES.MOVIES_BY_YEAR, { slug }],
		queryFn: async () => {
			const res: AxiosResponse<MovieDetailPayload> =
				await movieApis.getMovieDetail(slug);
			return res.data;
		},
		enabled: Boolean(slug),
		staleTime: 1000 * 60 * 5,
		...options,
	});
};
