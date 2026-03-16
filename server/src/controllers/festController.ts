import { Request, Response } from "express";
import { Fest } from "../models/fest.model.js";

// create fest
export const createFest = async (req: Request, res: Response) => {
  const { name, description, startDate, endDate } = req.body;

  if (new Date(startDate) > new Date(endDate)) {
    return res
      .status(400)
      .json({ message: "Start date cannot be after end date" });
  }
  try {
    const fest = await Fest.create({ name, description, startDate, endDate });
    return res.status(201).json({ message: "Fest created successfully", fest });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// get all fests
export const getAllFest = async (req: Request, res: Response) => {
  try {
    const fests = await Fest.find().sort({ startDate: 1 });
    return res.status(200).json({success : true, count: fests.length, fests });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// get single fest
export const getSingleFest = async (req: Request, res: Response) => {
  try {
    const fest = await Fest.findById(req.params.festId);
    if (!fest) {
      return res.status(404).json({ message: "Fest not found" });
    }
    return res.status(200).json({ fest });
  } catch (error) {}
};

// update fest
export const updateFest = async (req: Request, res: Response) => {
  try {
    const fest = await Fest.findByIdAndUpdate(req.params.festId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!fest) {
      return res.status(404).json({ message: "Fest not found" });
    }
    res.status(200).json({
      message: "Fest updated successfully",
      fest,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// delete fest
export const deleteFest = async (req: Request, res: Response) => {
  try {
    const fest = await Fest.findByIdAndDelete(req.params.festId);
    if (!fest) {
      return res.status(404).json({ message: "Fest not found" });
    }
    res.status(200).json({
      message: "Fest deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
