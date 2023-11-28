import { Movie, Movies } from "../utils/interfaces";
import axios from "axios";

const { VITE_API_KEY, VITE_API_URL } = import.meta.env;

export const discoverMovies = async () => {
  const { data } = await axios.get<Movies>(
    `${VITE_API_URL}/discover/movie?api_key=${VITE_API_KEY}`
  );
  return data;
};

export const searchMovies = async (search: string) => {
  const { data } = await axios.get<Movies>(
    `${VITE_API_URL}/search/movie?api_key=${VITE_API_KEY}&query=${search}`
  );
  return data;
};

export const movieDetails = async (movieId: string) => {
  const { data } = await axios.get<Movie>(
    `${VITE_API_URL}/movie/${movieId}?api_key=${VITE_API_KEY}`
  );
  return data;
};
