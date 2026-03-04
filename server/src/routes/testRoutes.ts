import express from 'express'
import { protext } from '../middlewares/authmiddleware.js'
import { authorizeRoles } from '../middlewares/roleMiddleware.js'

const router = express.Router()

router.get("/student",protext,(req,res)=>{
    res.json({message : "Student Access Granted"})
})
router.get("/admin",protext,authorizeRoles("admin"),(req,res)=>{
    res.json({ message: "Admin access granted" });
})

export default router