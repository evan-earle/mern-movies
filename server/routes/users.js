import express from "express";
import {
  upload,
  storePhoto,
  getWatchlist,
  addWatchlist,
  deleteWatchlist,
} from "../controllers/users.js";

const router = express.Router();

router.post("/upload", upload);
router.post("/storePhoto", storePhoto);
router.get("/watchlist", getWatchlist);
router.post("/watchlist/:id", addWatchlist);
router.delete("/watchlist/:id", deleteWatchlist);

export default router;
