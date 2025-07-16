import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        unique : true
    },
    current : {
        type : String,
        required : true,
    },
    desired : {
        type : String,
        required : true,
    },
    floor : {
        type : String,
        required : true,
    },
    block : {
        type : String,
        required : true,
    },
    desiredFloor : {
        type : String,
        required : true,
    },
    desiredBlock : {
        type : String,
        required : true,
    },
    description : {
        type : String,
    }
})

const Hostel = mongoose.model("Hostel", hostelSchema)

export default Hostel