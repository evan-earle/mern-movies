import axios from "axios";

export const getPopularMovies = async (req, res, next) => {
  const page = req.params.page;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&page=${page}`
    );

    const data = response.data;
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const searchMovies = async (req, res, next) => {
  const query = req.params.query;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${query}`
    );

    const data = response.data;
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const getMovie = async (req, res, next) => {
  const id = req.params.id;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&append_to_response=recommendations`
    );

    const data = response.data;
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const getGenres = async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`
    );

    const data = response.data;
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};
