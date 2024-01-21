import express from "express";
import {
  getGenres,
  getMovie,
  getPopularMovies,
  searchMovies,
} from "../controllers/music.js";

const router = express.Router();

router.get("/popularMusic/:page", getPopularMovies);
router.get("/searchMusic/:query", searchMovies);
router.get("/movie/:id", getMovie);
router.get("/genre", getGenres);

export default router;
