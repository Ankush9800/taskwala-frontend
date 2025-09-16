import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Toaster } from '@/components/ui/sonner'
import axios from 'axios'
import { AlertCircle, ArrowRight, CreditCard, Loader2Icon, Phone, Zap } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'


function Campaign() {
  const {id} = useParams()
  const [campaignData, setCampaignData] = useState(null)
  const [userPhone, setPhone] = useState("")
  const [userupi, setUpi] = useState("")
  const [issubmiting, setIssubmiting] = useState(false)
  const [campUrl, setCampUrl] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [loading, setLoading] = useState(true)

  const getCampaignById = async()=>{
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/getcampaignbyid/${id}`)
      const camp = res.data.data
      setCampaignData(camp)
      setIsActive(res.data.data.campaignStatus)
      setLoading(false)
      console.log(camp)
    } catch (error) {
      console.log(error)
      setIsActive(false)
      setLoading(false)
    }
  }

  useEffect(()=>{
    getCampaignById()
  },[])

  useEffect(()=>{
    if (campUrl) {
      setTimeout(() => {
        window.open(campUrl,"_blank")
      }, 1000);
    }
  },[campUrl])

  const handleSubmit = async()=>{
    try {
      console.log(campaignData.trackingUrl)
      setIssubmiting(true)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/campaign/submitcampaign`,{
        phone: userPhone,
        upi: userupi,
        cName : campaignData.title,
        provider : campaignData.provider,
        redirectUrl: campaignData.trackingUrl,
        payoutRate : campaignData.payoutRate,
      })
      toast("Submitted successfully",{style: {
      backgroundColor: "#065f46",
      color: "#fff",
      borderColor:"#fff",
      border:"2px"
    },duration:2000,position:"top-right"})
      console.log("request successful", response.data.data);
      setCampUrl(response.data.data.redirectUrl)
    } catch (error) {
      console.log("error while submiting deta", error);
      
    }finally{
      setIssubmiting(false)
    }
  }

  if (loading) {
    return <>
    <div className='flex h-screen w-screen justify-center items-center'>
      <div className='flex animate-spin h-12 w-12 border-3 border-transparent border-t-red-500 border-l-red-500 rounded-full justify-center items-center'>
        <div className='animate-spin-reverse h-10 w-10 border-3 border-transparent border-t-green-500 border-l-green-500 rounded-full'></div>
      </div>
    </div>
    </>
  }

  return (
    <>
      <Toaster/>

      {!isActive? <div className='flex h-screen items-center justify-center'>
       <div className="flex flex-col items-center justify-center min-h-[50vh] max-h-[50%] gap-4 p-8 bg-[#071e23] rounded-xl shadow-md border-2 border-[#F97316]/10 my-7 mx-auto max-w-md">
    {/* <img
      src="/unavailable.svg" // or any icon you like, or replace with an icon component
      alt="Unavailable"
      className="w-20 h-20 opacity-80"
    /> */}
    <h2 className="text-2xl font-bold text-[#F97316] text-center">
      Campaign Unavailable
    </h2>
    <p className="text-base text-[#9CA3AF] text-center">
      This campaign is no longer available.<br />
      Please check back later or explore other offers.
    </p>
    <Button
      className="mt-4 bg-gradient-to-r from-[#F97316] to-[#713306] px-6"
      onClick={() => window.location.href = '/campaigns'} // customize or use router
    >
      Browse Campaigns
    </Button>
  </div>
     </div>:<>
     {/* first card */} 
      <div className='flex flex-col items-center gap-1 py-5'>
        <img className='h-15 w-15 rounded-full' src={campaignData?.campaignImage} alt="" />
        <h2 className='text-2xl font-bold bg-gradient-to-r from-[#00CFFF] to-[#A855F7] bg-clip-text text-transparent'>{campaignData?.title}</h2>
        <p className='text-sm text-[#9CA3AF] px-5 text-center'>{campaignData?.description}</p>
        <h4 className='text-md font-semibold flex gap-2 justify-center'>Earn up to: <p className='text-[#10B981] font-bold'>₹{campaignData?.payoutRate}</p></h4>
      </div>
      {/* Second card */}
      <div className='m-10 md:flex justify-center'>
        <Card className='bg-[#071e23] text-white border-0 md:w-100'>
          <CardHeader>
            <CardTitle className='flex gap-2 items-center'>
            <Zap className='text-cyan-400'/> Join Campaign
            </CardTitle>
            <CardDescription>
              Provide your details to participate in this campaign
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-2'>
            <div className='space-y-2'>
              <Label className='text-sm'>
                <Phone className='size-4'/>
                Phone Number*
              </Label>
              <Input
              className='border-cyan-950 border-2 focus-visible:border-cyan-500'
              placeholder='9876543210'
              id='phone'
              type='tel'
              value={userPhone}
              onChange={(e)=>setPhone(e.target.value)}
              />
              <p className='text-sm text-[#9CA3AF]'>Used for verification and campaign updates</p>
            </div>
            <div className='space-y-2'>
              <Label className='text-sm'>
              <CreditCard className='size-4'/>
                UPI ID*
              </Label>
              <Input
              className='border-cyan-950 border-2 focus-visible:border-cyan-500'
              placeholder='9876543210@ptsbi'
              id='UPI'
              value={userupi}
              onChange={(e)=>setUpi(e.target.value)}
              />
              <p className='text-sm text-[#9CA3AF]'>Rewards will be sent to this UPI ID</p>
            </div>
            <div className='flex justify-center pt-2'>{campUrl?<><p className='text-center'><Button onClick={()=>window.open(campUrl,"_blank")}>Redirecting...</Button></p></>:<Button className='bg-gradient-to-r from-[#F97316] to-[#713306] cursor-pointer' onClick={handleSubmit} disabled={issubmiting}>{issubmiting? <><Loader2Icon className='animate-spin mr-2'/> Submitting... </>: <>Continue to offer <ArrowRight className='ml-1'/></> } </Button>}</div>
          </CardContent>
        </Card>
      </div>
      {/* Third card */}
      <div className='m-10 md:flex justify-center'>
        <Card className='bg-[#071e23] border-0 text-white md:w-100'>
          <CardHeader>
            <CardTitle>
              Offer process
            </CardTitle>
            <CardDescription>
              Follow these steps to successfully complete the offer
            </CardDescription>
          </CardHeader>
          <CardContent>
              
          </CardContent>
        </Card>
      </div>
      {/* fourth card */}
      <div className='m-10 md:flex justify-center'>
        <Card className='bg-[#071e23] border-0 text-white'>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Rules & Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-[#9CA3AF] list-disc px-5">
              <li>
                All content must be original and follow platform community guidelines
              </li>
              <li>
                No fake engagement or bot interactions allowed
              </li>
              <li>
                Must maintain account activity throughout campaign duration
                </li>
              <li>
                Payments processed within 7 days of campaign completion
                </li>
              <li>
                Participants must be 18+ with valid government ID
                </li>
            </ul>
          </CardContent>
        </Card>
      </div>
     </>}

    </>
  )
}

export default Campaign