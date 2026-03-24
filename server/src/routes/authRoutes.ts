import express from "express";
import { registerUser, loginUser, me } from "../controllers/authController.js";
import { protext } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protext, me);

export default router;
