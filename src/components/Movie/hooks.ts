import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieDetails } from "../../api/movies";
import { Movie } from "../../utils/interfaces";

export const useMovie = () => {
  const [movie, setMovie] = useState<Movie>();
  const [hasError, setHasError] = useState(false);
  const { movieId } = useParams();
  useEffect(() => {
    if (!movieId) return;
    void (async () => {
      try {
        const movie = await movieDetails(movieId);
        setMovie(movie);
      } catch {
        setHasError(true);
      }
    })();
  }, [movieId]);
  return { movie, hasError };
};
