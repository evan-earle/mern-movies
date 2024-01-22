/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    setUser(userInfo);
  }, []);

  return (
    <MovieContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(MovieContext);
};

export default MovieProvider;
