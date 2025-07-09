import express from "express"
import { sendOtp, signUp, login, logout, verifyOtp, checkAuth, changePassword, updateUser, getUser } from "../controllers/auth.controller.js"
import { protectedRoute } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/send-otp", sendOtp)
router.post("/verify-otp", verifyOtp)
router.post("/signup", signUp)
router.post("/login", login)
router.post("/logout", logout)
router.put("/change-password", changePassword)
router.put("/update-user", protectedRoute, updateUser)
router.get("/check", protectedRoute, checkAuth)
router.get("/get-user/:userId", getUser)

export default router