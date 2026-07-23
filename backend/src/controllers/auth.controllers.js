import { env } from "../configs/env.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username?.trim() || !email?.trim() || !password?.trim()) {
    throw new ApiError(400, "All fields are required");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with the Email exists");
  }

  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  generateToken(newUser._id, res);

  res.status(201).json(
    new ApiResponse(201, "User registered successfully", {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    }),
  );
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "Invalid email or password");
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw new ApiError(400, "Invalid email or password");
  }
  generateToken(user._id, res);

  res.status(200).json(
    new ApiResponse(200, "Logged in successfully", {
      id: user._id,
      username: user.username,
      email: user.email,
    }),
  );
});

export const verifyUser = asyncHandler((req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, "User data fetched successfully", req.user));
});

export const logoutUser = asyncHandler((req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
  });
  res.status(200).json(new ApiResponse(200, "Logged out sucessfully"));
});