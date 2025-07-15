import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Tracker() {

    const [upiId, setUpiId] = useState("")
    const [campaign, setCampaign] = useState("")
    const [items, setItems] = useState(null)

    console.log(campaign)

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
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        campaigns()
    },[])


  return (
    <div className='h-screen flex items-center justify-center w-full bg-purple-800'>
        <div className='h-52 w-52 flex flex-col gap-2 justify-center items-center p-5 rounded-md bg-white'>
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
        </div>
    </div>
  )
}

export default Tracker