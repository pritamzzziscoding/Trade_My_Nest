import { create } from "zustand";
import { axiosInstance } from "../libs/apis";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useAuthStore = create((set, get) => ({
    authUser : null,
    isSigningUp : false,
    isSendingOtp: false,
    isLogingIn : false,
    isVerifyingOtp: false,
    isCheckingAuth : true,
    emailform: true,
    otpform: false,
    mainform: false,
    sendOtp: async (email, type) => {
        set({ isSendingOtp: true });
        let res;
        try {
            res = await axiosInstance.post("/auth/send-otp", { email , type});
            set({ otpform: true, emailform: false });
            toast.success(`OTP sent to ${email}`);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            set({ isSendingOtp: false });
        }
        return res;
    },
    verifyOtp: async (otpId, otp) => {
        set({ isVerifyingOtp: true });
        let res;
        try {
            res = await axiosInstance.post("/auth/verify-otp", { otpId, otp });
            set({ otpform: false, mainform: true });
            toast.success("Email verified successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            set({ isVerifyingOtp: false });
        }
        return res;
    },
    signUp : async (data) => {
        set({isSigningUp : true})
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            toast.success("Sign Up Successfull")
            set({authUser : res.data.message})
            set({mainform : false, emailform : true})
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            set({isSigningUp : false})
        }
    },
    logout : async () => {
        set({authUser : null, emailform : true, otpform : false, mainform : false})
        try {
            await axiosInstance.post("/auth/logout")
            toast.success("Logout Successfully Done")
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    },
    login : async (data) => {
        set({isLogingIn : true})
        try {
            const res = await axiosInstance.post("/auth/login", data)
            set({authUser : res.data.message})
            toast.success("Login Successful")
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            set({isLogingIn : false})
        }
    },
    checkAuth : async () => {
        set({isCheckingAuth : true})
        try {
            const res = await axiosInstance.get("/auth/check")
            if(res.data.success === true){
                set({authUser : res.data.message})
            }
        } catch (error) {
            console.error(error.response.data.message || error.message);
        } finally {
            set({isCheckingAuth : false})
        }
    },
    updateUser : async (data) => {
        set({isSigningUp : true})
        try {
            const res = await axiosInstance.put("/auth/update-user", data)
            set({authUser : res.data.message})
            toast.success("User Updated Successfully")
        } catch (error) {
            toast.error(error.response.data.message || error.message);
        } finally {
            set({isSigningUp : false})
        }
    },
    changePassword : async (data) => {
        set({isSigningUp : true})
        try {
            const res = await axiosInstance.put("/auth/change-password", data)
            toast.success(res.data.message)
            set({mainform : false, emailform : true})
        } catch (error) {
            toast.error(error.response.data.message || error.message);
        } finally {
            set({isSigningUp : false})
        }
    }
}));
