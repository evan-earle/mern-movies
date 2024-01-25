/* eslint-disable react/prop-types */
import { IMAGES_PATH, COVER_PLACEHOLDER } from "../config";
import { MovieState } from "../context/MovieProvider";

export const Movie = () => {
  const { movie, setMovie } = MovieState();

  const formatRunTime = (runtime) => {
    const hours = Math.floor(runtime / 60) + "h";
    const minutes = (runtime % 60) + "m";
    return `${hours} ${minutes}`;
  };

  return (
    <>
      {movie && (
        <div className="flex w-9/12 text-white mt-10">
          <div className="w-3/12 mr-5">
            {movie.poster_path ? (
              <img
                className="w-full "
                src={`${IMAGES_PATH}/w300${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <img src={`${COVER_PLACEHOLDER}`} alt={movie.title} />
            )}
          </div>
          <div className="w-8/12">
            <h1 className="text-5xl">{movie.title}</h1>
            {movie.runtime && (
              <h3 className="mt-5">
                {formatRunTime(movie.runtime)} ·{" "}
                {new Date(movie.release_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                ·{" "}
                {movie.production_countries
                  .map((country) => country.name)
                  .join(", ")}
              </h3>
            )}
            {movie.overview && <h3 className="mt-5">{movie.overview}</h3>}

            {movie.genres && (
              <h3 className="mt-5">
                {movie.genres.map((genre) => genre.name).join(", ")}
              </h3>
            )}
          </div>
        </div>
      )}
    </>
  );
};
