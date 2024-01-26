import { useEffect } from "react";
import { Loader } from "../components/Loader";
import { Movie } from "../components/Movie";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { SearchMovies } from "../components/SearchMovies";
import { MovieState } from "../context/MovieProvider";
import { useState } from "react";

export const MovieDetails = () => {
  const id = useParams();
  const { movies, setMovies, movie, setMovie, search } = MovieState();
  const [loading, setLoading] = useState(false);

  const getMovie = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/movies/movie/${id.id}`);
      setMovie(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovie();
    setMovies();
  }, [search]);

  return (
    <div className="flex flex-col justify-center w-full items-center">
      <Header />
      <div className="flex flex-col w-9/12">
        <SearchMovies />
      </div>
      {loading ? <Loader /> : <Movie />}
    </div>
  );
};
