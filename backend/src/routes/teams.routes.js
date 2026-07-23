import express from "express";
import { protectedRoute } from "../middlewares/auth.middlewares.js";
import { createTeam, getAllTeams } from "../controllers/teams.controllers.js";

const teamsRouter = express.Router();

teamsRouter.post("/teams", protectedRoute, createTeam);
teamsRouter.get("/teams", protectedRoute, getAllTeams);

export default teamsRouter;
