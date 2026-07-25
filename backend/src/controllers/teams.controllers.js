import Team from "../models/team.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const createTeam = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user._id;
  if (!name?.trim()) {
    throw new ApiError(400, "Team name is required");
  }
  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }
  const team = await Team.create({
    name,
    description,
    owner: userId,
    admin: userId,
    members: [userId],
  });
  res.status(201).json(new ApiResponse(201, "Team created successfully", team));
});

export const getAllTeams = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }
  const teams = await Team.find({ members: userId });
  res.status(200).json(new ApiResponse(200, "teams data fetched", teams));
});
