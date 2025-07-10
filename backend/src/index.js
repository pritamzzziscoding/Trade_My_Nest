import express from "express"
import { config } from "dotenv"
import { connectDB } from "./libs/db.js"
import authRoute from "./routes/auth.route.js"
import hostelRoute from "./routes/hostel.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"

config()
const __dirname = path.resolve()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

//route middleware
app.use("/api/auth", authRoute)
app.use("/api/hostel", hostelRoute)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    app.get("/:li", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

app.listen(PORT, async () => {
    await connectDB(MONGO_URI)
    console.log(`server is listening to PORT : ${PORT}`)
})