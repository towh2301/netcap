import { Movie } from "@/types/movie";

export const sampleMovies: Movie[] = [
	{
		id: 1,
		title: "Inception",
		overview:
			"A thief who enters the dreams of others to steal their secrets is given a final mission that could restore his old life.",
		poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
		backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
		release_date: "2010-07-16",
		genres: [
			{ id: 28, name: "Action" },
			{ id: 878, name: "Science Fiction" },
			{ id: 53, name: "Thriller" },
		],
		vote_average: 8.4,
		runtime: 148,
	},
	{
		id: 2,
		title: "The Shawshank Redemption",
		overview:
			"Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
		poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
		backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
		release_date: "1994-09-23",
		genres: [
			{ id: 18, name: "Drama" },
			{ id: 80, name: "Crime" },
		],
		vote_average: 8.7,
		runtime: 142,
	},
	{
		id: 3,
		title: "Interstellar",
		overview:
			"A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
		poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
		backdrop_path: "/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg",
		release_date: "2014-11-07",
		genres: [
			{ id: 878, name: "Science Fiction" },
			{ id: 12, name: "Adventure" },
			{ id: 18, name: "Drama" },
		],
		vote_average: 8.6,
		runtime: 169,
	},
];
