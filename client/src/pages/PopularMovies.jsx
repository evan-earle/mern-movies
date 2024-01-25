import { useEffect } from "react";
import { Movies } from "../components/Movies.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { Header } from "../components/Header";
import { SearchMovies } from "../components/SearchMovies";
import { MovieState } from "../context/MovieProvider";
import { Loader } from "../components/Loader.jsx";

export const PopularMovies = () => {
  const { movies, setMovies, genre, setGenre } = MovieState();

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, []);

  const fetchMovies = async (page = 1) => {
    try {
      const { data } = await axios.get(`/api/movies/popularMovies/${page}`);

      movies
        ? setTimeout(() => {
            setMovies((prevState) => ({
              ...prevState,
              page: data.page,
              results: [...prevState.results, ...data.results],
              total_pages: data.total_pages,
              total_results: data.total_results,
            }));
          }, 1000)
        : setMovies(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGenres = async () => {
    try {
      const { data } = await axios.get(`/api/movies/genre`);
      setGenre(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMore = () => {
    fetchMovies(movies.page + 1);
  };

  return (
    <div className="flex flex-col justify-center w-full items-center">
      <Header />
      <div className="flex flex-col w-9/12">
        <SearchMovies />
        <h2 className="text-white text-5xl mt-10 ">Popular Movies</h2>
      </div>
      {movies && (
        <div className="w-9/12">
          <InfiniteScroll
            dataLength={movies.total_results}
            next={fetchMore}
            hasMore={true}
            loader={<Loader />}
            style={{ overflowY: "hidden" }}
            endMessage={<p>End of movies</p>}
            className="duration-300"
          >
            <Movies />
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};
