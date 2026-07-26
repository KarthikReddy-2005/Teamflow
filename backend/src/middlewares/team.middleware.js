import Team from "../models/team.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const isTeamMember = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const team = await Team.findById(id);
  if (!team) {
    throw new ApiError(404, "Team not found");
  }
  const userId = req.user._id.toString();
  const isMember = team.members.some((member) => member.toString() === userId);
  if (!isMember) {
    throw new ApiError(403, "You are not a member of this Team");
  }
  req.team = team;
  next();
});

export const isAdminOrOwner = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const team = await Team.findById(id);
  if (!team) {
    throw new ApiError(404, "Team not found");
  }
  const userId = req.user._id.toString();
  const isAllowed =
    team.admin?.toString() === userId || team.owner?.toString() === userId;
  if (!isAllowed) {
    throw new ApiError(403, "Only team admin or owner can perform this action");
  }
  req.team = team;
  next();
});
