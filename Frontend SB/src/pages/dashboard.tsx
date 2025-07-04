import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContentModal } from "../components/CreateContentModal"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebar } from "../components/Sidebar"
import {useContent} from "../hooks/useContent"
import { BACKEND_URL } from "../config"
import axios from "axios"

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {contents,refresh} = useContent();
  const [deleteLink, setDeleteLink] = useState<string | null>(null);
  const [filterType,setFilterType] = useState<string | null>(null);
  useEffect(() => {
    refresh();
  }, [modalOpen]);


  return <div>
    <Sidebar onFilter={(type)=>{setFilterType(type)}}/>
    <div className="p-4 ml-72 min-h-screen bg-gradient-to-br from-white via-pink-100 to-purple-200">
      <CreateContentModal open={modalOpen} onClose={() => {
        setModalOpen(false);
      }} />


       {deleteLink && (
        <>
        <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center z-40"></div>

          <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
              <p className="mb-4">Are you sure you want to delete this content?</p>
              <div className="flex justify-end gap-2">
                <Button text="Cancel" variant="secondary" onClick={() => setDeleteLink(null)} />
                <Button
                  text="Delete"
                  variant="primary"
                  onClick={async () => {
                    await axios.delete(`${BACKEND_URL}/api/v1/content`, {
                      headers: { Authorization: localStorage.getItem("token")! },
                      data: { link: deleteLink }
                    });
                    setDeleteLink(null);
                    refresh();
                  }}
                />
              </div>
            </div>
          </div>
          </>
        )}

      <div className="flex justify-end gap-4">
        <Button onClick={() => {
          setModalOpen(true)
        }} variant="primary" text="Add content" startIcon={<PlusIcon />}></Button>
        <Button onClick={async () => {
            const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                share: true
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });
            const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
            alert(shareUrl);
        }} variant="secondary" text="Share brain" startIcon={<ShareIcon />}></Button>
      </div>

      <div className="flex mt-4 gap-4 flex-wrap">
        
        {contents.filter((content)=>{
         if (!filterType) return true;
         return content.type===filterType})
         .map(({ type,link, title}) => <Card 
            type={type}
            link={link}
            title={title}
            onDelete={() => setDeleteLink(link)}
            />)}
             

      </div>
    </div>
  </div>
}
