import express from "express";
import {
  getGenres,
  getMovie,
  getPopularMovies,
  searchMovies,
} from "../controllers/movies.js";

const router = express.Router();

router.get("/popularMovies/:page", getPopularMovies);
router.get("/searchMovies/:query", searchMovies);
router.get("/movie/:id", getMovie);
router.get("/genre", getGenres);

export default router;
