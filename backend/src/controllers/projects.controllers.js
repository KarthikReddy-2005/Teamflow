import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Project from "../models/project.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import checkDates from "../utils/checkDates.js";

export const createProject = asyncHandler(async (req, res) => {
  const { name, description, status, priority, startDate, dueDate } = req.body;
  if (!name?.trim()) {
    throw new ApiError(400, "Project name is required");
  }
  if (startDate && dueDate) checkDates(startDate, dueDate);
  const project = await Project.create({
    name: name.trim(),
    description,
    createdBy: req.user._id,
    team: req.team._id,
    members: [req.user._id],
    status,
    priority,
    startDate,
    dueDate,
  });
  res
    .status(201)
    .json(new ApiResponse(201, "Project created successfully", project));
});
export const getProjectsOfTeam = asyncHandler(async (req, res) => {
  const projects = await Project.find({ team: req.team._id, archivedAt: null });
  res.status(200).json(new ApiResponse(200, "Team projects fetched", projects));
});

export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({
    members: req.user._id,
    archivedAt: null,
  });
  res.status(200).json(new ApiResponse(200, "User projects fetched", projects));
});
export const getProject = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, "Project fetched", req.project));
});
export const updateProject = asyncHandler(async (req, res) => {
  const { name, description, status, priority, startDate, dueDate } = req.body;

  const updates = {};
  if (name !== undefined) updates.name = name;
  if (description !== undefined) updates.description = description;
  if (status !== undefined) updates.status = status;
  if (priority !== undefined) updates.priority = priority;

  const newStartDate = startDate ? startDate : req.project.startDate;
  const newDueDate = dueDate ? dueDate : req.project.dueDate;

  if (checkDates(newStartDate, newDueDate)) {
    updates.startDate = newStartDate;
    updates.dueDate = newDueDate;
  }

  const updatedProject = await Project.findByIdAndUpdate(
    req.project._id,
    updates,
    { new: true, runValidators: true },
  );
  res
    .status(200)
    .json(new ApiResponse(200, "Project updated successfully", updatedProject));
});

export const archiveProject = asyncHandler(async (req, res) => {
  if (req.project.archivedAt) {
    throw new ApiError(400, "Already archived");
  }
  const project = await Project.findByIdAndUpdate(
    req.project._id,
    {
      archivedAt: new Date(),
    },
    { new: true },
  );
  res
    .status(200)
    .json(new ApiResponse(200, "Project archived successfully", project));
});
