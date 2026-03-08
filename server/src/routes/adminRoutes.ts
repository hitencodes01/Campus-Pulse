import express from "express";
import { protext } from "../middlewares/authmiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { getLifetimeStats, getLiveStats } from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard", protext, authorizeRoles("admin"),getLifetimeStats)
router.get("/live-dashboard",protext,authorizeRoles("admin"),getLiveStats)

export default router;
