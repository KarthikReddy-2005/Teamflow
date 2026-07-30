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
import {
  createProject,
  getProjectsOfTeam,
} from "../controllers/projects.controllers.js";

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
teamsRouter.get(
  "/:id/projects",
  protectedRoute,
  loadTeam,
  isTeamMember,
  getProjectsOfTeam,
);
teamsRouter.post(
  "/:id/projects",
  protectedRoute,
  loadTeam,
  isAdminOrOwner,
  createProject,
);

export default teamsRouter;
