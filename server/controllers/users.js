import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";
import axios from "axios";

export const upload = async (req, res, next) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "chat-app",
    });

    return res.status(200).json(uploadedResponse);
  } catch (err) {
    return next(err);
  }
};

export const storePhoto = async (req, res, next) => {
  try {
    const data = await User.findByIdAndUpdate(req.user.id, {
      image: req.body.photo,
    }).select("image");
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const getWatchlist = async (req, res, next) => {
  try {
    const data = await User.findById(req.user.id, {}).select("watchlist");

    const promises = data.watchlist.map(async (id) => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`
      );

      return response.data;
    });

    const results = await Promise.all(promises);

    return res.status(200).json(results);
  } catch (err) {
    return next(err);
  }
};

export const addWatchlist = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await User.findById(req.user.id, {}).select("watchlist");

    if (data.watchlist.includes(id) === true) {
      res.status(200).json(true);
    } else {
      await User.findByIdAndUpdate(
        req.user.id,
        {
          $addToSet: {
            watchlist: id,
          },
        },
        { new: true }
      );

      return res.status(200).json(false);
    }
  } catch (err) {
    return next(err);
  }
};

export const deleteWatchlist = async (req, res, next) => {
  try {
    const data = await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: {
          watchlist: req.params.id,
        },
      },
      { new: true }
    );
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};
