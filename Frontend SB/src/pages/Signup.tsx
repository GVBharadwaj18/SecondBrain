import { useRef,useState } from "react";
import { Button } from "../components/Button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate,Link} from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [showPassword,setShowPassword]=useState(false);

    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(BACKEND_URL + "/api/v1/signup", {
            username,
            password
        })
        navigate("/signin")
        alert("You have signed up!")
    }

    return <div className="relative min-h-screen bg-gradient-to-br from-purple-300 via-pink-300 to-yellow-200 flex items-center justify-center overflow-hidden">

        <div className="absolute animate-float bg-purple-400 opacity-30 w-80 h-80 rounded-full blur-3xl top-[-60px] left-[-60px] pointer-events-none"></div>
      <div className="absolute animate-float delay-1000 bg-pink-400 opacity-30 w-60 h-60 rounded-full blur-3xl bottom-[-50px] right-[-50px] pointer-events-none"></div>
      <div className="absolute animate-float delay-2000 bg-yellow-300 opacity-30 w-72 h-72 rounded-full blur-3xl top-[40%] left-[50%] pointer-events-none"></div>

      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-black">Create Account 🤗 </h1>
          <p className="text-sm text-gray-500">Signup to get started</p>
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
              placeholder="Password (minimum 6 chars)"
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            <div
              className="absolute right-3 top-2.5 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff/> : <Eye />}
            </div>
          </div>

          <Button onClick={signup} variant="primary" fullWidth text="Sign Up" />

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500 hover:underline ">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  

}
