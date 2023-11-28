import { Link } from "react-router-dom";
import { useMovies, useSearchQueryParams } from "./hooks";

const Movies = () => {
  const { search, setSearch } = useSearchQueryParams();
  const { movies, hasError } = useMovies(search);
  if (hasError) return <p>Something wrong happened, please try again</p>;
  if (!movies) return <p>Loading...</p>;
  return (
    <>
      <h1>Movies</h1>
      <label>
        Search :
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </label>
      <ul>
        {movies?.results.map(({ id, title }) => (
          <li key={id}>
            <Link to={`/movie/${id}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Movies;
