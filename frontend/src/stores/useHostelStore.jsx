import { create } from "zustand"
import { axiosInstance } from "../libs/apis";
import toast from "react-hot-toast";

export const useHostelStore = create((set, get) => ({
    getting : false,
    sending : false,
    getAllHostel : async () => {
        set({getting : true})
        let res = null
        try {
            res = await axiosInstance.get("/hostel/get-all");
        } catch (error) {
            console.log(error.message)
        } finally {
            set({getting : false})
        }
        return res.data.message
    },
    deleteHostel : async () => {
        set({getting : true})
        try {
            const res = await axiosInstance.delete("/hostel/delete-hostel")
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.data.response.message)
        } finally {
            set({getting : false})
        }
    },
    addHostel : async (data) => {
        set({getting : true})
        try {
            const res = await axiosInstance.post("/hostel/add-hostel", data)
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({getting : false})
        }
    },
    sendRequest : async (toEmail) => {
        set({sending : true})
        try {
            const res = await axiosInstance.post("/hostel/send-request", {toEmail})
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({sending : false})
        }
    },
    updateRequest : async (form) => {
        try {
            const res = await axiosInstance.put("/hostel/update-request", form)
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    checkRequest : async () => {
        set({sending : true})
        let res = null
        try {
            const d = await axiosInstance.get("/hostel/check-request")
            if(d.data.success === true){
                res = d.data.message
            }
        } catch (error) {
            console.log(error.response.data.message)
        } finally {
            set({sending : false})
        }
        return res
    }
}))