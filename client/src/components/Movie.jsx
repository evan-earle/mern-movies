/* eslint-disable react/prop-types */
import { IMAGES_PATH, COVER_PLACEHOLDER } from "../config";
import { MovieState } from "../context/MovieProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "react-hot-toast";

export const Movie = () => {
  const { movie, setMovie } = MovieState();

  const formatRunTime = (runtime) => {
    const hours = Math.floor(runtime / 60) + "h";
    const minutes = (runtime % 60) + "m";
    return `${hours} ${minutes}`;
  };

  const addMovie = async (id) => {
    try {
      const { data } = await axios.post(`/api/users/watchlist/${id}`);

      data === true
        ? toast.error("Already on watchlist")
        : toast.success("Added!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {movie && (
        <div className="flex w-9/12 text-white mt-10 max-sm:flex-col max-sm:w-11/12 max-sm:items-center ">
          <div className="w-3/12 mr-5 relative max-sm:w-8/12">
            <div className="cursor-pointer text-green-500 text-3xl  top-0 right-0 mt-2 mr-2 absolute bg-white rounded-full  flex items-center justify-center hover:text-green-800  duration-150">
              <FontAwesomeIcon
                icon={faCirclePlus}
                onClick={() => addMovie(movie.id)}
              />
            </div>
            {movie.poster_path ? (
              <img
                className="w-full"
                src={`${IMAGES_PATH}/w300${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <img src={`${COVER_PLACEHOLDER}`} alt={movie.title} />
            )}
          </div>
          <div className="w-8/12 max-sm:w-full max-sm:mt-5">
            <h1 className="text-5xl max-sm:text-2xl">{movie.title}</h1>
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
              <h3 className="mt-5 mb-5">
                {movie.genres.map((genre) => genre.name).join(", ")}
              </h3>
            )}
          </div>
        </div>
      )}
    </>
  );
};
