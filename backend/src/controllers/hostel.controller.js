import { config } from "dotenv"
import Hostel from "../models/hostel.model.js"
import { transporter } from "../libs/utils.js"
import Request from "../models/request.model.js"

config()

export const addHostel = async (req, res) => {
    const userId = req.user._id
    const {current, desired, floor, block, description} = req.body
    try { 
        const hostel = await Hostel.findOne({userId})
        if(hostel){
            return res.status(400).json({success : true, message : "You already have a request"})
        }
        const newHostel = new Hostel({
            userId,
            current,
            desired,
            floor,
            block,
            description
        })
        await newHostel.save()
        res.status(200).json({success : true, message : "Request Sent Successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success : false, message : "internal server error"})
    }
}

export const deleteHostel = async (req, res) => {
    const id = req.user._id
    try {
        await Hostel.findOneAndDelete({userId : id})
        res.status(200).json({success : true, message : "Request Deleted Successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success : false, message : "internal server error"})
    }
}

export const getAllHostel = async (req, res) => {
    try {
        const hostels = await Hostel.find({})
        res.status(200).json({success : true, message : hostels})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success : false, message : "internal server error"})
    }
}

export const getHostel = async (req, res) => {
    const userId = req.user._id
    try {
        const hostels = await Hostel.findOne({userId})
        res.status(200).json({success : true, message : hostels})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success : false, message : "internal server error"})
    }
}

export const sendRequest = async (req, res) => {
    const { toEmail } = req.body
    const {email, fullname, year, phoneno} = req.user
    try {

        const request = await Request.findOne({$and : [{senderId : req.user._id},{toEmail}]})

        if(request){
            return res.status(400).json({success : false, message : "Can't send Request before 24hrs"})
        }

        const mailOptions = {
            from: `"Trade My Nest" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: "Intrest in Exchange of Rooms",
            html: `
                    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; color: #333;">
                        <h2 style="color:rgb(68, 186, 4);">Some one is Intrested in your Hostel/Room</h2>
                        <p>Hey,</p>
                        <p>${fullname} a ${year} year student is intrested in your hostel/room. Please contact with him ASAP to confirm exchange!!. The contact details are mentioned below</p>
                        <ul>
                            <li> Email - ${email} </li>
                            <li> Phone No - ${phoneno} </li>
                        <ul>
                        <br/>
                        <p style="color: #888; font-size: 12px;">-Trade My Nest Team</p>
                        </div>
                `,
        };

        await transporter.sendMail(mailOptions)
        
        const newRequest = new Request({
            senderId : req.user._id,
            toEmail
        })

        await newRequest.save()

        res.status(200).json({success : true, message : "Exchange request sent to the receipient"})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({success : false, message : "internal server error"})
    }
}

export const updateRequest = async (req, res) => {
    const userId = req.user._id
    const {current, desired, block, floor, description} = req.body
    try {
        const data = await Hostel.findOneAndUpdate({userId}, {current, desired, block, floor, description});
        res.status(200).json({success : true, message : "Request Updated Successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success : false, message : "internal server error"})
    }
}

export const checkRequest = async (req, res) => {
    const userId = req.user._id
    try {
        const hostel = await Hostel.findOne({userId})
        if(hostel){
            return res.status(200).json({success : true, message : hostel})
        }else {
            return res.status(404).json({success : false, message : "Request Not found"})
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success : false, message : "Internal Server Error"})
    }
}