import { Login } from '@/pages'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'


function ProtectedRoute({children}) {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const checkAuth = async ()=>{
      try {
        const admin = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/getadmin`,{
          withCredentials : true
        })
        setIsAuthenticated(true)
      } catch (error) {
        console.log("admin not found");
        setIsAuthenticated(false)
      }finally{
        setLoading(false)
      }
    }

    checkAuth()
  },[])

  if (loading) {
    return <>
    <div className='flex h-screen w-screen justify-center items-center'>
      <div className='flex animate-spin h-12 w-12 border-3 border-transparent border-t-red-500 border-l-red-500 rounded-full justify-center items-center'>
        <div className='animate-spin-reverse h-10 w-10 border-3 border-transparent border-t-green-500 border-l-green-500 rounded-full'></div>
      </div>
    </div>
    </>
  }

  return isAuthenticated? children : <Navigate to="/login"/>
}

export default ProtectedRoute