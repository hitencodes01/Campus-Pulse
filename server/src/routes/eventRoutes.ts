import express from "express";
import { protext } from "../middlewares/authmiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { createEvent } from "../controllers/eventController.js";
const router = express.Router();
router.post("/fest/:festId", protext, authorizeRoles("admin"), createEvent);
export default router;
