import bcryptjs from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

export const register = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return next({ status: 401, message: "User already exists" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json("New user created");
  } catch (error) {
    return next(error);
  }
};

export const uploadPhoto = async (req, res, next) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "ml_default",
    });
    return res.status(200).json(uploadedResponse);
  } catch (error) {
    return next(error);
  }
};

export const storePhoto = async (req, res, next) => {
  try {
    const data = await User.findOneAndUpdate(
      {
        email: req.body.email,
      },
      { image: req.body.photo }
    );
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next({ status: 404, message: "No user found" });
    }

    const isPasswordCorrect = await bcryptjs.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next({ status: 400, message: "Password is incorrect" });
    }
    const payload = {
      id: user._id,
      name: user.name,
    };
    const token = jwt.sign(payload, process.env.JWT_TOKEN, {
      expiresIn: "1d",
    });
    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        message: "Login successful",
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        token: token,
      });
  } catch (error) {
    return next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return next(error);
  }
};

export const isLoggedIn = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.json(false);
  }
  return jwt.verify(token, process.env.JWT_TOKEN, (err) => {
    err ? false : true;
  });
};
