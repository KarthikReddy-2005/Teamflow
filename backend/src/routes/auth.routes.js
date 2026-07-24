import express from "express";
import {
  loginUser,
  verifyUser,
  registerUser,
  logoutUser,
} from "../controllers/auth.controllers.js";
import { protectedRoute } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protectedRoute, verifyUser);
router.post("/logout", protectedRoute, logoutUser);

export default router;
