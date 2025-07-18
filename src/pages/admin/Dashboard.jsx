import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import { Coins, Target, TrendingUp, Users2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function Dashboard() {

  const [totalCamp, setTotalCamp] = useState(0)

  // const getPostback = async()=>{
  //   const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/getpostback`)
  //   console.log(res.data)
  // }

  const campaigns = async()=>{
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/getallcampaign`)
    console.log(res.data)
    setTotalCamp(res.data.length)
  }

  useEffect(()=>{
    // getPostback()
    campaigns()
  },[])

  return (
    <>
      <div className="flex gap-5 w-full mt-5">
              <Card className="bg-[#071e23] border-0 text-white w-1/4">
                <CardHeader className="flex justify-between">
                  <CardTitle>Total Campaigns</CardTitle>
                  <Target className="w-4 text-[#9CA3AF]" />
                </CardHeader>
                <CardContent className="text-[#10B981] font-bold text-2xl">
                  {totalCamp}
                </CardContent>
              </Card>
              <Card className="bg-[#071e23] border-0 text-white w-1/4">
                <CardHeader className="flex justify-between">
                  <CardTitle>Total Submission</CardTitle>
                  <Users2 className="w-4 text-[#9CA3AF]" />
                </CardHeader>
                <CardContent className="text-[#00CFFF] font-bold text-2xl">
                  15
                </CardContent>
              </Card>
              <Card className="bg-[#071e23] border-0 text-white w-1/4">
                <CardHeader className="flex justify-between">
                  <CardTitle>Total Rewards</CardTitle>
                  <Coins className="w-4 text-[#9CA3AF]" />
                </CardHeader>
                <CardContent className="text-[#A855F7] font-bold text-2xl">
                  ₹45345
                </CardContent>
              </Card>
              <Card className="bg-[#071e23] border-0 text-white w-1/4">
                <CardHeader className="flex justify-between">
                  <CardTitle>Conversion Rate</CardTitle>
                  <TrendingUp className="w-4 text-[#9CA3AF]" />
                </CardHeader>
                <CardContent className="text-[#F97316] font-bold text-2xl">
                  74.3%
                </CardContent>
              </Card>
            </div>
    </>
  )
}

export default Dashboard