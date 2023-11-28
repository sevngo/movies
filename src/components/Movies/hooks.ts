import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { discoverMovies, searchMovies } from "../../api/movies";
import { Movies } from "../../utils/interfaces";

export const useMovies = (search?: string) => {
  const [movies, setMovies] = useState<Movies>();
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    void (async () => {
      let movies;
      try {
        if (search) movies = await searchMovies(search);
        else movies = await discoverMovies();
      } catch {
        setHasError(true);
      }
      setMovies(movies);
    })();
  }, [search]);
  return { movies, hasError };
};

export const useSearchQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const setSearch = (search: string) => setSearchParams({ search });
  return { search, setSearch };
};
