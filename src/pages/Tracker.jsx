import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Tracker() {

    const [upiId, setUpiId] = useState("")
    const [campaign, setCampaign] = useState("")
    const [items, setItems] = useState(null)
    const [steps, setSteps] = useState(null)

    const date = new Date(steps?.[steps.length - 1]?.updatedAt)

    const campaigns = async()=>{
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/activecampaigns`)
        setItems(res.data)
        console.log(res.data);
    }

    const trackData = async()=>{
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/userpostback`,{
                params:{
                    upiid : upiId,
                    campid : campaign
                }
            })
            setSteps(res.data.data)
            console.log(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        campaigns()
    },[])


  return (
    <div className='h-screen flex items-center justify-center w-full bg-purple-800'>
        {!steps?<div className='h-52 w-52 flex flex-col gap-2 justify-center items-center p-5 rounded-md bg-white'>
            <Select onValueChange={(value)=>setCampaign(Number(value))} value={campaign.toString()}>
                <SelectTrigger className='text-black w-full border-black'>
                    <SelectValue placeholder="Select a campaign"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Campaigns</SelectLabel>
                        {items?.map((item)=>(<SelectItem value={item.campId.toString()} key={item._id}>{item.title}</SelectItem>))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Input className='border-black text-black' value={upiId} onChange={(e)=>setUpiId(e.target.value)} placeholder='Enter your UPI ID'/>
            <Button disabled={!upiId || !campaign} onClick={trackData}>Submit</Button>
        </div> :<div className='w-104 m-4 flex flex-col gap-2 justify-center items-center p-5 rounded-md bg-white text-black'>
            <div className='flex gap-2 items-center'><img src="/assets/finance_up.svg" alt="finance" className='size-10' /><h1 className='font-bold text-4xl'>Track offer process</h1></div>
            <div className='flex flex-col bg-gray-300 p-3 rounded-md font-bold'>
                <div className='flex gap-2 justify-start items-center'><img src="/assets/reward.svg" alt="reward" className='size-4'/><p>Offer name: <span className='text-purple-700'>{steps?.[0]?.cName}</span></p></div>
                <div className='flex gap-2 justify-start items-center'><img src="/assets/upi.svg" alt="reward" className='size-4'/><p>UPI ID: <span className='text-green-700'>{steps?.[0]?.upiId}</span></p></div>
                <div className='flex gap-2 justify-start items-center'><img src="/assets/time.svg" alt="reward" className='size-4'/><p>Last updated: <span className='text-red-600'>{date?.toLocaleString()}</span></p></div>
            </div>
            <div className='flex flex-col gap-2 justify-center items-center'>
                <h2 className='font-semibold'>Reach to payout state to earn reward</h2>
                {steps && steps.length> 0?<>{steps?.map((step)=>(<div className='flex gap-5 justify-between font-bold' key={step._id}><p className='bg-gray-400 flex items-center rounded-md px-2 py-1'>{step.goal}</p><div className='flex gap-1 items-center justify-center bg-[#0f5a2d62] px-2 py-1 rounded-md'><img src="/assets/check.svg" alt="" /><p>Tracked</p></div></div>))}</>:(<p className='font-semibold text-red-600 text-xl px-5'>No tracking found please again later.</p>)}
            </div>
        </div>}
        
    </div>
  )
}

export default Tracker