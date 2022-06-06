import React, { useEffect, useState } from "react";
import { baseImageUrl } from "../utils";
import Axios from "../utils/axios";
import requests from "../utils/requests";
import "../styles/Banner.css";

function Banner() {
	const [movie, setMovie] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await Axios.get(requests.fetchTrending);
				const randomIndex = Math.floor(
					Math.random() * res.data.results.length - 1
				);
				setMovie(res.data.results[randomIndex]);
			} catch (err) {
				console.log(err);
			}
		};

		fetchData();
	}, []);

	const truncate = (str, n) => {
		return str?.length > n ? str.substr(0, n - 1) + "..." : str;
	};

	return (
		<header
			className="banner"
			style={{
				backgroundSize: "cover",
				backgroundImage: `url(${baseImageUrl}${movie?.backdrop_path})`,
				backgroundPosition: "center center",
			}}
		>
			<div className="banner__contents">
				<h1 className="banner__title">
					{movie?.title || movie?.name || movie?.original_name}
				</h1>

				<div className="banner__buttons">
					<button className="banner__button">Play</button>
					<button className="banner__button">My List</button>
				</div>

				<h1 className="banner__description">
					{truncate(movie?.overview, 15)}
				</h1>
			</div>

			<div className="banner--fadeBottom"></div>
		</header>
	);
}

export default Banner;
