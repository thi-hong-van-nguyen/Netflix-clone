import React, { useEffect, useState } from "react";
import Axios from "../utils/axios";
import { baseImageUrl } from "../utils/index";
import "../styles/Row.css";

function Row({ title, fetchUrl, isLargeRow }) {
	const [movies, setMovies] = useState([]);

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

	return (
		<div className="row">
			<h2>{title}</h2>

			<div className="row__posters">
				{movies.map((movie, idx) => {
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
						/>
					);
				})}
			</div>
		</div>
	);
}

export default Row;
