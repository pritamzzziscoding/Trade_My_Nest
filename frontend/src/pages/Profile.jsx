import { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { FaUserCircle } from "react-icons/fa";

export const Profile = () => {
    const { authUser, isSigningUp, updateUser } = useAuthStore();

    const [formData, setFormData] = useState({
        email: authUser.email || "",
        fullname: authUser.fullname || "",
        phoneno: authUser.phoneno || "",
        year: authUser.year || "",
    });

    const [editMode, setEditMode] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUser(formData)
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-8 px-2">
            <div className="card w-full max-w-md bg-base-200 shadow-xl">
                <div className="card-body items-center">
                    <div className="avatar mb-4">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <FaUserCircle className="text-gray-300" size={96} />
                        </div>
                    </div>
                    <h2 className="card-title text-2xl font-semibold">{formData.fullname || "Your Name"}</h2>
                    <p className="text-base-content text-opacity-60 mb-2">{formData.email}</p>
                    <form onSubmit={handleSubmit} className="w-full space-y-3 mt-2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input
                                type="text"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                disabled={!editMode}
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                className="input input-bordered w-full bg-base-200 text-base-content"
                                disabled
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input
                                type="tel"
                                name="phoneno"
                                value={formData.phoneno}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                disabled={!editMode}
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Year</span>
                            </label>
                            <select
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                className="select select-bordered w-full"
                                disabled={!editMode}
                            >
                                <option value="">Select Year</option>
                                <option value="1st">1st</option>
                                <option value="2nd">2nd</option>
                                <option value="3rd">3rd</option>
                                <option value="4th">4th</option>
                                <option value="5th">5th</option>
                                <option value="phd">phd</option>
                            </select>
                        </div>
                        <div className="card-actions justify-end mt-4">
                            {editMode ? (
                                <>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isSigningUp}
                                    >
                                        {isSigningUp ? <span className="loading loading-spinner loading-md"></span> : "Save"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditMode(false)}
                                        className="btn btn-ghost"
                                        disabled={isSigningUp}
                                    >
                                        Close
                                    </button>
                                </>
                            ) : null}
                        </div>
                    </form>
                    {!editMode && (
                        <div className="card-actions justify-end w-full">
                            <button
                            type="button"
                            onClick={() => setEditMode(true)}
                            className="btn btn-primary w-full"
                            >
                            Edit Profile
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
