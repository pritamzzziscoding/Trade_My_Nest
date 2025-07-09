import { NavLink } from "react-router-dom";
import { TermsAndConditions } from "../components/TermsAndConditions";
import { useState } from "react";
import {useAuthStore} from "../stores/useAuthStore"

export const Login = () => {

  const {isLogingIn, login} = useAuthStore()

  const [formData, setFormData] = useState({
    email : "",
    password : ""
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(formData)
  }

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4 mt-12">
      <div className="grid lg:grid-cols-2 w-full max-w-6xl rounded-2xl overflow-hidden shadow-lg">
        {/* Login Form Section */}
        <div className="p-8 md:p-12 flex flex-col justify-center items-center bg-base-200">
          <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold text-center text-success mb-6">
              Login to Trade My Nest
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
                className="input input-bordered w-full"
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                placeholder="Password"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                className="input input-bordered w-full"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end">
              <NavLink to="/forgot-password" className="link link-primary text-sm">
                Forgot Password?
              </NavLink>
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={isLogingIn}>
              {isLogingIn ? <span className="loading loading-spinner loading-md"></span> : "Login"}
            </button>
            <p className="text-sm text-center">
              New to Trade My Nest?{" "}
              <NavLink to="/signup" className="link link-primary">
                Sign Up
              </NavLink>
            </p>
          </form>
        </div>

        {/* Terms Section */}
        <div className="p-8 md:p-12 bg-base-100 flex flex-col justify-center">
          <TermsAndConditions />
        </div>
      </div>
    </div>
  );
};
