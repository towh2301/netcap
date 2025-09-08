export interface Genre {
	id: number;
	name: string;
}

export interface Movie {
	id: number;
	title: string;
	overview?: string | null;
	poster_path?: string | null;
	backdrop_path?: string | null;
	release_date?: string | null;
	genres?: Genre[];
	vote_average?: number;
	runtime?: number | null;
}

export interface Video {
	id: string;
	key: string;
	site: string;
	type: string;
	name?: string;
}

export interface CastMember {
	id: number;
	name: string;
	character?: string;
	profile_path?: string | null;
}

export interface MovieDetails extends Movie {
	videos?: { results: Video[] };
	credits?: { cast: CastMember[] };
	recommendations?: { results: Movie[] };
}
