/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { IMAGES_PATH, COVER_PLACEHOLDER } from "../config";
import { MovieState } from "../context/MovieProvider";
import { mapGenres } from "../lib/helper";

export const Movies = () => {
  const { movies, setMovies } = MovieState();

  console.log(movies);
  return (
    <div className="w-9/12 mt-10 grid grid-cols-5 gap-4 ">
      {movies &&
        movies.results.map((movie) => (
          <div key={movie.id} className="relative h-full">
            <Link to={`/movie/${movie.id}}`}>
              {movie.poster_path ? (
                <img
                  src={`${IMAGES_PATH}/w300${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <img src={`${COVER_PLACEHOLDER}`} alt={movie.title} />
              )}
              <div className="absolute w-full p-3 bottom-0 bg-black/50">
                <div className="text-white text-lg ">
                  {movie.title.length > 19
                    ? movie.title.substring(0, 19) + "..."
                    : movie.title}

                  {/* {mapGenres(movie.genre_ids, genres)} */}
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};
