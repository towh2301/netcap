import { keepPreviousData, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { movieApis } from ".";
import { API_MOVIE_QUERIES } from "./keys";
import { MOVIE_TYPES } from "../keys";
import { MovieDetail } from "@/types";
import { MovieApiResponse } from "./types";

// Raw response type for list endpoint
interface RawListResponse {
  status: string;
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
}

export type UseGetMovieListParams = {
  type: MOVIE_TYPES;
  pageNumber?: number;
  options?: {
    sort_field?: string;
    sort_type?: "asc" | "desc";
    sort_lang?: string;
    category?: string; // genre slug
    country?: string; // country slug
    year?: number;
    limit?: number;
  };
};

export const useGetMovieList = (
  { type, pageNumber = 1, options }: UseGetMovieListParams,
  queryOptions?: UseQueryOptions<MovieApiResponse, Error>
) => {
  const queryResult = useQuery<MovieApiResponse, Error>({
    queryKey: [API_MOVIE_QUERIES.MOVIES_BY_YEAR, { // reuse enum group
      type,
      page: pageNumber,
      options,
    }],
    queryFn: async ({ queryKey }) => {
      const [_key, params] = queryKey as [string, { type: MOVIE_TYPES; page: number; options?: UseGetMovieListParams["options"] }];
      const res: AxiosResponse<RawListResponse> = await movieApis.getMovieList(
        params.type,
        params.page,
        params.options,
      );
      const raw = res.data;
      const cdn = raw?.data?.APP_DOMAIN_CDN_IMAGE || "";

      const items: MovieDetail[] = (raw?.data?.items || []).map((it) => {
        const prefix = (url?: string) =>
          url && !/^https?:\/\//i.test(url)
            ? `${cdn}/${url}`.replace(/([^:])\/+/g, "$1/")
            : url || "";
        return {
          ...it,
          poster_url: prefix(it.poster_url),
          thumb_url: prefix(it.thumb_url),
        } as MovieDetail;
      });

      const pagination = raw?.data?.params?.pagination || {
        totalItems: 0,
        totalItemsPerPage: 0,
        currentPage: pageNumber,
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
    placeholderData: keepPreviousData,
    ...queryOptions,
  });

  const movies: MovieDetail[] = queryResult.data?.items ?? [];
  const pagination = queryResult.data?.pagination;

  return {
    ...queryResult,
    movies,
    pagination,
  };
};
