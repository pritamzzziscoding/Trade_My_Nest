import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    otp : {
        type : String,
        required : true,
        unique : true
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        expires : 600
    }
})

const Otp = mongoose.model("Otp", otpSchema)

export default Otp