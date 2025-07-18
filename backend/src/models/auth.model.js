import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    fullname : {
        type : String,
        required : true
    },
    phoneno : {
        type : String,
        length : 10,
        required : true
    },
    year : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
}, {
    timestamps : true
})

const User = mongoose.model("User", userSchema)

export default User;