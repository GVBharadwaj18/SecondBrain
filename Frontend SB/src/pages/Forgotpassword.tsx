import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/Button";

export function Forgotpassword() {
  const [step,setStep]= useState(1); // 1 for email and 2 for otp and password
  const [email,setEmail]=useState("");
  const [otp, setOtp]=useState(Array(6).fill(""));
  const [newPassword,setNewPassword]=useState("");
  const navigate=useNavigate();

  const otpRefs=Array.from({length:6},()=>useRef<HTMLInputElement>(null));

  const handleOtpChange=(value:string,index:number)=>{
    const newOtp=[...otp];
    newOtp[index]=value;
    setOtp(newOtp);

    if (value && index<otpRefs.length-1){
      otpRefs[index + 1].current?.focus();
    }
  };

  async function sendOtp() {
    try{
      await axios.post("http://localhost:3000/api/v1/auth/send-otp", { email });
      alert("OTP sent to your email.");
      setStep(2);
    } catch (err){
      console.error(err);
      alert("Failed to send OTP. Please try again.");
    }
  }

  async function resetPassword() {
    try {
      const otpCode = otp.join("");
      await axios.post("http://localhost:3000/api/v1/auth/reset-password", {
        email,
        otp: otpCode,
        newPassword,
      });
      alert("Password reset successfully! Please log in.");
      navigate("/signin");
    } catch (err) {
      console.error(err);
      alert("Invalid OTP or error resetting password.");
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-300 via-pink-300 to-yellow-200 flex items-center justify-center overflow-hidden">
      
      <div className="absolute animate-float bg-purple-400 opacity-30 w-80 h-80 rounded-full blur-3xl top-[-60px] left-[-60px]"></div>
      <div className="absolute animate-float delay-1000 bg-pink-400 opacity-30 w-60 h-60 rounded-full blur-3xl bottom-[-50px] right-[-50px]"></div>
      <div className="absolute animate-float delay-2000 bg-yellow-300 opacity-30 w-72 h-72 rounded-full blur-3xl top-[40%] left-[50%]"></div>

      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md z-10">
        {step===1 && (
          <>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Forgot Password</h1>
            <p className="text-sm text-gray-500 text-center mb-6">Enter your email to receive an OTP</p>
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring focus:border-blue-300"
            />
            <Button text="Send OTP" onClick={sendOtp} variant="primary" fullWidth />
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Reset Password</h1>
            <p className="text-sm text-gray-500 text-center mb-6">Enter the OTP and new password</p>

            
            <div className="flex justify-between mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={otpRefs[index]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  className="w-10 h-10 text-center border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              ))}
            </div>

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring focus:border-blue-300"
            />
            <Button text="Reset Password" onClick={resetPassword} variant="primary" fullWidth />
          </>
        )}
      </div>
    </div>
  );
}
