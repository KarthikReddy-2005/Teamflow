import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import Project from "../models/project.model.js";
import Team from "../models/team.model.js";

export const loadProject = asyncHandler(async (req, res, next) => {
  const { projectId } = req.params;
  if (!mongoose.isValidObjectId(projectId)) {
    throw new ApiError(400, "Invalid project id");
  }
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, "Project not found");
  }
  req.project = project;
  next();
});

export const loadTeamFromProject = asyncHandler(async (req, res, next) => {
  const team = await Team.findById(req.project.team);
  if (!team) {
    throw new ApiError(404, "Team not found");
  }
  req.team = team;
  next();
});

export const isProjectMember = asyncHandler(async (req, res, next) => {
  const userId = req.user._id.toString();
  const isMember = req.project.members.some(
    (member) => member.toString() === userId,
  );
  if (!isMember) {
    throw new ApiError(403, "You are not a member of this Team");
  }
  next();
});
