import { Request, Response } from "express";
import { Event } from "../models/event.model.js";
import { Registration } from "../models/register.model.js";

export const registerForEvent = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.params;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const currentRegistration = await Registration.countDocuments({
      event: eventId,
    });

    if (currentRegistration >= event.capacity) {
      return res.status(400).json({ message: "Event Capacity reached" });
    }

    const registration = await Registration.create({
      user: userId,
      event: eventId,
    });

    return res
      .status(202)
      .json({ message: "Registered Successfully", registration });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// get event registrations
export const getEventRegistrations = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const registrations = await Registration.find({ event: eventId }).populate(
      "user",
      "name email",
    );
    res.status(200).json({ count: registrations.length, registrations });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// user dashboard API

export const getMyRegistration = async (req: any, res: Response) => {
  const userId = req.user.id;

  const registrations = await Registration.find({ user: userId }).populate({
    path: "event",
    populate: {
      path: "fest",
      select: "name startDate endDate",
    },
  });
  res.status(200).json({
    count: registrations.length,
    registrations,
  });
};
