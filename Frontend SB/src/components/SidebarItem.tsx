import type { ReactElement } from "react";

export function SidebarItem({text, icon,onClick}: {
    text: string;
    icon: ReactElement;
    onClick?:()=>void;
}) {
    return <div className="flex text-gray-700 py-2 cursor-pointer hover:bg-indigo-300 rounded max-w-48 pl-4 transition-all duration-150" onClick={onClick}>
        <div className="pr-2">
            {icon}
        </div>
        <div>
         {text}
        </div>
    </div>
}