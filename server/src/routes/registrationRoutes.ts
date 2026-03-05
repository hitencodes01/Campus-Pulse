import express from "express";
import { protext } from "../middlewares/authmiddleware.js";
import { registerForEvent } from "../controllers/registrationController.js";

const router = express.Router();

router.post("/:eventId", protext, registerForEvent);

export default router;
