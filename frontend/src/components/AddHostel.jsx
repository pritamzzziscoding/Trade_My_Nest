import { useEffect, useState } from "react";
import { useHostelStore } from "../stores/useHostelStore";
import { axiosInstance } from "../libs/apis";

const hostels = [
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "H7",
    "H8",
    "H9",
    "H10",
    "H15",
];
const floors = ["0", "1", "2", "3", "4", "5", "6"];
const blocks = ["A", "B", "C", "D", "E", "F", "G"];

export const HostelRequestForm = ({setRefresh}) => {

    const {getting, addHostel, updateRequest, checkRequest, sending} = useHostelStore()

    const [form, setForm] = useState({
        current: "",
        desired: "",
        floor: "",
        block: "",
        desiredFloor : "",
        desiredBlock : "",
        description: "",
    });
    const [descCount, setDescCount] = useState(0);
    const [edit, setEdit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "description") {
            setDescCount(value.length);
            if (value.length > 100) return;
        }
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(edit){
            await updateRequest(form)
        }else {
            await addHostel(form)
        }
        
        setRefresh(prev => !prev)
    };

    const cr = async () => {
        const res = await checkRequest()
        if(res){
            setEdit(true)
            setForm(res)
        }
    }

    useEffect(()=>{
        cr()
    },[])

    if(sending){
        return <form className="w-[320px] h-[500px] mx-auto p-8 bg-base-100 shadow-xl rounded-xl space-y-6">
            <div className="skeleton h-10 w-full"></div>
            <div className="skeleton h-10 w-full"></div>
            <div className="flex justify-between">
                <div className="skeleton h-10 w-[40%]"></div>
                <div className="skeleton h-10 w-[40%]"></div>
            </div>

            <div className="skeleton h-32 w-full"></div>
        </form>
    }

    return (
        <form
            className="max-w-lg mx-auto p-8 bg-base-100 shadow-xl rounded-xl space-y-6"
            onSubmit={handleSubmit}
        >
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
                Hostel Change Request
            </h2>

            <div className="form-control">
                <label className="label font-semibold" htmlFor="current">
                    Current Hostel
                </label>
                <select
                    name="current"
                    id="current"
                    className="select select-bordered w-full"
                    value={form.current}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>
                        Select current hostel
                    </option>
                    {hostels.map((hostel) => (
                        <option key={hostel} value={hostel}>
                            {hostel}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-control">
                <label className="label font-semibold" htmlFor="desired">
                    Desired Hostel
                </label>
                <select
                    name="desired"
                    id="desired"
                    className="select select-bordered w-full"
                    value={form.desired}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>
                        Select desired hostel
                    </option>
                    {hostels.map((hostel) => (
                        <option key={hostel} value={hostel}>
                            {hostel}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex gap-4">
                <div className="form-control flex-1">
                    <label className="label font-semibold" htmlFor="floor">
                        Current Floor
                    </label>
                    <select
                        name="floor"
                        id="floor"
                        className="select select-bordered w-full"
                        value={form.floor}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Select floor
                        </option>
                        {floors.map((floor) => (
                            <option key={floor} value={floor}>
                                {floor}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-control flex-1">
                    <label className="label font-semibold" htmlFor="block">
                        Current Block
                    </label>
                    <select
                        name="block"
                        id="block"
                        className="select select-bordered w-full"
                        value={form.block}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Select block
                        </option>
                        {blocks.map((block) => (
                            <option key={block} value={block}>
                                {block}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex gap-4">
                <div className="form-control flex-1">
                    <label className="label font-semibold" htmlFor="desiredFloor">
                        Desired Floor
                    </label>
                    <select
                        name="desiredFloor"
                        id="desiredFloor"
                        className="select select-bordered w-full"
                        value={form.desiredFloor}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Select floor
                        </option>
                        {floors.map((floor) => (
                            <option key={floor} value={floor}>
                                {floor}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-control flex-1">
                    <label className="label font-semibold" htmlFor="desiredBlock">
                        Desired Block
                    </label>
                    <select
                        name="desiredBlock"
                        id="desiredBlock"
                        className="select select-bordered w-full"
                        value={form.desiredBlock}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Select block
                        </option>
                        {blocks.map((block) => (
                            <option key={block} value={block}>
                                {block}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="form-control">
                <label className="label font-semibold" htmlFor="description">
                    Description
                </label>
                <textarea
                    name="description"
                    id="description"
                    className="textarea textarea-bordered w-full"
                    placeholder="Reason for hostel change (max 100 characters)"
                    maxLength={100}
                    value={form.description}
                    onChange={handleChange}
                    required
                />
                <div className="text-xs text-right mt-1 text-gray-500">
                    {descCount}/100 characters
                </div>
            </div>

            <button className="btn btn-primary w-full mt-4" type="submit" disabled={getting}>
                {getting ? <span className="loading animate-spin"></span>: edit ? "Edit Request" : "Submit Request"}
            </button>
        </form>
    );
};
