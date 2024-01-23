import { useEffect } from "react";

import { Loader } from "../components/Loader";
import { Movie } from "../components/Movie";

export const MovieDetails = () => {
  useEffect(() => {
    dispatch(getMovie(id ? parseInt(id, 10) : 0));

    return () => {
      dispatch(resetState);
    };
  }, [dispatch]);

  useEffect(() => {
    if (id !== movie.id?.toString()) {
      dispatch(getMovie(id ? parseInt(id, 10) : 0));
    }
  }, [id, movie.id]);

  return movie.isFetching ? (
    <Loader />
  ) : (
    <Movie movie={movie} genres={genres} />
  );
};
