import axios from "axios";
import { MovieState } from "../context/MovieProvider";
import { Loader } from "../components/Loader.jsx";
import { Nav } from "../components/Nav.jsx";
import { Header } from "../components/Header";
import { SearchMovies } from "../components/SearchMovies";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { mapGenres } from "../lib/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { IMAGES_PATH, COVER_PLACEHOLDER } from "../config";
import toast from "react-hot-toast";

export const Watchlist = () => {
  const [loading, setLoading] = useState(false);
  const { movies, setMovies, genre, setGenre, watchlist, setWatchlist } =
    MovieState();

  const fetchWatchlist = async () => {
    try {
      const { data } = await axios.get(`/api/users/watchlist/`);
      setWatchlist(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovie = async (id) => {
    try {
      await axios.delete(`/api/users/watchlist/${id}`);
      toast.success("Deleted!");
      fetchWatchlist();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchWatchlist();
    setMovies();
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col justify-center w-full items-center">
      <Nav />
      <Header />
      <div className="flex flex-col w-9/12 max-sm:w-11/12 max-sm:items-center">
        <SearchMovies />
        <h2 className="text-white text-5xl mt-10 max-sm:text-4xl max-sm:mt-8">
          Watchlist
        </h2>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-9/12 mt-10 grid grid-cols-6 gap-4 h-full mb-10 max-sm:grid-cols-2 max-sm:mt-5 max-sm:w-11/12">
          {watchlist &&
            genre &&
            watchlist.map((movie, index) => (
              <div key={index} className="relative h-full">
                <div className=" cursor-pointer text-red-500 text-2xl max-sm:text-3xl top-0 right-0 mt-2 mr-2 absolute bg-white rounded-full  flex items-center justify-center hover:text-red-800  duration-150">
                  <FontAwesomeIcon
                    icon={faXmarkCircle}
                    onClick={() => deleteMovie(movie.id)}
                  />
                </div>
                <Link to={`/movie/${movie.id}`}>
                  {movie.poster_path ? (
                    <img
                      src={`${IMAGES_PATH}/w300${movie.poster_path}`}
                      alt={movie.title}
                    />
                  ) : (
                    <img src={`${COVER_PLACEHOLDER}`} alt={movie.title} />
                  )}
                  <div className="text-white absolute w-full p-2 bottom-0 bg-black/50">
                    <div className="text-xl  overflow-hidden truncate max-sm:text-lg">
                      {movie.title}
                      <div className="text-sm">
                        {new Date(movie.release_date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                          }
                        )}
                      </div>
                    </div>

                    <div className="text-sm  overflow-hidden truncate">
                      {mapGenres(
                        movie.genres.map((id) => id.id),
                        genre.genres
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
