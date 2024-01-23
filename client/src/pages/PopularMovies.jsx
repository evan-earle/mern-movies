import { useEffect } from "react";
import { Movies } from "../components/Movies.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { Header } from "../components/Header";
import { SearchMovies } from "../components/SearchMovies";
import { MovieState } from "../context/MovieProvider";

export const PopularMovies = () => {
  const { movies, setMovies } = MovieState();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get(`/api/movies/popularMovies/1`);
      setMovies(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = () => {};

  return (
    <div className="flex flex-col justify-center w-full items-center">
      <Header />
      <div className="flex flex-col w-9/12">
        <SearchMovies />
        <h2 className="text-white text-5xl mt-10 ">Popular Movies</h2>
      </div>
      {/* <InfiniteScroll
        dataLength={movies.totalResults}
        next={loadMore}
        hasMore={movies.hasMore}
        // loader={<Loader />}
        style={{ overflowY: "hidden" }}
        endMessage={<p>End of movies</p>}
      >
       
      </InfiniteScroll>  */}
      <Movies />
    </div>
  );
};
// genres={genres}
//movies.page === 0 && movies.isFetching ? (
//   <Loader />
// )
