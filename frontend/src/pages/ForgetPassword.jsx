import { useState } from "react"
import { useAuthStore } from "../stores/useAuthStore"
import { NavLink } from "react-router-dom"
import { TermsAndConditions } from "../components/TermsAndConditions"

export const ForgetPassword = () => {
    const { isSendingOtp, sendOtp, isVerifyingOtp, verifyOtp, otpform, emailform, mainform, isSigningUp, changePassword } = useAuthStore()

    const [formData, setFormData] = useState({
        otpId: "",
        email: "",
        otp: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleOtpSending = async (e) => {
        e.preventDefault()
        const res = await sendOtp(formData.email, "forget")
        if (res) {
            setFormData({ ...formData, otpId: res.data.message })
        }
    }

    const handleVerifyOtp = async (e) => {
        e.preventDefault()
        await verifyOtp(formData.otpId, formData.otp)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await changePassword(formData)
    }

    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center p-4 mt-12">
            <div className="grid lg:grid-cols-2 w-full max-w-6xl rounded-xl overflow-hidden shadow-lg">
                <div className="p-8 md:p-12 flex flex-col justify-center items-center bg-base-200">
                <form className={`w-full max-w-md space-y-4 ${!emailform && "hidden"}`} onSubmit={handleOtpSending}>
                    <h2 className="text-3xl font-bold text-center text-success mb-6">
                        Verify Your Email
                    </h2>
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            required
                            placeholder="mail@site.com"
                            pattern="^202[0-9][a-z]{3}[0-9]{4}@mnit\.ac\.in$"
                            title="Must provide college mail"
                            className="input input-bordered w-full validator"
                            onChange={handleChange}
                        />
                        <p className="validator-hint text-xs text-gray-500 mt-1">
                            Enter valid college email id
                        </p>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-full mt-2"
                        disabled={isSendingOtp}
                    >
                        {isSendingOtp ? <span className="loading loading-spinner loading-md"></span> : "Send OTP"}
                    </button>
                    <p>
                        Already Have an Account ? <span><NavLink to="/login" className="link text-primary">Login</NavLink></span>
                    </p>
                </form>

                <form className={`w-full max-w-md space-y-4 ${!otpform && "hidden"}`} onSubmit={handleVerifyOtp}>
                    <h2 className="text-3xl font-bold text-center text-success mb-6">
                        Enter OTP
                    </h2>
                    <div className="space-y-2">
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                            OTP sent to <span className="font-medium text-success"></span>
                        </label>
                        <input
                            id="otp"
                            type="text"
                            name="otp"
                            required
                            placeholder="Enter 6-digit OTP"
                            pattern="\d{6}"
                            title="Enter the 6-digit OTP sent to your email"
                            className="input input-bordered w-full"
                            onChange={handleChange}
                        />
                        <p className="text-s text-gray-500 mt-1">
                            Didn't receive OTP? <button onClick={handleOtpSending} type="button" disabled={isSendingOtp} className="link link-primary text-s">
                                {isSendingOtp ? <span className="loading loading-spinner loading-sm"></span> : "Resend"}
                            </button>
                        </p>
                    </div>
                    <button type="submit" className="btn btn-primary w-full mt-6" disabled={isVerifyingOtp || isSendingOtp}>
                        {isVerifyingOtp ? <span className="loading loading-spinner loading-md"></span> : "Verify Otp"}
                    </button>
                </form>

                <form className={`w-full max-w-md space-y-4 ${!mainform && "hidden"}`} onSubmit={handleSubmit}>
                    <h2 className="text-3xl font-bold text-center text-success mb-6">
                        Change Password
                    </h2>
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Set new Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                required
                                placeholder="Set your new password"
                                minLength="8"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                                className="input input-bordered w-full validator"
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-full mt-6" disabled={isSigningUp}>
                            {isSigningUp ? <span className="loading loading-spinner loading-md"></span> : "Complete Sign Up"}
                        </button>
                </form>
                </div>


                <div className="p-8 md:p-12 bg-base-100 flex flex-col justify-center">
                    <TermsAndConditions />
                </div>
            </div>

        </div>
    )
}