import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import { IndianRupee, User, Target, TrendingUp, Users, Search, Filter, Star } from 'lucide-react';
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

function Campaigns() {

  const [campaign, setCampaign] = useState([])
  const [cplength, setCplength] = useState(0)
  const [rewards, setRewards] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/getallcampaign`);
      // console.log(res);
      const activeCapaigns = await res?.data.filter(camp => camp.campaignStatus === true);
      setLoading(false)
      setCampaign(activeCapaigns)
      setCplength(activeCapaigns.length)
      let rewards = 0
      for (let i = 0; i < activeCapaigns.length; i++) {
      rewards += activeCapaigns[i].payoutRate
      }
      const formated = rewards.toLocaleString()
      setRewards(formated)
    } catch (error) {
      console.log(error)
    }
  };
// console.log(campaign)
  useEffect(() => {
    fetchCampaigns(); // Run this when the page opens
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-16 flex justify-center items-center'>
        <div className='flex flex-col items-center gap-4'>
          <div className='flex animate-spin h-16 w-16 border-4 border-transparent border-t-[#0B7A75] border-l-[#0B7A75] rounded-full justify-center items-center'>
            <div className='animate-spin-reverse h-12 w-12 border-4 border-transparent border-t-[#054f4c] border-l-[#054f4c] rounded-full'></div>
          </div>
          <p className='text-white text-sm'>Loading campaigns...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-16 relative z-0'>
      {/* Header Section */}
      <div className="pt-8 pb-8 px-4 text-center relative z-10">
        <div className='flex justify-center mb-6'>
          <div className='bg-gradient-to-r from-[#0B7A75] to-[#054f4c] p-4 rounded-2xl'>
            <Target className='w-8 h-8 text-white' />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Active Campaigns
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
          Join thousands of participants in exciting campaigns. Earn rewards by
          completing tasks, sharing content, and achieving goals.
        </p>
      </div>

      {/* Stats Section */}
      <div className='px-4 mb-8 relative z-10'>
        <div className='max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <div className='bg-black/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center relative z-10'>
            <div className='bg-[#10B981]/20 p-3 rounded-full w-fit mx-auto mb-3'>
              <Target className='w-6 h-6 text-[#10B981]' />
            </div>
            <h3 className='text-2xl font-bold text-[#10B981] mb-1'>{cplength}</h3>
            <p className='text-gray-400 text-sm'>Active Campaigns</p>
          </div>
          
          <div className='bg-black/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center relative z-10'>
            <div className='bg-[#0B7A75]/20 p-3 rounded-full w-fit mx-auto mb-3'>
              <Users className='w-6 h-6 text-[#0B7A75]' />
            </div>
            <h3 className='text-2xl font-bold text-[#0B7A75] mb-1'>8,462</h3>
            <p className='text-gray-400 text-sm'>Total Participants</p>
          </div>
          
          <div className='bg-black/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center relative z-10'>
            <div className='bg-[#155a69]/20 p-3 rounded-full w-fit mx-auto mb-3'>
              <TrendingUp className='w-6 h-6 text-[#155a69]' />
            </div>
            <h3 className='text-2xl font-bold text-[#155a69] mb-1'>₹{rewards}</h3>
            <p className='text-gray-400 text-sm'>Total Rewards</p>
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="px-4 pb-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {campaign.length === 0 ? (
            <div className='text-center py-12'>
              <div className='bg-gray-800/50 p-8 rounded-2xl border border-gray-700 max-w-md mx-auto'>
                <Target className='w-12 h-12 text-gray-500 mx-auto mb-4' />
                <h3 className='text-xl font-semibold text-white mb-2'>No Active Campaigns</h3>
                <p className='text-gray-400'>Check back later for new opportunities!</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaign.map((camp) => (
                <Card key={camp._id} className="bg-black/80 backdrop-blur-sm border-gray-800 text-white hover:border-[#0B7A75]/30 transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className='flex-1'>
                        <CardTitle className="text-white font-bold text-lg leading-tight mb-2 group-hover:text-[#0B7A75] transition-colors">
                          {camp.title}
                        </CardTitle>
                        <div className='flex items-center gap-2 mb-3'>
                          <img 
                            className="rounded-full h-8 w-8 border-2 border-[#0B7A75]/20" 
                            src={camp.campaignImage} 
                            alt="Campaign" 
                          />
                          <Star className='w-4 h-4 text-yellow-400 fill-current' />
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
                      {camp.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2 bg-[#10B981]/20 px-3 py-1.5 rounded-full border border-[#10B981]/30">
                        <IndianRupee className="w-4 h-4 text-[#10B981]" />
                        <span className="text-[#10B981] font-bold text-sm">{camp.payoutRate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <User className="w-4 h-4" />
                        <span className="text-sm">2,456</span>
                      </div>
                    </div>
                    
                    <Link 
                      className='block w-full bg-gradient-to-r from-[#0B7A75] to-[#054f4c] hover:from-[#0B7A75]/80 hover:to-[#054f4c]/80 px-4 py-3 rounded-lg text-center font-medium transition-all duration-300 transform hover:scale-105' 
                      to={`/camp?id=${camp.id}&afi=${camp.refId}`}
                    >
                      Get Started
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Campaigns