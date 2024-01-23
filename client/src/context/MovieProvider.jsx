/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [movies, setMovies] = useState();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    setUser(userInfo);
  }, []);

  return (
    <MovieContext.Provider
      value={{
        user,
        setUser,
        movies,
        setMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const MovieState = () => {
  return useContext(MovieContext);
};

export default MovieProvider;
