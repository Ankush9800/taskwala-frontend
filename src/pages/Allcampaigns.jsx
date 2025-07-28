import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import { IndianRupee, User } from 'lucide-react';
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

function Campaigns() {

  const [title, settitle] = useState([])
  const [cplength, setCplength] = useState(0)
  const [rewards, setRewards] = useState(0)

  const fetchCampaigns = async () => {
    // const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/getallcampaign`);
    console.log(res);
    const activeCapaigns = res.data.filter(camp => camp.campaignStatus === true);
    settitle(activeCapaigns)
    setCplength(activeCapaigns.length)
    let rewards = 0
    for (let i = 0; i < activeCapaigns.length; i++) {
    rewards += activeCapaigns[i].payoutRate
    }
    const formated = rewards.toLocaleString()
    setRewards(formated)
  };

  useEffect(() => {
    fetchCampaigns(); // Run this when the page opens
  }, []);

  


  return (
    <>
      <div className="mt-20 flex flex-col gap-5 justify-center items-center">
        <h1 className="font-bold text-4xl bg-gradient-to-r from-[#00CFFF] to-[#A855F7] bg-clip-text text-transparent">
          Explore Active Campaigns
        </h1>
        <p className="text-md text-[#9CA3AF] px-10 text-center">
          Join thousands of participants in exciting campaigns. Earn rewards by
          completing tasks, sharing content, and achieving goals.
        </p>
        {/* <button onClick={fetchCampaigns} className='px-4 py-2 bg-amber-600 rounded-md'>test</button> */}
      </div>
      <div className='mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:w-2/3 place-items-center gap-5 mb-10'>
        <div className='flex flex-col items-center justify-center'>
          <h2 className='font-bold text-xl text-[#10B981]'>{cplength}</h2>
          <p className='text-md text-[#9CA3AF]'>Active Campaigns</p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h2 className='font-bold text-xl text-[#F97316]'>8,462</h2>
          <p className='text-md text-[#9CA3AF]'>Total Participants</p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h2 className='font-bold text-xl text-[#00CFFF]'>{rewards}</h2>
          <p className='text-md text-[#9CA3AF]'>Total Rewards</p>
        </div>
      </div>

      {/* this is card section */}
      <div className="mx-auto grid [grid-template-columns:repeat(auto-fit,_minmax(250px,_1fr))] gap-5 px-4 w-full justify-items-center">
        {title.map((camp)=>(<div key={camp._id}  className='w-full md:max-w-80'><Card className="bg-[#071e23] border-none text-white w-full">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex justify-between items-center w-full">
          <CardTitle className="text-[#10B981] font-bold">{camp.title}</CardTitle>
          <img className="rounded-full h-8" src={camp.campaignImage} alt="" />
          </div>
          <CardDescription className="h-16 text-gray-300 text-justify line-clamp-2">{camp.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex justify-between w-3/4">
            <div className="flex items-center justify-center gap-1 text-[#10B981]">
              <IndianRupee className="size-4" />
              {camp.payoutRate}
            </div>
            <div className="flex items-center gap-1">
              <User className="size-4" /> 2456
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Link className='bg-gradient-to-r from-[#F97316] to-[#713306] px-5 py-2 rounded-md' to={`/campaign/${camp._id}`}>Get Started</Link>
          </div>
        </CardContent>
      </Card>
      </div>))}
      </div>
    </>
  );
}

export default Campaigns