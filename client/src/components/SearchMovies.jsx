import axios from "axios";
import { MovieState } from "../context/MovieProvider";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IMAGES_PATH, COVER_PLACEHOLDER } from "../assets/images";
import { mapGenres } from "../lib/helper";

export const SearchMovies = () => {
  const { search, setSearch, genre, setMovies, setMovie } = MovieState();
  const [isOpen, setIsOpen] = useState(false);
  const [term, setTerm] = useState("");

  const inputOnChange = (event) => {
    if (!event.target.value) {
      setIsOpen(false);
      setTerm("");
      return;
    }
    setIsOpen(true);
    searchMovies(event.target.value);
    setTerm(event.target.value);
  };

  const searchMovies = async (query) => {
    try {
      const { data } = await axios.get(`/api/movies/searchMovies/${query}`);
      setSearch(data);
    } catch (error) {
      console.log(error);
    }
  };

  const closeSearch = () => {
    setIsOpen(false);
    setSearch("");
    setTerm("");
    setMovies();
  };

  return (
    <>
      <div className="w-full mt-5 max-md:mt-8">
        <input
          type="text"
          onChange={inputOnChange}
          placeholder="Search"
          value={term}
          className="border-b-2 text-2xl text-white focus:outline-none focus:border-blue-300 w-full bg-transparent pb-2 "
        />
      </div>
      {isOpen && search && (
        <div className="w-full bg-neutral-950">
          {search.results.slice(0, 10).map((movie, index) => (
            <Link
              to={`/movie/${movie.id}`}
              key={index}
              className="flex text-white w-full mt-3 hover:bg-blue-900 "
              onClick={closeSearch}
            >
              <div className="w-full flex ">
                {movie.poster_path ? (
                  <img
                    src={`${IMAGES_PATH}/w300${movie.poster_path}`}
                    alt={movie.title}
                    className="w-28"
                  />
                ) : (
                  <img
                    src={COVER_PLACEHOLDER}
                    alt={movie.title}
                    className="w-28"
                  />
                )}
                <div className="ml-5 mt-3">
                  <div className="flex items-center">
                    <h6 className="text-2xl mr-1 mb-3 max-sm:text-lg ">
                      {movie.title} ·{" "}
                      {new Date(movie.release_date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                        }
                      )}
                    </h6>
                  </div>
                  {genre && (
                    <span>{mapGenres(movie.genre_ids, genre.genres)}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
