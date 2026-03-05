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
