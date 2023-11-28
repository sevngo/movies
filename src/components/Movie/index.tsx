import { useMovie } from "./hooks";

const Movie = () => {
  const { movie, hasError } = useMovie();
  if (hasError) return <p>Something wrong happened, please try again</p>;
  if (!movie) return <p>Loading...</p>;
  return (
    <>
      <h1>Movie</h1>
      <h2>{movie.original_title}</h2>
      <p>{movie.release_date}</p>
      <p>{movie.overview}</p>
    </>
  );
};

export default Movie;
