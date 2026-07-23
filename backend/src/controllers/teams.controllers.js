import mongoose from "mongoose";
import Team from "../models/team.model";

export const createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user._id;
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Teams name is Most" });
    }
    if (!userId) {
      return res
        .status(403)
        .json({ success: false, message: "UnAutherized user" });
    }
    await Team.create({ name, description, userId });
    res
      .status(201)
      .json({ success: true, message: "Team Created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: true, message: "Something went wrong" });
  }
};

export const getAllTeams = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res
        .status(403)
        .json({ success: false, message: "UnAutherized user" });
    }
    const teams = await Team.findOne(userId);
    res
      .status(201)
      .json({ success: true, message: "Team fetched", data: teams });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: true, message: "Something went wrong" });
  }
};
