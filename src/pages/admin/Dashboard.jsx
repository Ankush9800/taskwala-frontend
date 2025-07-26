import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip } from '@radix-ui/react-tooltip'
import axios from 'axios'
import { AreaChart, Coins, Target, TrendingUp, Users2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'


function Dashboard() {

  const [totalCamp, setTotalCamp] = useState(0)
  const [totalSubmission, setTotalSubmission] = useState(0)
  const [totalConversion, setTotalConversion] = useState(0)
  const [totalPayout, setTotalPayout] = useState(0)

  const campaigns = async()=>{
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/getallcampaign`)
    console.log(res.data)
    setTotalCamp(res.data.length)
  }

  const conversion = async()=>{
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/getpostback`)
    const conv = res.data.data[0]
    setTotalConversion(res.data.data[1])
    let totalPayout = 0
    for (let i = 0; i < conv.length; i++) {
      totalPayout += conv[i]?.payout ?? 0
    }
    setTotalPayout(totalPayout)
    console.log("this is payout",totalPayout)
  }

  const submission = async()=>{
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/getallsubmission`)
    // console.log(res.data.data[1])
    setTotalSubmission(res.data.data[1])
  }

  useEffect(()=>{
    campaigns()
    conversion()
    submission()
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
                  {totalSubmission}
                </CardContent>
              </Card>
              <Card className="bg-[#071e23] border-0 text-white w-1/4">
                <CardHeader className="flex justify-between">
                  <CardTitle>Total Rewards</CardTitle>
                  <Coins className="w-4 text-[#9CA3AF]" />
                </CardHeader>
                <CardContent className="text-[#A855F7] font-bold text-2xl">
                  ₹{totalPayout}
                </CardContent>
              </Card>
              <Card className="bg-[#071e23] border-0 text-white w-1/4">
                <CardHeader className="flex justify-between">
                  <CardTitle>Conversion Rate</CardTitle>
                  <TrendingUp className="w-4 text-[#9CA3AF]" />
                </CardHeader>
                <CardContent className="text-[#F97316] font-bold text-2xl">
                  {Number((totalConversion/totalSubmission)*100).toFixed(2)}%
                </CardContent>
              </Card>
      </div>
    </>
  )
}

export default Dashboard