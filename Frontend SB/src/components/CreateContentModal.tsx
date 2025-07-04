import { useRef } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";


function detectContentType(link:string):string{
    if (/youtube\.com|youtu\.be/.test(link)) return "youtube";
    if (/twitter\.com/.test(link)) return "twitter";
    if (/instagram\.com/.test(link)) return "instagram";
    if (/linkedin\.com/.test(link)) return "linkedin";
    return "other";
}

export function CreateContentModal({open, onClose}) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        if(!title || !link){
            alert("Please provide both title and link");
            return;
        }
        const type=detectContentType(link);
        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            title,
            type
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })

        onClose();

    }

    return <div>
        {open && <div> 
            <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
               
            </div>
            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
                <div className="flex flex-col justify-center">
                    <span className="bg-white opacity-100 p-4 rounded fixed">
                        <div className="flex justify-end">
                            <div onClick={onClose} className="cursor-pointer">
                                <CrossIcon />
                            </div>
                        </div>
                        <div>
                            <Input reference={titleRef} placeholder={"Title"}></Input>
                            <Input reference={linkRef} placeholder={"Link"}></Input>
                        </div>
                        <div className="flex items-center justify-center mt-4 mb-4">
                            <p className="text-xs text-purple-500">Instagram | Twitter | Youtube | LinkedIn</p>
                          
                        </div>
                        <div className="flex justify-center">
                            <Button onClick={addContent} variant="primary" text="Submit" />
                        </div>
                    </span>
                </div>     
            </div>
            
        </div>}
    </div>

}