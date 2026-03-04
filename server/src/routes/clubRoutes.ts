import express from 'express'
import { createClub, getAllClub, getSingleClub } from '../controllers/clubController.js'
import {protext} from '../middlewares/authmiddleware.js'
import { authorizeRoles } from '../middlewares/roleMiddleware.js'

const router = express.Router()

router.post("/", protext , authorizeRoles("admin") , createClub)
router.get("/",getAllClub)
router.get("/:id",getSingleClub)

export default router