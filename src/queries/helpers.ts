type ApiCall = (..._args: any[]) => Promise<any>;
export async function responseWrapper<T>(
	func: ApiCall,
	[...args]: any[] = []
): Promise<T> {
	try {
		const response = (await func(...args)) || {};

		// Success path
		if (response.status >= 200 && response.status < 300) {
			return response.data as T;
		}

		// Connection timeout hint
		if (response?.originalError?.message === "CONNECTION_TIMEOUT") {
			if (typeof window !== "undefined" && typeof window.alert === "function") {
				window.alert("Connection timeout. Please check your network and try again.");
			}
		}

		// Non-2xx – throw response payload if available
		throw response?.data ?? response;
	} catch (err) {
		// Bubble up error
		throw err as any;
	}
}

export interface ApiResponseType<T> {
	code?: number;
	status: boolean;
	items?: T[];
	data?: T;
	msg?: string;
}

export interface PaginationResponseType<T> {
	totalItems: number;
	totalItemsPerPage: number;
	currentPage: number;
	totalPages: number;
	data: T;
}

export type TableParams = {
	// skip?: number;
	// take?: number;
	// order?: string;
	// search?: string;
	// sort?: string;
	type_slug?: string;
	slug?: string;
	filterCategory?: string[];
	filterCountry?: string[];
	filterYear?: string[];
	filterType?: string[];
	sortField?: string;
	sortType?: string;
	pagination?: Pagination;
	[key: string]:
		| number
		| boolean
		| string
		| string[]
		| undefined
		| Pagination;
};

export interface Pagination {
	totalItems: number;
	totalItemsPerPage: number;
	currentPage: number;
	totalPages: number;
}

export type GetPropertiesParams = {
	[key: string]: string | number | string[] | boolean;
};
