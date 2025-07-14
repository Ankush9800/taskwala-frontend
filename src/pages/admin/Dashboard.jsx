import axios from 'axios'
import React, { useEffect } from 'react'

function Dashboard() {

  const getPostback = async()=>{
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/getpostback`)
    console.log(res.data)
  }

  useEffect(()=>{
    getPostback()
  },[])

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard