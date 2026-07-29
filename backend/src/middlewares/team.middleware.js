import mongoose from "mongoose";
import Team from "../models/team.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const loadTeam = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid team id");
  }
  const team = await Team.findById(id);
  if (!team) {
    throw new ApiError(404, "Team not found");
  }
  req.team = team;
  next();
});

export const isTeamMember = asyncHandler(async (req, res, next) => {
  const userId = req.user._id.toString();
  const isMember = req.team.members.some(
    (member) => member.toString() === userId,
  );
  if (!isMember) {
    throw new ApiError(403, "You are not a member of this Team");
  }
  next();
});

export const isAdminOrOwner = asyncHandler(async (req, res, next) => {
  const userId = req.user._id.toString();
  const isAllowed =
    req.team.admin?.toString() === userId ||
    req.team.owner?.toString() === userId;
  if (!isAllowed) {
    throw new ApiError(403, "Only team admin or owner can perform this action");
  }
  next();
});
