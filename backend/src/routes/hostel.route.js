import express from "express"
import { protectedRoute } from "../middlewares/auth.middleware.js"
import { addHostel, checkRequest, deleteHostel, getAllHostel, getHostel, sendRequest, updateRequest } from "../controllers/hostel.controller.js"

const router = express.Router()

router.post("/add-hostel", protectedRoute, addHostel)
router.delete("/delete-hostel", protectedRoute, deleteHostel)
router.get("/get-all", protectedRoute, getAllHostel)
router.get("/get", protectedRoute, getHostel)
router.post("/send-request", protectedRoute, sendRequest)
router.put("/update-request", protectedRoute, updateRequest)
router.get("/check-request", protectedRoute, checkRequest)

export default router