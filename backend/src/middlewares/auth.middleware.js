import { env } from "../configs/env.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const protectedRoute = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new ApiError(401, "Unauthorized! Access denied");
  }
  let decoded;
  try {
    decoded = jwt.verify(token, env.JWT_SECRET);
  } catch (error) {
    throw new ApiError(401, "Unauthorized! Access denied");
  }
  const { userId } = decoded;
  
  const existingUser = await User.findById(userId).select("-password");
  if (!existingUser) {
    throw new ApiError(401, "Unauthorized! Access denied");
  }
  req.user = existingUser;
  next();
});
