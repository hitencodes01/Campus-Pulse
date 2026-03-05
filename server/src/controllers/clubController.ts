import { Request, Response } from "express";
import { Club } from "../models/club.model.js";

// create club controller
export const createClub = async (req: Request, res: Response) => {
  const { name, description, category, clubHeads } = req.body;
  try {
    const existingClub = await Club.findOne({ name });
    if (!clubHeads || clubHeads.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one club head is required" });
    }
    if (existingClub) {
      return res.status(400).json({ message: "Club Already Existed" });
    }
    const club = await Club.create({
      name,
      description,
      category,
      clubHeads,
      createdBy: (req as any).user.id,
    });
    return res.status(201).json({ message: "Club created Succesfully", club });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// get All club
export const getAllClub = async (req: Request, res: Response) => {
  try {
    const clubs = await Club.find().populate("createdBy", "name email");
    res.status(200).json({ clubs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// get singlr club controller
export const getSingleClub = async (req: Request, res: Response) => {
  try {
    const club = await Club.findById(req.params.id).populate({
      path: "clubHeads",
      select: "name email",
    });
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }
    return res.status(200).json({
      club,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
