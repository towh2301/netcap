type ApiCall = (..._args: any[]) => Promise<any>;
export async function responseWrapper<T>(
	func: ApiCall,
	[...args]: any[] = []
): Promise<T> {
	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async (res, rej) => {
		try {
			const response = (await func(...args)) || {};
			if (response.status >= 200 && response.status < 300)
				res(response.data);
			if (response?.originalError?.message === "CONNECTION_TIMEOUT") {
				alert(
					"Connection timeout. Please check your network and try again."
				);
			}
			rej(response.data);
		} catch (err) {
			rej(err);
		}
	});
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
function alert(arg0: string) {
	throw new Error("Function not implemented.");
}
