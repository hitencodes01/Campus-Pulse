import express from "express";
import {
  createFest,
  deleteFest,
  getAllFest,
  getSingleFest,
  updateFest,
} from "../controllers/festController.js";
import { protext } from "../middlewares/authmiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", getAllFest);
router.get("/:festId", getSingleFest);
router.post("/", protext, authorizeRoles("admin"), createFest);
router.patch("/:festId", protext, authorizeRoles("admin"), updateFest);
router.delete("/:festId", protext, authorizeRoles("admin"), deleteFest);

export default router;
