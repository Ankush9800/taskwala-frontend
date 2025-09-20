import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Toaster } from '@/components/ui/sonner'
import axios from 'axios'
import { AlertCircle, ArrowRight, CreditCard, Loader2Icon, Phone, Zap, CheckCircle, Target, Gift } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'


function Campaign() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get("id")
  const afi = searchParams.get("afi")
  const [campaignData, setCampaignData] = useState(null)
  const [userPhone, setPhone] = useState("")
  const [userupi, setUpi] = useState("")
  const [issubmiting, setIssubmiting] = useState(false)
  const [campUrl, setCampUrl] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [loading, setLoading] = useState(true)
  const [payoutData, setPayoutData] = useState(null)

  const getCampaignById = async()=>{
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/getcampaignbyid`,{
        params:{
          id:id,
          refId:afi
        }
      })
      const camp = res.data.data[0]
      const payout = res.data.data[1]
      setCampaignData(camp)
      setPayoutData(payout)
      setIsActive(camp.campaignStatus)
      setLoading(false)
      console.log(res.data.data)
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
      // console.log(campaignData.trackingUrl)
      setIssubmiting(true)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/campaign/submitcampaign`,{
        phone: userPhone,
        upi: userupi,
        cName : campaignData.title,
        provider : campaignData.provider,
        redirectUrl: campaignData.trackingUrl,
        payoutRate : payoutData.payout,
        referPayout:payoutData.rfPayout,
        refUpiId:payoutData.upiId
      })
      toast("Submitted successfully",{style: {
      backgroundColor: "#065f46",
      color: "#fff",
      borderColor:"#fff",
      border:"2px"
    },duration:2000,position:"top-right"})
      // console.log("request successful", response.data.data);
      setCampUrl(response.data.data.redirectUrl)
    } catch (error) {
      console.log("error while submiting deta", error);
      
    }finally{
      setIssubmiting(false)
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex justify-center items-center'>
        <div className='flex flex-col items-center gap-4'>
          <div className='flex animate-spin h-16 w-16 border-4 border-transparent border-t-[#0B7A75] border-l-[#0B7A75] rounded-full justify-center items-center'>
            <div className='animate-spin-reverse h-12 w-12 border-4 border-transparent border-t-[#054f4c] border-l-[#054f4c] rounded-full'></div>
          </div>
          <p className='text-white text-sm'>Loading campaign...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative z-0'>
      <Toaster/>

      {!isActive ? (
        <div className='min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative z-10'>
          <div className="flex flex-col items-center justify-center gap-6 p-8 bg-black/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-800 max-w-md mx-auto">
            <div className='bg-red-500/20 p-4 rounded-full border border-red-500/30'>
              <AlertCircle className="w-12 h-12 text-red-400" />
            </div>
            <div className='text-center space-y-2'>
              <h2 className="text-2xl font-bold text-white">
                Campaign Unavailable
              </h2>
              <p className="text-gray-400">
                This campaign is no longer available.<br />
                Please check back later or explore other offers.
              </p>
            </div>
            <Button
              className="bg-gradient-to-r from-[#0B7A75] to-[#054f4c] hover:from-[#0B7A75]/80 hover:to-[#054f4c]/80 px-8 py-3 font-medium"
              onClick={() => window.location.href = '/campaigns'}
            >
              Browse Campaigns
            </Button>
          </div>
        </div>
      ) : (
        <div className='p-4 space-y-6 relative z-10'>
          {/* Campaign Header */}
          <div className='text-center pt-8 pb-6 relative z-10'>
            <div className='flex justify-center mb-6'>
              <div className='relative'>
                <img 
                  className='h-20 w-20 rounded-2xl border-4 border-[#0B7A75]/20 shadow-lg' 
                  src={campaignData?.campaignImage} 
                  alt="Campaign" 
                />
                <div className='absolute -bottom-2 -right-2 bg-[#0B7A75] p-1.5 rounded-full'>
                  <Target className='w-4 h-4 text-white' />
                </div>
              </div>
            </div>
            <h1 className='text-3xl font-bold text-white mb-3'>{campaignData?.title}</h1>
            <p className='text-gray-400 text-sm mb-4 max-w-sm mx-auto'>{campaignData?.description}</p>
            
            {/* Earnings Badge */}
            <div className='inline-flex items-center gap-2 bg-gradient-to-r from-[#0B7A75]/20 to-[#054f4c]/20 border border-[#0B7A75]/30 rounded-full px-4 py-2'>
              <Gift className='w-5 h-5 text-[#0B7A75]' />
              <span className='text-white font-medium'>Earn up to </span>
              <span className='text-[#0B7A75] font-bold text-lg'>₹{payoutData?.payout}</span>
            </div>
          </div>

          {/* Join Campaign Card */}
          <Card className='bg-black/80 backdrop-blur-sm border-gray-800 text-white max-w-md mx-auto'>
            <CardHeader className='pb-4'>
              <CardTitle className='flex items-center gap-3 text-xl'>
                <div className='bg-[#0B7A75]/20 p-2 rounded-lg'>
                  <Zap className='w-5 h-5 text-[#0B7A75]'/>
                </div>
                Join Campaign
              </CardTitle>
              <CardDescription className='text-gray-400'>
                Provide your details to participate in this campaign
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Phone Number */}
              <div className='space-y-3'>
                <Label className='flex items-center gap-2 text-sm font-medium text-gray-300'>
                  <Phone className='w-4 h-4 text-[#0B7A75]'/>
                  Phone Number *
                </Label>
                <Input
                  className='bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#0B7A75] focus:ring-[#0B7A75]/20'
                  placeholder='Enter your phone number'
                  type='tel'
                  value={userPhone}
                  onChange={(e)=>setPhone(e.target.value)}
                />
                <p className='text-xs text-gray-500'>Used for verification and campaign updates</p>
              </div>

              {/* UPI ID */}
              <div className='space-y-3'>
                <Label className='flex items-center gap-2 text-sm font-medium text-gray-300'>
                  <CreditCard className='w-4 h-4 text-[#0B7A75]'/>
                  UPI ID *
                </Label>
                <Input
                  className='bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#0B7A75] focus:ring-[#0B7A75]/20'
                  placeholder='yourname@paytm'
                  value={userupi}
                  onChange={(e)=>setUpi(e.target.value)}
                />
                <p className='text-xs text-gray-500'>Rewards will be sent to this UPI ID</p>
              </div>

              {/* Submit Button */}
              <div className='pt-4'>
                {campUrl ? (
                  <Button 
                    className='w-full bg-green-600 hover:bg-green-700 py-3 font-medium'
                    onClick={()=>window.open(campUrl,"_blank")}
                  >
                    <CheckCircle className='w-4 h-4 mr-2' />
                    Redirecting to offer...
                  </Button>
                ) : (
                  <Button 
                    className='w-full bg-gradient-to-r from-[#0B7A75] to-[#054f4c] hover:from-[#0B7A75]/80 hover:to-[#054f4c]/80 py-3 font-medium' 
                    onClick={handleSubmit} 
                    disabled={issubmiting || !userPhone.trim() || !userupi.trim()}
                  >
                    {issubmiting ? (
                      <>
                        <Loader2Icon className='w-4 h-4 mr-2 animate-spin'/> 
                        Submitting...
                      </>
                    ) : (
                      <>
                        Continue to offer 
                        <ArrowRight className='w-4 h-4 ml-2'/>
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Process Steps */}
          <Card className='bg-black/80 backdrop-blur-sm border-gray-800 text-white max-w-md mx-auto'>
            <CardHeader>
              <CardTitle className='flex items-center gap-3'>
                <div className='bg-[#155a69]/20 p-2 rounded-lg'>
                  <Target className='w-5 h-5 text-[#155a69]'/>
                </div>
                How It Works
              </CardTitle>
              <CardDescription className='text-gray-400'>
                Follow these simple steps to earn your reward
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex items-start gap-3'>
                  <div className='bg-[#0B7A75] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-1'>1</div>
                  <div>
                    <p className='font-medium text-white'>Submit Details</p>
                    <p className='text-sm text-gray-400'>Enter your phone and UPI information</p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='bg-[#0B7A75] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-1'>2</div>
                  <div>
                    <p className='font-medium text-white'>Complete Offer</p>
                    <p className='text-sm text-gray-400'>Follow the campaign requirements</p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='bg-[#0B7A75] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-1'>3</div>
                  <div>
                    <p className='font-medium text-white'>Get Rewarded</p>
                    <p className='text-sm text-gray-400'>Receive payment in your UPI account</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rules & Guidelines */}
          <Card className='bg-black/80 backdrop-blur-sm border-gray-800 text-white max-w-md mx-auto'>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className='bg-yellow-500/20 p-2 rounded-lg'>
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                </div>
                Rules & Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-gray-400">
                {[
                  "All details must be original and follow platform guidelines",
                  "No fake engagement or bot interactions allowed", 
                  "Must maintain account activity throughout campaign duration",
                  "Payments processed within 14 days of completion",
                  "Participants must be 18+"
                ].map((rule, index) => (
                  <li key={index} className='flex items-start gap-3'>
                    <CheckCircle className='w-4 h-4 text-green-400 mt-0.5 flex-shrink-0' />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default Campaign