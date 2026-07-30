import express from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import {
  archiveProject,
  createProject,
  getProject,
  getProjects,
  getProjectsOfTeam,
  updateProject,
} from "../controllers/projects.controllers.js";
import {
  isAdminOrOwner,
  isTeamMember,
  loadTeam,
} from "../middlewares/team.middleware.js";
import {
  loadProject,
  loadTeamFromProject,
} from "../middlewares/project.middleware.js";

const projectRouter = express.Router();

projectRouter.get("/", protectedRoute, getProjects);
projectRouter.get(
  "/:projectId",
  protectedRoute,
  loadProject,
  loadTeamFromProject,
  isTeamMember,
  getProject,
);

projectRouter.patch(
  "/:projectId",
  protectedRoute,
  loadProject,
  loadTeamFromProject,
  isAdminOrOwner,
  updateProject,
);
projectRouter.patch(
  "/:projectId/archive",
  protectedRoute,
  loadProject,
  loadTeamFromProject,
  isAdminOrOwner,
  archiveProject,
);

export default projectRouter;
