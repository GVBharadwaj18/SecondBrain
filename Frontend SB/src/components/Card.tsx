import { ShareIcon } from "../icons/ShareIcon";
import {YoutubeIcon} from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { InstagramIcon } from "../icons/InstagramIcon";
import { LinkedIcon } from "../icons/LinkedInIcon";
import { useEffect } from "react";

interface CardProps {
    type: String;
    title: string;
    link: string;
    onDelete:()=>void;  
}
function getYoutubeEmbedLink(link: string): string {
  const match = link.match(/(?:v=|\.be\/)([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : "";
}



export function Card({type,title,link,onDelete}: CardProps){
   useEffect(() => {
    if (type === "twitter" && (window as any).twttr?.widgets){
      (window as any).twttr.widgets.load();
    }
   
  }, [link,type]);


   function getIcon() {
        switch (type) {
            case "youtube": return <YoutubeIcon />;
            case "twitter": return <TwitterIcon />;
            case "instagram": return <InstagramIcon />;
            case "linkedin": return <LinkedIcon />;
            default: return null;
        }
    }


    return <div>
        <div className="p-4 bg-white rounded-md border-gray-200 max-w-72  border min-h-48 min-w-72">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="pr-2 text-gray-500">
                        {getIcon()}
                    </div>
                    {title}
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500">
                        <a href={link} target="_blank">
                            <ShareIcon />
                        </a>
                    </div>
                    <div className="text-gray-500">
                        <button onClick={onDelete}><DeleteIcon/></button>
                    </div>
                </div>
            </div>

            <div className="pt-4">
                {type === "youtube" && <iframe className="w-full" src={getYoutubeEmbedLink(link)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                {type === "twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")}></a> 
                </blockquote>}

                {type === "instagram" && 
                        <a href={link} target="_blank" rel="noreferrer"className="block text-blue-500 underline text-center">View on Instagram</a>
                }

                {type === "linkedin" && <a
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 underline ml-10"
                        > Open in LinkedIn </a> }

            </div>

        </div>
    </div>
}

