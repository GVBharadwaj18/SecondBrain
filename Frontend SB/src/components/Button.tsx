import type { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    startIcon?: ReactElement;
    onClick?: () => void;
    loading?: boolean;
    fullWidth?:boolean;
}

const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-700",
};

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center";


export function Button({variant, text, startIcon, onClick, loading,fullWidth}: ButtonProps) {
    return <button onClick={onClick} className={variantStyles[variant] + " " + defaultStyles + `${fullWidth ? " w-full flex justify-center items-center" : ""} ${loading ? "opacity-45	" : ""}`} disabled={loading}>
        <div className="pr-2">
            {startIcon}
        </div>
        {text}
    </button>
}