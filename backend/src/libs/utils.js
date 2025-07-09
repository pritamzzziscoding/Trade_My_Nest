import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import { config } from "dotenv"

config()

export const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" })

    res.cookie("jwt_for_tdn", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httponly: true,
        samesite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })

    return token
}

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
})

export const sendOtpViaEmail = async (toEmail, otp) => {    
    try {
        const mailOptions = {
            from: `"Trade My Nest" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: "Your OTP Code",
            html: `
                    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; color: #333;">
                        <h2 style="color:rgb(68, 186, 4);">Verify Your Email Address</h2>
                        <p>Hello,</p>
                        <p>Thank you for signing up. Use the following OTP to complete your verification. This OTP is valid for <b>10 minutes</b>.</p>
                        <div style="margin: 30px 0; padding: 15px 25px; background-color: #f1f1f1; border-left: 5px solid rgb(89, 255, 0); font-size: 24px; font-weight: bold; width: fit-content;">
                            ${otp}
                        </div>
                        <p>If you didn’t request this, please ignore this email.</p>
                        <br/>
                        <p style="color: #888; font-size: 12px;">-Trade My Nest Team</p>
                        </div>
                `,
        };

        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log("OTP Sent Fail", error)
    }
}