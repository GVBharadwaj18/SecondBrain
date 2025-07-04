import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { Forgotpassword } from "./pages/Forgotpassword"
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom"
import { Dashboard } from "./pages/dashboard"
function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/signin"/>}/>
      <Route path="/signin" element={<Signin/>} />  
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<Forgotpassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
}

export default App

