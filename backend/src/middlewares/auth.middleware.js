import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";
import { config } from "dotenv";

config()

export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt_for_tdn

        if(!token){
            return res.status(400).json({success : false, message : "Unauthorized-No token Provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return res.status(400).json({success : false, message : "Unauthorized-Invalid token Provided"})
        }

        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            return res.status(400).json({success : false, message : "No user found"})
        }

        req.user = user

        next()
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success : false, message : "Internal Server Error"})
    }
}