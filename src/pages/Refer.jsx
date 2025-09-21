import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import axios from 'axios';
import { Copy, Share2, Gift, IndianRupee, Users, CheckCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

function Refer() {
    const origin = window.location.origin
    const [camp, setCamp] = useState(null)
    const [campId, setCampId] = useState(null)
    const [userPayout, setUserPayout] = useState(0)
    const [referPayout, setReferPayout] = useState(0)
    const [tp, setTp] = useState(0)
    const [cup, setCup] = useState(0)
    const [rp, setRp] = useState(0)
    const [btnType, setBtnType] = useState(false)
    const [upiId, setUpiId] = useState("")
    const [cId, setCId] = useState("")
    const [refLink, setRefLink] = useState("")
    const [copied, setCopied] = useState(false)
    const [campData, setCampData] = useState(null)
    
    const campaigns = async()=>{
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/activecampaigns`);
        // console.log(res)
        setCamp(res.data)
    }

    const referPrice = async()=>{
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/getcampaignbyid`,{
            params:{
                id:campId,
                refId:campData.refId
            }
        })
        // console.log(res.data.data)
        const camp = res.data.data[0]
        setRp(camp.price - camp.payoutRate)
        setTp(camp.price)
        setCId(camp.id)
    }

    useEffect(() => {
      setUserPayout(tp-rp)
      setReferPayout(rp)
      if (rp<1 || rp > tp) {
        setBtnType(true)
      }else{
        setBtnType(false)
      }
    }, [rp, tp])
    
    useEffect(()=>{
        if (campId) {
            referPrice()
        }
        console.log("test",campData)
    },[campId, campData])
    
    useEffect(()=>{
        campaigns()
    },[])

    const genRefLink = async()=>{
        if (upiId) {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/campaign/genrefer`,{
                rp:referPayout,
                up:userPayout,
                tp:tp,
                cId,
                upiId
            })
            // console.log(res)
            setRefLink(`${origin}/camp?id=${cId}&afi=${res.data.id}`)
            toast.success("Referral link generated successfully!")
        }else{
            toast.error("Please enter your UPI ID")
        }
    }

    const copy = ()=>{
        window.navigator.clipboard.writeText(refLink)
        setCopied(true)
        toast.success("Link copied to clipboard!")
        setTimeout(() => setCopied(false), 2000)
    }

    const share = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Join TaskWala and Earn Money!',
                    text: `Join me on TaskWala and start earning! Use my referral link to get started.`,
                    url: refLink,
                });
                toast.success("Shared successfully!")
            } catch (error) {
                copy()
            }
        } else {
            copy()
        }
    }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-4 relative z-0'>
        {/* Header */}
        <div className='text-center pt-8 pb-6 relative z-10'>
            <div className='flex justify-center mb-4'>
                <div className='bg-gradient-to-r from-[#F97316] to-[#713306] p-3 rounded-full'>
                    <Gift className='w-8 h-8 text-white' />
                </div>
            </div>
            <h1 className='text-3xl font-bold text-white mb-2'>Refer & Earn</h1>
            <p className='text-gray-400 text-sm'>Share campaigns and earn money for every successful referral</p>
        </div>

        {/* Main Card */}
        <div className='px-4 relative z-10'>
        <Card className='bg-black/80 backdrop-blur-sm border-gray-800 text-white max-w-md mx-auto relative z-10'>
            <CardHeader className='pb-4'>
                <CardTitle className='flex items-center gap-2 text-xl'>
                    <Users className='w-5 h-5 text-orange-500' />
                    Create Your Referral Link
                </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
                {/* Campaign Selection */}
                <div className='space-y-2'>
                    <Label className='text-sm font-medium text-gray-300'>Select Campaign</Label>
                    <Select onValueChange={(value)=>{
                        const selected = JSON.parse(value)
                        setCampId(selected.id)
                        setCampData(selected)
                    }}>
                        <SelectTrigger className='w-full bg-gray-900 border-gray-700 text-white'>
                            <SelectValue placeholder="Choose a campaign to promote"/>
                        </SelectTrigger>
                        <SelectContent className='bg-gray-900 border-gray-700 text-white'>
                            <SelectGroup>
                                <SelectLabel className='text-gray-400'>Available Campaigns</SelectLabel>
                                {camp?.map((campaign, index)=>(
                                    <SelectItem key={index} value={JSON.stringify(campaign)} className='hover:bg-gray-800'>
                                        {campaign.title}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {campId && (
                    <>
                        {/* Earnings Breakdown */}
                        <div className='bg-gradient-to-r from-gray-900 to-gray-800 p-4 rounded-lg border border-gray-700'>
                            <h3 className='text-sm font-medium text-gray-300 mb-3'>Earnings Breakdown</h3>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='text-center'>
                                    <div className='bg-[#F97316]/20 p-3 rounded-lg border border-[#F97316]/30'>
                                        <IndianRupee className='w-5 h-5 text-[#F97316] mx-auto mb-1' />
                                        <p className='text-xs text-gray-400'>You Earn</p>
                                        <div className='flex items-center justify-center'>
                                            <span className='text-lg font-bold text-[#F97316]'>₹</span>
                                            <input 
                                                type="number" 
                                                className='bg-transparent text-lg font-bold text-[#F97316] w-12 text-center focus:outline-none' 
                                                value={referPayout} 
                                                onChange={(e)=>setRp(e.target.value)}
                                                min="1"
                                                max={tp}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <div className='bg-[#0B7A75]/20 p-3 rounded-lg border border-[#0B7A75]/30'>
                                        <Users className='w-5 h-5 text-[#0B7A75] mx-auto mb-1' />
                                        <p className='text-xs text-gray-400'>Friend Saves</p>
                                        <p className='text-lg font-bold text-[#0B7A75]'>₹{userPayout}</p>
                                    </div>
                                </div>
                            </div>
                            {(rp < 1 || rp > tp) && (
                                <p className='text-red-400 text-xs mt-2 text-center'>
                                    Please enter a valid amount between ₹1 and ₹{tp}
                                </p>
                            )}
                        </div>

                        {/* UPI ID Input */}
                        <div className='space-y-2'>
                            <Label className='text-sm font-medium text-gray-300'>UPI ID for Payments</Label>
                            <Input 
                                placeholder='yourname@paytm' 
                                value={upiId} 
                                onChange={(e)=>setUpiId(e.target.value)}
                                className='bg-gray-900 border-gray-700 text-white placeholder:text-gray-500'
                            />
                        </div>

                        {/* Generate Link Button */}
                        <Button 
                            className='w-full bg-gradient-to-r from-[#F97316] to-[#713306] hover:from-[#F97316]/80 hover:to-[#713306]/80 text-white font-medium py-3' 
                            disabled={btnType || !upiId.trim()} 
                            onClick={genRefLink}
                        >
                            {refLink ? 'Regenerate Link' : 'Generate Referral Link'}
                        </Button>

                        {/* Generated Link */}
                        {refLink && (
                            <div className='space-y-3'>
                                <Label className='text-sm font-medium text-gray-300'>Your Referral Link</Label>
                                <div className='bg-gray-900 border border-gray-700 rounded-lg p-3'>
                                    <p className='text-xs text-gray-400 break-all mb-3'>{refLink}</p>
                                    <div className='flex gap-2'>
                                        <Button 
                                            variant="outline" 
                                            className='flex-1 border-gray-600 hover:bg-gray-800 text-white' 
                                            onClick={copy}
                                        >
                                            {copied ? <CheckCircle className='w-4 h-4 mr-2 text-green-400' /> : <Copy className='w-4 h-4 mr-2' />}
                                            {copied ? 'Copied!' : 'Copy'}
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            className='flex-1 border-gray-600 hover:bg-gray-800 text-white' 
                                            onClick={share}
                                        >
                                            <Share2 className='w-4 h-4 mr-2' />
                                            Share
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
        </div>

        {/* How it Works */}
        <div className='max-w-md mx-auto mt-8 space-y-4 px-4 relative z-10'>
            <h2 className='text-lg font-semibold text-white text-center mb-4'>How it Works</h2>
            <div className='space-y-3'>
                <div className='flex items-start gap-3 text-sm'>
                    <div className='bg-[#F97316] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5'>1</div>
                    <div>
                        <p className='text-white font-medium'>Select a Campaign</p>
                        <p className='text-gray-400'>Choose from available campaigns to promote</p>
                    </div>
                </div>
                <div className='flex items-start gap-3 text-sm'>
                    <div className='bg-[#F97316] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5'>2</div>
                    <div>
                        <p className='text-white font-medium'>Set Your Earnings</p>
                        <p className='text-gray-400'>Decide how much you want to earn per referral</p>
                    </div>
                </div>
                <div className='flex items-start gap-3 text-sm'>
                    <div className='bg-[#F97316] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5'>3</div>
                    <div>
                        <p className='text-white font-medium'>Share & Earn</p>
                        <p className='text-gray-400'>Share your link and earn when friends complete tasks</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Refer