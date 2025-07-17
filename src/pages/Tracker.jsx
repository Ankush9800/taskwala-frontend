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
    <div
  className="min-h-screen flex items-center justify-center w-full px-2"
  style={{ background: '#1E1E2F' }}
>
  {!steps ? (
    // --- ENTRY CARD ---
    <div className="w-[340px] max-w-full flex flex-col gap-6 justify-center items-center p-8 rounded-2xl"
         style={{
           background: "#262649",
           boxShadow: "0 2px 35px #00CFFF22",
           border: "1px solid #a855f73a"
         }}
    >
      {/* Hero icon */}
      <div className="mb-1 flex flex-col items-center gap-1">
        <img src="/assets/track.svg" alt="Track" className="w-12 h-12 mb-1" />
        <h2
          className="text-2xl font-bold"
          style={{ color: "#F5F5F5" }}
        >
          Track your Offer
        </h2>
        <p className="text-sm" style={{ color: "#9CA3AF" }}>
          Select an offer and enter your UPI ID to begin
        </p>
      </div>
      {/* Select Campaign */}
      <Select onValueChange={v => setCampaign(Number(v))} value={campaign.toString()}>
        <SelectTrigger
          className="w-full"
          style={{
            color: "#1E1E2F",
            background: "#F5F5F5",
            borderColor: "#00CFFF"
          }}
        >
          <SelectValue placeholder="Select a campaign" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel style={{ color: "#A855F7" }}>Campaigns</SelectLabel>
            {items?.map(item => (
              <SelectItem value={item.campId.toString()} key={item._id}>
                {item.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {/* UPI Input */}
      <Input
        style={{
          color: "#1E1E2F",
          background: "#F5F5F5",
          borderColor: "#A855F7"
        }}
        value={upiId}
        onChange={e => setUpiId(e.target.value)}
        placeholder="Enter your UPI ID"
      />
      {/* CTA */}
      <Button
        className="w-full font-bold rounded-md py-2 transition"
        style={{
          background: "#F97316",
          color: "#F5F5F5",
          boxShadow: "0 4px 16px #F9731622"
        }}
        disabled={!upiId || !campaign}
        onClick={trackData}
      >
        Track Now
      </Button>
    </div>
  ) : (
    // --- RESULTS CARD ---
    <div className="w-[440px] max-w-full flex flex-col gap-5 justify-center items-center p-10 rounded-2xl"
         style={{
           background: "#262649",
           boxShadow: "0 2px 40px #A855F744",
           border: "1px solid #a855f73a",
           color: "#F5F5F5"
         }}
    >
      <div className="flex flex-col items-center gap-1">
        <div className="flex gap-3 items-center mb-3">
          <img src="/assets/finance_up.svg" className="w-10 h-10" alt="" />
          <h1 className="font-extrabold text-2xl" style={{ color: "#00CFFF" }}>
            Offer Progress
          </h1>
        </div>
        <div className="w-full rounded-xl px-5 py-3 mb-2" style={{ background: "#232336" }}>
          <div className="flex gap-3 items-center mb-1">
            <img src="/assets/reward.svg" className="w-5 h-5" alt="" />
            <span style={{ color: "#9CA3AF" }}>Offer:</span>
            <span style={{ color: "#A855F7", fontWeight: 600 }}>{steps?.[0]?.cName}</span>
          </div>
          <div className="flex gap-3 items-center mb-1">
            <img src="/assets/upi.svg" className="w-5 h-5" alt="" />
            <span style={{ color: "#9CA3AF" }}>UPI ID:</span>
            <span style={{ color: "#10B981", fontWeight: 600 }}>{steps?.[0]?.upiId}</span>
          </div>
          <div className="flex gap-3 items-center">
            <img src="/assets/time.svg" className="w-5 h-5" alt="" />
            <span style={{ color: "#9CA3AF" }}>Updated:</span>
            <span style={{ color: "#F97316", fontWeight: 500 }}>{date?.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 w-full mt-3">
        <h2 className="font-bold text-lg" style={{ color: "#A855F7" }}>
          Steps to Earn Reward
        </h2>
        {steps && steps.length > 0 ? (
          <ol className="relative ">
            {steps.map(step => (
              <li key={step._id} className="mb-6 ml-4 flex items-center group">
                {/* Circle */}
                <span
                  className="absolute -left-3 flex items-center justify-center w-6 h-6 border-2 rounded-full "
                  style={{
                    background: "#10B98160",
                    borderColor: "#10B981"
                  }}
                >
                  <img src="/assets/check.svg" className="w-4 h-4" alt="" />
                </span>
                <div
                  className="flex-1 p-3 rounded-md shadow-sm flex items-center justify-between ml-2"
                  style={{ background: "#222233", color: "#F5F5F5" }}
                >
                  <span className="font-medium">{step.goal}</span>
                  <span
                    className="ml-4 inline-block px-3 py-1 rounded text-xs font-bold"
                    style={{
                      background: "#10B98122",
                      color: "#10B981"
                    }}
                  >
                    Tracked
                  </span>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="font-semibold text-lg px-7 text-center" style={{ color: "#F97316" }}>
            No tracking found. Please try again later.
          </p>
        )}
      </div>
    </div>
  )}
</div>

  )
}

export default Tracker