import mongoose from "mongoose"

export const connectDB = async (MONGO_URI) => {
    try {
        const conn = await mongoose.connect(MONGO_URI)
        console.log(`Database Connected Successfully ${conn.connection.host}`)
    } catch (error) {
        console.log("Error connecting to DB\n", error.message);
    }
}