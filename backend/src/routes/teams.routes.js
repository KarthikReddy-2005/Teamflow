import express from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import {
  createTeam,
  deleteTeam,
  getAllTeams,
  getTeam,
  updateTeam,
} from "../controllers/teams.controllers.js";
import {
  isAdminOrOwner,
  isTeamMember,
} from "../middlewares/team.middleware.js";

const teamsRouter = express.Router();

teamsRouter.post("/", protectedRoute, createTeam);
teamsRouter.get("/", protectedRoute, getAllTeams);
teamsRouter.get("/:id", protectedRoute, isTeamMember, getTeam);
teamsRouter.patch("/:id", protectedRoute, isAdminOrOwner, updateTeam);
teamsRouter.delete("/:id", protectedRoute, isAdminOrOwner, deleteTeam);

export default teamsRouter;
