import express from "express";
import {
  loginUser,
  verifyUser,
  registerUser,
  logoutUser,
} from "../controllers/auth.controllers.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/me", protectedRoute, verifyUser);
authRouter.post("/logout", protectedRoute, logoutUser);

export default authRouter;
