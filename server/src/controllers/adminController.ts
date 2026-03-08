import { Request, Response } from "express";
import User from "../models/User.js";
import { Club } from "../models/club.model.js";
import { Fest } from "../models/fest.model.js";
import { Event } from "../models/event.model.js";
import { Registration } from "../models/register.model.js";

// dashboard
export const getLifetimeStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalClubs = await Club.countDocuments();
    const totalFests = await Fest.countDocuments();
    const totalEvents = await Event.countDocuments();
    const totalRegistration = await Registration.countDocuments();

    return res.status(200).json({
      totalUsers,
      totalClubs,
      totalFests,
      totalEvents,
      totalRegistration,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// live dashboard
export const getLiveStats = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const upcomingFests = await Fest.find({
      date: { $gte: today, $lte: nextWeek },
    });

    const festIds = upcomingFests.map((fest) => fest._id);

    const events = await Event.find({
      fest: { $in: festIds },
    });

    const eventStats = [];

    for (const event of events) {
      const registered = await Registration.countDocuments({
        event: event._id,
      });

      eventStats.push({
        eventName: event.title,
        capacity: event.capacity,
        registered,
        remainingSeats: event.capacity - registered,
      });
    }

    return res.status(200).json({
      upcomingFests,
      events: eventStats,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
