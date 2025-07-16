import { useEffect, useState } from "react";
import {
    FaUser, FaPhone, FaEnvelope, FaUniversity, FaBuilding,
    FaClipboardList, FaPaperPlane
} from "react-icons/fa";

import { MdDelete, MdEdit, MdOutlineClose } from "react-icons/md";
import { useAuthStore } from "../stores/useAuthStore";
import { axiosInstance } from "../libs/apis";
import { useHostelStore } from "../stores/useHostelStore";

export const HostelRequestCard = ({hostel, setRefresh, setAddData}) => {
    
    const {userId, current, desired, floor, block, desiredFloor, desiredBlock, description} = hostel
    const { authUser, getting } = useAuthStore()
    const {deleteHostel, sendRequest, sending} = useHostelStore()
    const [flipped, setFlipped] = useState(false);
    const [owner, setOwner] = useState({})
    const [del, setDel] = useState(false)

    const getOwner = async () => {
        const res = await axiosInstance.get(`/auth/get-user/${userId}`)
        setOwner(res.data.message)
    }

    useEffect(()=>{
        getOwner()
    },[])

    const handleDelete = async () => {
        await deleteHostel()
        setRefresh(prev => !prev)
    }

    const handleSendRequest = async () => {
        await sendRequest(owner.email)
    }

    return (
        <div className="w-full mx-auto border rounded-xl" style={{ perspective: 1200 }}>
            {/* Confirm Delete */}
            {
                del && (
                        <div className="fixed top-0 left-0 h-full w-full bg-base-200 z-30 rounded-xl flex flex-col gap-5 items-center justify-center">
                            <p className="text-center">Are you Sure ?</p>
                            <div className="flex gap-5">  
                                <button className="btn btn-error" onClick={handleDelete} disabled={getting}>{getting ? <span className="loading animate-spin"></span> :"Yes"}</button>
                                <button className="btn btn-success" onClick={() => setDel(!del)}>Cancel</button>
                            </div>
                        </div>
                )
            }

            <div
                className={`relative w-full h-[360px] transition-transform duration-700 [transform-style:preserve-3d] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}
            >
                {/* Front Side */}
                <div className="absolute w-full h-full backface-hidden bg-base-100 rounded-2xl shadow-xl p-6 flex flex-col justify-between">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <FaUser className="text-primary text-lg" />
                            <span className="font-semibold text-lg">{owner.fullname}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaPhone className="text-accent text-lg" />
                            <span>{owner.phoneno}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaEnvelope className="text-info text-lg" />
                            <span>{owner.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaClipboardList className="text-success text-lg" />
                            <span>{owner.year} Year</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaUniversity className="text-warning text-lg" />
                            <span>Desired: <span className="font-semibold underline text-warning">{desired}/{desiredFloor}/{desiredBlock}</span></span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaUniversity className="text-error text-lg" />
                        <span>Current: <span className="font-semibold underline text-error">{current}/{floor}/{block}</span></span>
                        </div>
                        {/* Truncated Description */}
                        <div className="flex items-start gap-3">
                            <FaClipboardList className="text-lg mt-1" />
                            <div className="flex-1">
                                <span className="font-semibold">Description: </span>
                                <span className="truncate">
                                        <button
                                            type="button"
                                            className="link link-primary ml-1"
                                            onClick={() => setFlipped(true)}
                                        >
                                            Read
                                        </button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="card-actions justify-end mt-2">
                        {
                            authUser._id === userId && (
                                <>
                                    <button
                                        onClick={() => setDel(!del)}
                                        className="btn btn-error flex items-center gap-2"
                                    >
                                        <MdDelete size={19}/>
                                        <span className="hidden sm:inline-block">Delete</span> 
                                    </button>
                                    <button
                                    onClick={()=>setAddData(true)}
                                        className="btn btn-accent flex items-center gap-2"
                                    >
                                        <MdEdit size={19}/>
                                        <span className="hidden sm:inline-block">Edit</span> 
                                    </button>
                                </>
                            )
                        }
                        {
                            (authUser._id !== userId) && (<button
                            onClick={handleSendRequest}
                            className="btn btn-primary flex items-center gap-2"
                            disabled={sending}
                        >
                            <FaPaperPlane />
                            {sending ? <span className="loading animate-spin"></span> : <span className="hidden sm:inline-block">Request</span>}
                            
                        </button>)
                        }

                    </div>
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full backface-hidden bg-base-200 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-between [transform:rotateY(180deg)]">
                    <h3 className="font-bold text-lg mb-2">Full Description</h3>
                    <p className="mb-3 overflow-auto text-center">{description}</p>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setFlipped(false)}
                    >
                        <MdOutlineClose size={24} />
                    </button> 
                </div>
            </div>
        </div>
    );
};
