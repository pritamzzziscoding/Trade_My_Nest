import { generateOtp, generateToken, sendOtpViaEmail } from "../libs/utils.js"
import bcrypt from "bcryptjs"
import User from "../models/auth.model.js"
import Otp from "../models/otp.model.js"

export const sendOtp = async (req, res) => {
    const { email, type } = req.body
    try {

        const user = await User.findOne({email})
        //Checking if an email already exists!!!
        if(type === "signup" && user){
            return res.status(400).json({success : false, message : "Email Already Exists"})
        }

        if(type === "forget" && !user){
            return res.status(400).json({success : false, message : "Email do not Exists"})
        }

        const otp = generateOtp()
        const newOtp = new Otp({
            otp
        })
        await newOtp.save()
        await sendOtpViaEmail(email, otp)

        res.status(200).json({success : true , message : newOtp._id})
    } catch (error) {
        console.log("Otp sending fail", error.message)
        res.status(500).json({success : false, message : "Internal Server Error"})
    }
}

export const verifyOtp = async (req, res) => {
    const { otpId, otp } = req.body
    try {
        const existingOtp = await Otp.findById(otpId);

        if (!existingOtp) {
            return res.status(400).json({ success: false, message: "OTP expired or does not exist" });
        }

        if (existingOtp.otp !== otp) {
            return res.status(401).json({ success: false, message: "Invalid OTP" });
        }


        if(existingOtp.otp === otp){
            await Otp.findByIdAndDelete(otpId);
        }

        res.status(200).json({ success: true, message: "OTP verified successfully" });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success : false, message : "Internal Server Error"})
    }
}

export const signUp = async (req, res) => {
    const {email, fullname, year, phoneno,password} = req.body
    try {
        if(!email || !fullname || !year || !phoneno){
            return res.status(400).json({success : false , message : "Enter details carefully"})
        }

        if(phoneno.length != 10){
            return res.status(400).json({success : false , message : "Phone No must be of length 10"})
        }
        if(password.string < 8){
            return res.status(400).json({success : false , message : "Password length must be 8 characters long"})
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            email,
            fullname,
            year,
            phoneno,
            password : hashedPassword
        })

        if(newUser){
            generateToken(newUser._id, res)
            await newUser.save()
            return res.status(201).json({success : true, message : newUser})
        }else{
            return res.status(400).json({success : false, message : "Invalid user data"})
        }

    } catch (error) {
        console.log("Signup fail", error.message)
        res.status(500).json({success : false, message : "Internal Server Error"})
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({success : false, message : "Email do not exists"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(isPasswordValid === false){
            return res.status(404).json({success : false, message : "Invalid password"});
        }

        generateToken(user._id, res)
        return res.status(200).json({success : true, message : user})

    } catch (error) {
        console.log("Login fail", error.message)
        return res.status(500).json({success : false, message : "Internal Server Error"})
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt_for_tdn", "", {maxAge : 0});
        res.status(200).json({success : true, message : "Logged Out Successfully"})
    } catch (error) {
        console.log("Logout failed", error.message)
        return res.status(500).json({success : false, message : "Internal Server Error"})
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json({success : true, message :req.user})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success : false, message : "internal server error"})
    }
}

export const changePassword = async (req, res) => {
    const {email, password} = req.body
    try {
        if(!password){
            return res.status(400).json({success : true , message : "Enter a valid Password"})
        }
        if(password.length < 8){
            return res.status(400).json({success : true , message : "Password must be atleast 8 characters long"})
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        await User.findOneAndUpdate({email},{password : hashedPassword})

        return res.status(200).json({success : true, message : "Password Updated Successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success : false, message : "internal server error"})
    }
}

export const updateUser = async (req, res) => {
    const userId = req.user._id
    const {fullname, year, phoneno} = req.body
    try {
        if(!fullname || !year || !phoneno){
            return res.status(400).json({success : false , message : "Specify details carefully"})
        }
        if(phoneno.length < 10){
            return res.status(400).json({success : false , message : "Phone No must be 10 character long"})
        }
        const user = await User.findByIdAndUpdate(userId, {fullname, year, phoneno}, {new : true})

        res.status(200).json({success : true, message : user})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success : false, message : "internal server error"})
    }
}

export const getUser = async (req, res) => {
    const { userId } = req.params
    try {
        const user = await User.findById(userId).select("-password")
        res.status(200).json({success : true, message : user})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success : false, message : "internal server error"})
    }
}