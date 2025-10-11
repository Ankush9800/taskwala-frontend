import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Toaster } from '@/components/ui/sonner';
import {
  Search,
  CheckCircle,
  Clock,
  Target,
  DollarSign,
  CreditCard,
  Phone,
  ExternalLink,
  AlertCircle,
  Sparkles,
  BarChart3
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import axios from 'axios';

function Tracker() {
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [upiId, setUpiId] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState(null)

  // Mock campaigns data
  // const campaign = [
  //   { id: 'CMP001', name: 'Social Media Boost', reward: 500 },
  //   { id: 'CMP002', name: 'Product Review Campaign', reward: 750 },
  //   { id: 'CMP003', name: 'Referral Challenge', reward: 1000 },
  //   { id: 'CMP004', name: 'App Download Campaign', reward: 300 },
  // ];

  // Mock tracking steps
  // const trackingSteps = [
  //   { 
  //     id: 1, 
  //     title: 'Campaign Registration', 
  //     description: 'Successfully registered for the campaign',
  //     status: 'completed',
  //     timestamp: '2025-09-20 10:30 AM'
  //   },
  //   { 
  //     id: 2, 
  //     title: 'Task Completion', 
  //     description: 'Completed all required campaign tasks',
  //     status: 'completed',
  //     timestamp: '2025-09-20 02:15 PM'
  //   },
  //   { 
  //     id: 3, 
  //     title: 'Verification Process', 
  //     description: 'Submission under review by admin team',
  //     status: 'in-progress',
  //     timestamp: '2025-09-20 03:45 PM'
  //   },
  //   { 
  //     id: 4, 
  //     title: 'Payment Processing', 
  //     description: 'Reward payment will be processed upon approval',
  //     status: 'pending',
  //     timestamp: null
  //   }
  // ];

  const getCampaigns = async()=>{
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/trackoffers`)
    console.log(res.data)
    setCampaigns(res.data)
  }

  const tracking = async()=>{
    try {
      setLoading(true);
      if (!selectedCampaign || !upiId) {
        toast.error('Please fill all required fields');
        setLoading(false);
        return;
      }
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/userpostback`,{
        params:{
          upiid:upiId,
          campid:selectedCampaign
        }
      })

      setTrackingData(res.data.data)
      console.log(res.data)
      
      // if (res.data.data && res.data.data.length > 0) {
      //   const trackingInfo = res.data.data[0];
      //   const selectedCamp = campaigns.find(c => c.campId === selectedCampaign);
        
      //   // Create tracking steps based on the data
      //   const steps = [
      //     {
      //       id: 1,
      //       title: 'Campaign Registration',
      //       description: `Successfully registered for ${trackingInfo.cName}`,
      //       status: 'completed',
      //       timestamp: new Date(trackingInfo.createdAt).toLocaleString()
      //     },
      //     {
      //       id: 2,
      //       title: 'Task Completion',
      //       description: `Goal: ${trackingInfo.goal} - Click registered`,
      //       status: 'completed',
      //       timestamp: new Date(trackingInfo.updatedAt).toLocaleString()
      //     },
      //     {
      //       id: 3,
      //       title: 'Verification Process',
      //       description: 'Submission under review by admin team',
      //       status: trackingInfo.payout > 0 ? 'completed' : 'in-progress',
      //       timestamp: trackingInfo.payout > 0 ? new Date(trackingInfo.updatedAt).toLocaleString() : null
      //     },
      //     {
      //       id: 4,
      //       title: 'Payment Processing',
      //       description: trackingInfo.payout > 0 ? `Payment of ₹${trackingInfo.payout} processed` : 'Reward payment will be processed upon approval',
      //       status: trackingInfo.payout > 0 ? 'completed' : 'pending',
      //       timestamp: trackingInfo.payout > 0 ? new Date(trackingInfo.updatedAt).toLocaleString() : null
      //     }
      //   ];

      //   setTrackingData({
      //     campaign: {
      //       name: trackingInfo.cName,
      //       id: trackingInfo.campId
      //     },
      //     steps: steps,
      //     submissionId: trackingInfo._id.slice(-8).toUpperCase(),
      //     totalReward: trackingInfo.payout || selectedCamp?.payoutRate || 0,
      //     provider: trackingInfo.provider,
      //     goal: trackingInfo.goal,
      //     clickId: trackingInfo.clickId,
      //     ip: trackingInfo.ip
      //   });
      //   toast.success('Tracking data loaded successfully!');
      // } else {
      //   toast.error('No tracking data found for this campaign and UPI ID');
      // }
      
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error('Failed to fetch tracking data');
    }
  }

  useEffect(()=>{
    getCampaigns()
  },[])

  const getStepIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-[#0B7A75]" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-[#F97316]" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed':
        return 'border-[#0B7A75] bg-[#0B7A75]/10';
      case 'in-progress':
        return 'border-[#F97316] bg-[#F97316]/10';
      case 'pending':
        return 'border-gray-600 bg-gray-800/50';
      default:
        return 'border-gray-600 bg-gray-800/50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-16">
      <Toaster />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0B7A75]/20 to-[#054f4c]/20 border border-[#0B7A75]/30 rounded-full px-4 py-2 mb-8">
              <BarChart3 className="w-4 h-4 text-[#0B7A75]" />
              <span className="text-sm font-medium text-white">Campaign Tracking</span>
              <Sparkles className="w-4 h-4 text-[#0B7A75]" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Track Your</span>
              <br />
              <span className="bg-gradient-to-r from-[#0B7A75] to-[#054f4c] bg-clip-text text-transparent">
                Progress
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Enter your campaign details to track your submission status and reward progress
            </p>
          </div>

          {/* Tracking Form */}
          <Card className="bg-black/80 backdrop-blur-sm border-gray-800 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-[#0B7A75]" />
                Track Your Campaign
              </CardTitle>
              <CardDescription className="text-gray-400">
                Select your campaign and enter your details to view progress
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Select Campaign</label>
                  <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                    <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white focus:border-[#0B7A75]">
                      <SelectValue placeholder="Choose a campaign" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      {campaigns?.map((campaign, index) => (
                        <SelectItem key={index} value={campaign.campId} className="text-white hover:bg-gray-800">
                          {campaign.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">UPI ID</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="yourname@paytm"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#0B7A75]"
                    />
                  </div>
                </div>
              </div>

              <Button 
                onClick={tracking}
                disabled={loading || !selectedCampaign || !upiId}
                className="w-full bg-gradient-to-r from-[#0B7A75] to-[#054f4c] hover:from-[#0B7A75]/80 hover:to-[#054f4c]/80 text-lg py-6"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Tracking...
                  </div>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Track My Progress
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Tracking Results */}
          {trackingData && (
            <div className="space-y-6">
              {/* Campaign Info */}
              <Card className="bg-black/80 backdrop-blur-sm border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{trackingData.cName}</h3>
                      {/* <p className="text-gray-400">Submission ID: {trackingData.submissionId}</p> */}
                      <p className="text-gray-400 text-sm">Campaign ID: {trackingData.campId}</p>
                    </div>
                  </div>
                  
                  {/* Additional tracking details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-700">
                    <div>
                      <p className="text-xs text-gray-400">Campaign Name</p>
                      <p className="text-white font-medium">{trackingData[0].cName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Click ID</p>
                      <p className="text-white font-mono text-sm">{trackingData[0].clickId?.slice(0, 12)}...</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">IP Address</p>
                      <p className="text-white font-mono text-sm">{trackingData[0].ip}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Steps */}
              <Card className="bg-black/80 backdrop-blur-sm border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#0B7A75]" />
                    Progress Timeline
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Track your campaign completion status
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {trackingData.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-1 pb-8">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-white">{step.cName}</h4>
                            <Badge 
                              className={'bg-[#0B7A75] text-white'}
                            >
                              {step.goal}
                            </Badge>
                          </div>
                          <p className="text-gray-400 text-sm mb-2">{step?.description}</p>
                          {step.updatedAt && (
                            <p className="text-xs text-gray-500">{(new Date(step?.updatedAt)).toLocaleString()}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Additional Info */}
              {/* <Card className="bg-black/80 backdrop-blur-sm border-gray-800">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center gap-2 text-[#0B7A75] mb-2">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Steps Completed</span>
                      </div>
                      <p className="text-2xl font-bold text-white">
                        {trackingData.steps.filter(s => s.status === 'completed').length} / {trackingData.steps.length}
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-center gap-2 text-gray-400 mb-2">
                        <CreditCard className="w-5 h-5" />
                        <span className="font-semibold">UPI ID</span>
                      </div>
                      <p className="text-white font-mono">{upiId}</p>
                    </div>
                  </div>
                </CardContent>
              </Card> */}
            </div>
          )}

          {/* Empty State */}
          {!trackingData && (
            <Card className="bg-black/80 backdrop-blur-sm border-gray-800 mt-8">
              <CardContent className="p-12 text-center">
                <Target className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Ready to Track</h3>
                <p className="text-gray-400">
                  Fill in your campaign details above to see your progress and tracking information
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}

export default Tracker;