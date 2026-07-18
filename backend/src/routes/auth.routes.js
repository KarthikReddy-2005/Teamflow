import express from "express";
import {
  loginUser,
  me,
  registerUser,
} from "../controllers/auth.controllers.js";
import { protectedRoute } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protectedRoute, me);

export default router;
