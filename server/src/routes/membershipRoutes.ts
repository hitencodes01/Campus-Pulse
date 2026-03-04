import express from 'express'
import { protext } from '../middlewares/authmiddleware.js'
import { getClubMembers, joinClub, removeMember } from '../controllers/membershipController.js'
import { authorizeRoles } from '../middlewares/roleMiddleware.js'

const router = express.Router()

router.post("/join/:clubId",protext,joinClub)
router.get('/members/:clubId',protext,getClubMembers)
router.delete("/remove/:clubId/:userId",
    protext , authorizeRoles("admin"),
    removeMember
)

export default router