import { Request, Response } from "express";
import { Club } from "../models/club.model.js";
import { Membership } from "../models/membership.model.js";

// joining club
export const joinClub = async (req: any, res: Response) => {
  const clubId = req.params.clubId;
  try {
    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({ message: "Club Not Found" });
    }
    const membership = await Membership.create({
      user: req.user.id,
      club: clubId,
    });
    return res
      .status(201)
      .json({ message: "Joined club successfullu", membership });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// get all club members
export const getClubMembers = async (req: Request, res: Response) => {
  try {
    const members = await Membership.find({
      club: req.params.clubId,
    }).populate("user", "name email role");

    return res.status(200).json({ members });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};


// delete member from club
export const removeMember = async (req: Request, res: Response) => {
  try {
    const membership = await Membership.findOneAndDelete({
      user: req.params.userId,
      club: req.params.clubId,
    });
    if (!membership) {
      return res.status(404).json({ message: "Membership not found" });
    }
    return res.status(200).json({ message: "Member removed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
