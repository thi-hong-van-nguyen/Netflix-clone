import axios from "axios";

const Axios = axios.create({
	baseURL: "http://api.themoviedb.org/3",
});

export default Axios;
