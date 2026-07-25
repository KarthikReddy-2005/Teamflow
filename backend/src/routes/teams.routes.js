import express from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { createTeam, getAllTeams } from "../controllers/teams.controllers.js";

const teamsRouter = express.Router();

teamsRouter.post("/", protectedRoute, createTeam);
teamsRouter.get("/", protectedRoute, getAllTeams);

export default teamsRouter;
