import express from "express";
import { protext } from "../middlewares/authmiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { createEvent, getFestEvents } from "../controllers/eventController.js";
const router = express.Router();
router.post("/fests/:festId", protext, authorizeRoles("admin"), createEvent);
router.get("/fests/:festId", getFestEvents);
export default router;
