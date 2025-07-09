import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { HostelRequestCard } from "../components/HostelCard";
import { IoMdClose } from "react-icons/io";
import { HostelRequestForm } from "../components/AddHostel";
import { useHostelStore } from "../stores/useHostelStore";
import { isSubsequence } from "../libs/utils";

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

export const Home = () => {

    const {getAllHostel, getting} = useHostelStore()

    // State for selected hostels
    const [filteredHostel, setFilteredHostel] = useState([])
    const [currentHostel, setCurrentHostel] = useState("");
    const [desiredHostel, setDesiredHostel] = useState("");
    const [refresh, setRefresh] = useState(true);
    
    const handleFilter = (e) => {
        e.preventDefault();
        setRefresh(!refresh)
    };

    const getAll = async () => {
        const hostels = await getAllHostel();
        hostels.reverse();
        const filtered = hostels.filter((hostel)=>{
            return isSubsequence(currentHostel, hostel.current) && isSubsequence(desiredHostel, hostel.desired)
        })
        console.log(filtered)
        setFilteredHostel(filtered)
    };

    useEffect(() => {
        getAll();
    }, [refresh]);

    const [addData, setAddData] = useState(false)
    return (
        <div className="pt-10 min-h-screen">
            {
                addData && (
                    <div className="fixed top-0 left-0 min-h-screen w-full z-30 bg-base-300/90 flex items-center justify-center">
                        <div className="fixed top-5 right-5" onClick={() => setAddData(!addData)}>
                            <IoMdClose size={30}/>
                        </div>
                        <HostelRequestForm setRefresh={setRefresh}/>
                    </div>
                )
            }
                
            
            <div className="w-[98%] max-w-[1200px] bg-base-200 mx-auto mt-15 rounded-2xl shadow-lg p-8">
                {/* Floating Add Button */}
                {!addData && 
                    (
                        <div className="fixed bottom-5 right-5 z-50 hover:cursor-pointer group" onClick={() => setAddData(!addData)}>
                            <IoIosAddCircleOutline
                                size={50}
                                className="bg-primary text-white rounded-full shadow-lg transition-transform group-hover:scale-110"
                            />
                            <span className="absolute bottom-0 right-16 bg-primary text-white px-3 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity">
                                Add Request
                            </span>
                        </div>
                    )
                }

                {/* Filter Form */}
                <div className="bg-base-100 rounded-xl shadow p-6 md:p-2">
                    <form onSubmit={handleFilter} className="space-y-6 sm:flex justify-evenly items-center">
                        <div>
                            <label htmlFor="currentHostel" className="block text-lg font-semibold text-primary">
                                Select Current Hostel
                            </label>
                            <select
                                id="currentHostel"
                                name="currentHostel"
                                value={currentHostel}
                                onChange={e => setCurrentHostel(e.target.value)}
                                className="select select-bordered w-full"
                            >
                                <option value="">
                                    none
                                </option>
                                {hostels.map((hostel)=>(
                                    <option key={hostel} value={hostel}>{hostel}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="desiredHostel" className="block text-lg font-semibold text-primary">
                                Select Desired Hostel
                            </label>
                            <select
                                id="desiredHostel"
                                name="desiredHostel"
                                value={desiredHostel}
                                onChange={e => setDesiredHostel(e.target.value)}
                                className="select select-bordered w-full"
                            >
                                <option value="">
                                    none
                                </option>
                                {hostels.map((hostel)=>(
                                    <option key={hostel} value={hostel}>{hostel}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Apply Filter
                        </button>
                    </form>
                </div>

                {/* Display Form */}
                <div className="mt-2 bg-base-100 rounded-xl shadow p-6 md:p-2 grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {
                        getting ? (<><div className="skeleton h-[350px] w-full"></div><div className="skeleton h-[350px] w-full"></div><div className="skeleton h-[350px] w-full"></div></>) : filteredHostel.length === 0 ? <><p></p><p className="text-lg font-medium">Currently there is no request. Be the first to send a exchange request :-)</p></> : filteredHostel.map((hostel)=>{
                            return <HostelRequestCard key={hostel._id} hostel={hostel} setRefresh={setRefresh} setAddData={setAddData}/>
                        })
                    }
                </div>
            </div>
        </div>
    );
};
