import { env } from "../configs/env.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized! Access denied" });
    }
    const { userId } = jwt.verify(token, env.JWT_SECRET);

    const existingUser = await User.findById(userId).select("-password");
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized! Access denied" });
    }
    req.user = existingUser;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized! Access denied" });
  }
};
