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
  loadTeam,
} from "../middlewares/team.middleware.js";

const teamsRouter = express.Router();

teamsRouter.post("/", protectedRoute, createTeam);
teamsRouter.get("/", protectedRoute, getAllTeams);
teamsRouter.get("/:id", protectedRoute, loadTeam, isTeamMember, getTeam);
teamsRouter.patch("/:id", protectedRoute, loadTeam, isAdminOrOwner, updateTeam);
teamsRouter.delete(
  "/:id",
  protectedRoute,
  loadTeam,
  isAdminOrOwner,
  deleteTeam,
);

export default teamsRouter;
