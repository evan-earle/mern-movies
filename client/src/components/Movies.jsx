/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { IMAGES_PATH, COVER_PLACEHOLDER } from "../config";
import { MovieState } from "../context/MovieProvider";
import { mapGenres } from "../lib/helper";

export const Movies = () => {
  const { movies, setMovies, genre, setGenre } = MovieState();

  return (
    <div className="w-full mt-10 grid grid-cols-5 gap-4 h-full">
      {movies &&
        genre &&
        movies.results.map((movie, index) => (
          <div
            key={index}
            className="relative h-full"
            onClick={() => setMovies()}
          >
            <Link to={`/movie/${movie.id}`}>
              {movie.poster_path ? (
                <img
                  src={`${IMAGES_PATH}/w300${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <img src={`${COVER_PLACEHOLDER}`} alt={movie.title} />
              )}
              <div className="text-white absolute w-full p-3 bottom-0 bg-black/50">
                <div className="text-xl  overflow-hidden truncate">
                  {movie.title}
                  <div className="text-base">
                    {new Date(movie.release_date).toLocaleDateString("en-US", {
                      year: "numeric",
                    })}
                  </div>
                </div>

                <div className="text-sm  overflow-hidden truncate">
                  {mapGenres(movie.genre_ids, genre.genres)}
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};
