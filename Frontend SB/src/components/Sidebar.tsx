import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { AllIcon } from "../icons/AllIcon";
import { LogoutIcon } from "../icons/LogoutIcon";
import { useNavigate } from "react-router-dom";

import { InstagramIcon } from "../icons/InstagramIcon";
import { LinkedIcon } from "../icons/LinkedInIcon";

export function Sidebar({onFilter}:{onFilter:(type:string | null )=>void}) {
    const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.removeItem("token");
        navigate("/signin")
    }

    return <div className="h-screen w-72 fixed left-0 top-0 flex flex-col justify-between bg-gradient-to-br from-purple-200 via-pink-100 to-pink-50 border-r border-gray-200 drop-shadow-2xl backdrop-blur-md">
        <div>
        <div className="flex text-2xl pt-8 items-center">
            <div className="pr-2 text-purple-600">
                <Logo />
            </div>
            <div className="font-bold text-fuchsia-800">SecondBrain</div>
        </div>
        <div className="pt-8 pl-4">
            <SidebarItem text="All" icon={<AllIcon/>} onClick={()=>onFilter(null)}/>
            <SidebarItem text="Instagram" icon={<InstagramIcon/>} onClick={()=>onFilter("instagram")}/>
            <SidebarItem text="Twitter" icon={<TwitterIcon />} onClick={() => onFilter("twitter")}/>
            <SidebarItem text="Youtube" icon={<YoutubeIcon />} onClick={() => onFilter("youtube")} />
            <SidebarItem text="LinkedIn" icon={<LinkedIcon/>} onClick={()=>onFilter("linkedin")} />
        </div>
        </div>

          <div className="absolute bottom-5 pl-4">
            <SidebarItem text="Logout" icon={<LogoutIcon />} onClick={handleLogout}/>
          </div>
    </div>
}