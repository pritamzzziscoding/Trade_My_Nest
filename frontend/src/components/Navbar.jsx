import { NavLink } from "react-router-dom"
import { FaHome, FaRegUser } from "react-icons/fa";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { useThemeStore } from "../stores/useThemeStore";
import { CiDark, CiLight } from "react-icons/ci";
import { useAuthStore } from "../stores/useAuthStore";

export const Navbar = () => {
    const{ authUser, logout } = useAuthStore()
    const {theme, setTheme} = useThemeStore()

    const handleLogout = async () => {
        await logout()
    }

    return <header className="shadow-2xl bg-base-300 flex justify-between items-center fixed top-0 left-0 h-15 w-full z-30">
        <NavLink className="ml-10 bg-base-300" to="/">
            <div className="flex gap-1 items-center justify-center">
                <img src="tdn.png" alt="logo" className="h-12"/>
                <p className="hidden sm:inline-block sm:text-md font-medium">Trade My Nest</p>
            </div>
        </NavLink>
        <div className="mr-10 flex gap-1">
            <button className="btn btn-primary shadow" onClick={setTheme}>
                {theme === "light" ? <CiDark size={22} className="swap swap-rotate"/> : <CiLight size={22}className="swap swap-rotate"/>}
            </button>
            {
                authUser !== null && (
                    <>
                        <NavLink to="/home">
                            <button className="btn btn-primary shadow">
                                <FaHome size={15}/>
                            </button>
                        </NavLink>
                        <NavLink to="/profile">
                            <button className="btn btn-primary shadow">
                                <FaRegUser size={15}/>
                            </button>
                        </NavLink>
                        <button className="btn btn-primary shadow" onClick={handleLogout}>
                            <IoLogOutOutline size={22} />
                        </button>
                    </>

                )
            }
            {
                authUser === null && (
                    <>
                        <NavLink to="/login">
                            <button className="btn btn-primary shadow">
                                <IoLogInOutline size={21}/>
                            </button>
                        </NavLink>
                    </>
                )
            }
        </div>
    </header>  
}