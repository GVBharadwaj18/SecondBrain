import { useRef,useState } from "react";
import { Button } from "../components/Button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [showPassword,setShowPassword]=useState(false);
    const navigate = useNavigate();

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
            username,
            password
        })
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        navigate("/dashboard")
    }

    return  <div className="relative min-h-screen bg-gradient-to-br from-purple-300 via-pink-300 to-yellow-200 flex items-center justify-center overflow-hidden">
        
        <div className="absolute animate-float bg-purple-400 opacity-30 w-80 h-80 rounded-full blur-3xl top-[-60px] left-[-60px] pointer-events-none"></div>
      <div className="absolute animate-float delay-1000 bg-pink-400 opacity-30 w-60 h-60 rounded-full blur-3xl bottom-[-50px] right-[-50px] pointer-events-none"></div>
      <div className="absolute animate-float delay-2000 bg-yellow-300 opacity-30 w-72 h-72 rounded-full blur-3xl top-[40%] left-[50%] pointer-events-none"></div>


      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back 👋</h1>
          <p className="text-sm text-gray-500">Sign in to continue</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 text-gray-400" />
            <input
              ref={usernameRef}
              type="email"
              placeholder="Email address"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-2.5 text-gray-400" />
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            <div
              className="absolute right-3 top-2.5 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff/> : <Eye />}
            </div>
            <p className="text-sm text-center text-gray-600 mt-2 ml-64">
            <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
            </p>
          </div>

          <Button onClick={signin} variant="primary" fullWidth text="Sign In" />
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  

}