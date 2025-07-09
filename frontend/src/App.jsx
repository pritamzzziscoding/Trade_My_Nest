import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { SignUp } from "./pages/SignUp"
import { Login } from "./pages/Login"
import { useThemeStore } from "./stores/useThemeStore"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./stores/useAuthStore"
import { useEffect } from "react"
import { Home } from "./pages/Home"
import { Profile } from "./pages/Profile"
import { ForgetPassword } from "./pages/ForgetPassword"
import { Hero } from "./pages/Hero"


export const App = () => {
  const {theme} = useThemeStore()
  const {authUser, isCheckingAuth, checkAuth} = useAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  if(isCheckingAuth && !authUser){
    return <div className="h-screen flex items-center justify-center"><span className="loading loading-spinner loading-xl"></span></div>
  }


  return <div data-theme = {theme}>
    <Navbar />
    <Routes>
      <Route path="/" element={<Hero />}/>
      <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/home"/>}/>
      <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/home"/>}/>
      <Route path="/forgot-password" element={!authUser ? <ForgetPassword/> : <Navigate to="/home" />}/>
      <Route path="/home" element={authUser ? <Home /> : <Navigate to="/login"/>}/>
      <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login"/>}/>
    </Routes>
    <Toaster />
  </div>
}