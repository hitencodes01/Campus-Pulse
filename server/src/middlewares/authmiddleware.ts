import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
export interface AuthRequest extends Request{
    user? : any;
}

export const protext = (req : AuthRequest , res : Response , next : NextFunction) => {
    const token = req.cookies.uId;
    if(!token){
        return res.status(401).json({ message: "Not authorized" });
    }
    try {
        console.log(token)
        const decoded = jwt.verify(token , process.env.SECRET_KEY as string)
        req.user = decoded;
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}