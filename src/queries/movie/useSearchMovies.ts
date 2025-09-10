import { keepPreviousData, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { movieApis } from ".";
import { API_MOVIE_QUERIES } from "./keys";
import { MovieApiResponse } from "./types";
import { MovieDetail } from "@/types";

export type UseSearchMoviesParams = {
  keyword: string;
  pageNumber?: number;
};

// Raw API response type for search endpoint (partial)
type RawSearchResponse = {
  status: string; // "success" | ...
  msg: string;
  data: {
    items: MovieDetail[];
    params: {
      pagination: {
        totalItems: number;
        totalItemsPerPage: number;
        currentPage: number;
        totalPages: number;
      };
    };
    APP_DOMAIN_CDN_IMAGE?: string;
  };
};

export const useSearchMovies = (
  { keyword, pageNumber = 1 }: UseSearchMoviesParams,
  options?: UseQueryOptions<MovieApiResponse, Error>
) => {
  const queryResult = useQuery<MovieApiResponse, Error>({
    queryKey: [API_MOVIE_QUERIES.NEW_MOVIES, { keyword, page: pageNumber }],
    queryFn: async ({ queryKey }) => {
      const [_key, params] = queryKey as [string, { keyword: string; page: number }];
      const res: AxiosResponse<RawSearchResponse> = await movieApis.searchMovies(
        params.keyword,
        params.page
      );

      const raw = res.data;
      const cdn = raw?.data?.APP_DOMAIN_CDN_IMAGE || "";

      // Normalize image URLs (prefix CDN domain if relative)
      const items: MovieDetail[] = (raw?.data?.items || []).map((it) => {
        const prefix = (url?: string) =>
          url && !/^https?:\/\//i.test(url) ? `${cdn}/${url}`.replace(/([^:])\/+/g, "$1/") : url || "";
        return {
          ...it,
          poster_url: prefix(it.poster_url),
          thumb_url: prefix(it.thumb_url),
        } as MovieDetail;
      });

      const pagination = raw?.data?.params?.pagination || {
        totalItems: 0,
        totalItemsPerPage: 0,
        currentPage: params.page,
        totalPages: 1,
      };

      const mapped: MovieApiResponse = {
        status: String(raw?.status).toLowerCase() === "success",
        msg: raw?.msg || "",
        items,
        pagination,
      };

      return mapped;
    },
    enabled: Boolean(keyword && keyword.trim().length > 0),
    placeholderData: keepPreviousData,
    ...options,
  });

  const movies: MovieDetail[] = queryResult.data?.items ?? [];
  const pagination = queryResult.data?.pagination;

  return {
    ...queryResult,
    movies,
    pagination,
  };
};
