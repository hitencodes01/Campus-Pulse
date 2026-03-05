import { Response } from "express";
import { Fest } from "../models/fest.model.js";
import { Club } from "../models/club.model.js";
import { Event } from "../models/event.model.js";

export const createEvent = async (req: any, res: Response) => {
  const { title, description, date, capacity, organizingClubs } = req.body;
  const { festId } = req.params;
  try {
    const fest = await Fest.findById(festId);
    if (!fest) {
      return res.status(404).json({ message: "Fest Not Found" });
    }
    const eventDate = new Date(date);
    if (eventDate < fest.startDate || eventDate > fest.endDate) {
      return res
        .status(400)
        .json({ message: "Event date must be within fest duration" });
    }
    if (!organizingClubs || organizingClubs.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one organizing club required" });
    }
    const clubs = await Club.find({
      _id: { $in: organizingClubs },
    });
    if (clubs.length !== organizingClubs.length) {
      return res.status(404).json({ message: "One or more clubs not found" });
    }
    const event = await Event.create({
      title,
      description,
      date: eventDate,
      capacity,
      fest: festId,
      organizingClubs,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
