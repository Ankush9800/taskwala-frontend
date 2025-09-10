import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { account, storage } from '@/lib/Appwrite'
import { ID } from 'appwrite'
import axios from 'axios'
import { Check, Pencil } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function Profile() {

    const [profile, setProfile] = useState([])
    const [file, setFile] = useState(null)
    const [open, setOpen] = useState(false)
    const [avatar, setAvatar] = useState("")
    const [editPhone, setEditPhone] = useState(false)
    const [phone, setPhone] = useState(null)
    const [password, setPassword] = useState("")

    const profileData = async()=>{
        const res = await account.get()
        setProfile(res)
        console.log(res)
    }

    const updateAvatar = async()=>{
      try {
        const response = await storage.createFile(
          import.meta.env.VITE_APPWRITE_STORAGE,
          ID.unique(),
          file
        )
        console.log(response)
        const prevUrl = await storage.getFileView(
          import.meta.env.VITE_APPWRITE_STORAGE,
          response.$id
        )
        const res = await account.updatePrefs({
        avatar:prevUrl
      })
      setOpen(false)
      console.log(res)
      } catch (error) {
        console.log(error)
      }
    }

    const updatePhone = async()=>{
      try {
        await account.updatePhone(
          `+91${phone}`,
          password
        )
        setEditPhone(false)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
        profileData()
    },[])

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4">
      <div className="bg-[#232336] rounded-2xl shadow-xl max-w-lg w-full flex flex-col items-center p-8">

        {/* Avatar */}
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#00CFFF] shadow mb-4" onClick={()=>setOpen(true)}>
          <img src={profile.prefs?.avatar} alt="Profile" className="object-cover w-full h-full" />
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className='bg-black border-none'>
            <input type="file" accept='.jpg, .png' onChange={(e)=>{
              setFile(e.target.files?.[0])
            }}/>
            <Button onClick={updateAvatar}>upload</Button>
          </DialogContent>
        </Dialog>
        {/* Name and username */}
        <h1 className="text-2xl font-extrabold text-[#F5F5F5]">{profile.fullName}</h1>
        <p className="text-[#A855F7] font-semibold mb-2">
          {profile.name}</p>
        <div className="w-2/3 border-b border-[#365c6e] my-3" />

        {/* Info Fields with Edit Button */}
        <div className="w-full flex flex-col gap-3 mb-3">

          {/* Email */}
          <div className="flex justify-between items-center group">
            <span className="text-[#9CA3AF] font-medium">Email:</span>
            <div className="flex items-center gap-1">
              <span className="font-semibold" style={{ color: "#00CFFF" }}>{profile.email}</span>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex justify-between items-center group">
            <span className="text-[#9CA3AF] font-medium">Phone Number:</span>
            <div className="flex items-center gap-1">
              <span className="font-semibold" style={{ color: "#10B981" }}>{profile.phone?.replace(/^\+91/, "")}</span>
              <button
                onClick={() => {
                  setEditPhone(true)
                }}
                className="ml-2 p-1 rounded hover:bg-[#1E1E2F] transition-all group-hover:opacity-100 opacity-70"
                title="Edit Phone Number"
                type="button"
              >
                <Pencil className="w-4 h-4 text-[#10B981]" />
              </button>
            </div>
          </div>
          <Dialog open={editPhone} onOpenChange={setEditPhone}>
            <DialogContent className='bg-black border-none flex flex-col gap-2'>
              <div>
                <span>Phone</span>
                <Input onChange={(e)=>setPhone(e.target.value)} type='number'/>
              </div>
              <div>
                <span>Passward</span>
                <Input onChange={(e)=>setPassword(e.target.value)}/>
              </div>
             <DialogFooter>
              <Button onClick={updatePhone}>Update</Button>
             </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* Created At (not editable) */}
          <div className="flex justify-between items-center">
            <span className="text-[#9CA3AF] font-medium">Created At:</span>
            <span className="font-semibold" style={{ color: "#F97316" }}>
              {new Date(profile.$createdAt).toLocaleString()}
            </span>
          </div>

          {/* Last Updated (not editable) */}
          <div className="flex justify-between items-center">
            <span className="text-[#9CA3AF] font-medium">Last Updated:</span>
            <span className="font-semibold" style={{ color: "#A855F7" }}>
              {new Date(profile.$updatedAt).toLocaleString()}
            </span>
          </div>
        </div>

        {/* User ID */}
        <div className="w-full flex justify-end">
          <span className="text-xs text-[#9CA3AF]">ID: {profile.$id}</span>
        </div>
      </div>
    </div>
  )
}

export default Profile