import React, { useEffect, useState } from "react";
import Axios from "../utils/axios";
import { baseImageUrl } from "../utils/index";
import "../styles/Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({ title, fetchUrl, isLargeRow }) {
	const [movies, setMovies] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await Axios.get(fetchUrl);
				setMovies(res.data.results);
				return res;
			} catch (err) {
				console.log(err);
			}
		};

		fetchData();
	}, [fetchUrl]);

	const opts = {
		height: "390px",
		width: "100%",
		playerVars: {
			autoplay: 1,
		},
	};

	const handleClick = (movie) => {
		// if (trailerUrl) {
		// 	setTrailerUrl("");
		// } else {
		// movieTrailer("", { tmdbId: movie?.id })
		// 	.then((url) => {
		// 		const urlParams = new URLSearchParams(
		// 			new URL(url).search()
		// 		);
		// 		setTrailerUrl(urlParams.get("v"));
		// 		console.log(url);
		// 	})
		// 	.catch((err) => console.log(err));

		// movieTrailer("inception").then((res) => console.log(res));
		// }

		// console.log(movie);

		// movieTrailer("Oceans Eleven", { id: true, multi: true }).then(
		// 	(response) => console.log(response)
		// );

		// if (trailerUrl) {
		// 	setTrailerUrl("");
		// } else {
		// 	Axios.get(
		// 		`https://api.themoviedb.org/3/movie/${movie?.id}/videos?api_key=e11cf7edb7c528442360faa90a662482&language=en-US`
		// 	)
		// 		.then((res) => {
		// 			consoo;
		// 		})
		// 		.catch((err) => console.log(err));
		// }

		return null;
	};

	return (
		<div className="row">
			<h2>{title}</h2>

			<div className="row__posters">
				{movies.map((movie) => {
					return (
						<img
							key={movie.id}
							className={`row__poster ${
								isLargeRow && "row__posterLarge"
							}`}
							src={`${baseImageUrl}${
								isLargeRow
									? movie.poster_path
									: movie.backdrop_path
							}`}
							alt={movie.name}
							onClick={() => handleClick(movie)}
						/>
					);
				})}
			</div>

			{trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
		</div>
	);
}

export default Row;
