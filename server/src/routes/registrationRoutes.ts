import express from "express";
import { protext } from "../middlewares/authmiddleware.js";
import {
  getEventRegistrations,
  getMyRegistration,
  registerForEvent,
} from "../controllers/registrationController.js";

const router = express.Router();
router.get("/me",protext,getMyRegistration)
router.get("/event/:eventId", getEventRegistrations);
router.post("/:eventId", protext, registerForEvent);

export default router;
