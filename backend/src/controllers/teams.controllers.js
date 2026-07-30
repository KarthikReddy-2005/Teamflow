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
    name: name.trim(),
    description,
    owner: userId,
    admin: userId,
    members: [userId],
  });
  res.status(201).json(new ApiResponse(201, "Team created successfully", team));
});

export const getAllTeams = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const teams = await Team.find({ members: userId });
  res.status(200).json(new ApiResponse(200, "Teams data fetched", teams));
});

export const getTeam = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, "Team data fetched", req.team));
});

export const updateTeam = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name?.trim() && !description?.trim()) {
    throw new ApiError(400, "Name or description required");
  }
  const updatedteam = await Team.findByIdAndUpdate(
    req.team._id,
    {
      ...(name?.trim() && { name: name.trim() }),
      ...(description?.trim() && { description: description.trim() }),
    },
    { returnDocument: "after", runValidators: true },
  );

  res
    .status(200)
    .json(new ApiResponse(200, "Team updated successfully", updatedteam));
});

export const deleteTeam = asyncHandler(async (req, res) => {
  const team = await Team.findByIdAndDelete(req.team._id);
  if (!team) {
    throw new ApiError(404, "Team not found");
  }
  res.status(200).json(new ApiResponse(200, "Team deleted Successfully", team));
});