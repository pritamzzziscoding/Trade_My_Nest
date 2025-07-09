import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    toEmail : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        expires : 24 * 60 * 60
    }
})

const Request = mongoose.model("Request", requestSchema)

export default Request