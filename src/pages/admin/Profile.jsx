import axios from 'axios'
import { Pencil } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function Profile() {

    const [profile, setProfile] = useState([])

    const profileData = async()=>{
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/getadmin`,{
            withCredentials : true
        })
        setProfile(res.data.data)
        console.log(res.data.data)
    }

    useEffect(()=>{
        profileData()
    },[])

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4">
      <div className="bg-[#232336] rounded-2xl shadow-xl max-w-lg w-full flex flex-col items-center p-8">

        {/* Avatar */}
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#00CFFF] shadow mb-4">
          <img src={profile.avatar} alt="Profile" className="object-cover w-full h-full" />
        </div>

        {/* Name and username */}
        <h1 className="text-2xl font-extrabold text-[#F5F5F5]">{profile.fullName}</h1>
        <p className="text-[#A855F7] font-semibold mb-2">@{profile.userName}</p>
        <div className="w-2/3 border-b border-[#365c6e] my-3" />

        {/* Info Fields with Edit Button */}
        <div className="w-full flex flex-col gap-3 mb-3">

          {/* Email */}
          <div className="flex justify-between items-center group">
            <span className="text-[#9CA3AF] font-medium">Email:</span>
            <div className="flex items-center gap-1">
              <span className="font-semibold" style={{ color: "#00CFFF" }}>{profile.email}</span>
              <button
                onClick={() => onEditField?.("Email", profile.email)}
                className="ml-2 p-1 rounded hover:bg-[#1E1E2F] transition-all group-hover:opacity-100 opacity-70"
                title="Edit Email"
                type="button"
              >
                <Pencil className="w-4 h-4 text-[#00CFFF]" />
              </button>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex justify-between items-center group">
            <span className="text-[#9CA3AF] font-medium">Phone Number:</span>
            <div className="flex items-center gap-1">
              <span className="font-semibold" style={{ color: "#10B981" }}>{profile.phoneNo}</span>
              <button
                onClick={() => onEditField?.("Phone Number", profile.phoneNo)}
                className="ml-2 p-1 rounded hover:bg-[#1E1E2F] transition-all group-hover:opacity-100 opacity-70"
                title="Edit Phone Number"
                type="button"
              >
                <Pencil className="w-4 h-4 text-[#10B981]" />
              </button>
            </div>
          </div>

          {/* Created At (not editable) */}
          <div className="flex justify-between items-center">
            <span className="text-[#9CA3AF] font-medium">Created At:</span>
            <span className="font-semibold" style={{ color: "#F97316" }}>
              {new Date(profile.createdAt).toLocaleString()}
            </span>
          </div>

          {/* Last Updated (not editable) */}
          <div className="flex justify-between items-center">
            <span className="text-[#9CA3AF] font-medium">Last Updated:</span>
            <span className="font-semibold" style={{ color: "#A855F7" }}>
              {new Date(profile.updatedAt).toLocaleString()}
            </span>
          </div>
        </div>

        {/* User ID */}
        <div className="w-full flex justify-end">
          <span className="text-xs text-[#9CA3AF]">ID: {profile._id}</span>
        </div>
      </div>
    </div>
  )
}

export default Profile