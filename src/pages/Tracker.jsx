import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/sonner';
import {
  Search,
  Filter,
  Download,
  Eye,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Target,
  Award,
  Users,
  BarChart3,
  Activity,
  RefreshCw,
  Sparkles,
  DollarSign,
  Gift,
  Hash,
  User,
  MapPin,
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

function Tracker() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('campaigns');

  // Mock data for demonstration
  const [campaigns] = useState([
    {
      id: 'CMP001',
      name: 'Social Media Boost',
      type: 'Social Engagement',
      status: 'active',
      progress: 75,
      reward: 500,
      participants: 245,
      startDate: '2025-09-15',
      endDate: '2025-09-30',
      location: 'Global',
    },
    {
      id: 'CMP002',
      name: 'Product Review Campaign',
      type: 'Content Creation',
      status: 'completed',
      progress: 100,
      reward: 750,
      participants: 180,
      startDate: '2025-08-20',
      endDate: '2025-09-10',
      location: 'India',
    },
    {
      id: 'CMP003',
      name: 'Referral Challenge',
      type: 'Referral',
      status: 'pending',
      progress: 0,
      reward: 1000,
      participants: 0,
      startDate: '2025-09-25',
      endDate: '2025-10-15',
      location: 'USA',
    },
  ]);

  const [rewards] = useState([
    {
      id: 'RWD001',
      campaign: 'Social Media Boost',
      amount: 150,
      status: 'paid',
      date: '2025-09-18',
      type: 'Cash',
      transactionId: 'TXN789456123',
    },
    {
      id: 'RWD002',
      campaign: 'Product Review Campaign',
      amount: 750,
      status: 'processing',
      date: '2025-09-15',
      type: 'Bank Transfer',
      transactionId: 'TXN789456124',
    },
    {
      id: 'RWD003',
      campaign: 'Beta Testing Program',
      amount: 300,
      status: 'pending',
      date: '2025-09-20',
      type: 'Gift Card',
      transactionId: 'TXN789456125',
    },
  ]);

  const stats = {
    totalCampaigns: campaigns.length,
    activeCampaigns: campaigns.filter(c => c.status === 'active').length,
    totalRewards: rewards.reduce((sum, r) => sum + r.amount, 0),
    paidRewards: rewards.filter(r => r.status === 'paid').reduce((sum, r) => sum + r.amount, 0),
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-[#10B981] text-white';
      case 'completed': return 'bg-[#F97316] text-white';
      case 'pending': return 'bg-[#155a69] text-white';
      case 'paid': return 'bg-[#10B981] text-white';
      case 'processing': return 'bg-[#F97316] text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <Activity className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <RefreshCw className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-16">
      <Toaster />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F97316]/20 to-[#713306]/20 border border-[#F97316]/30 rounded-full px-4 py-2 mb-8">
              <BarChart3 className="w-4 h-4 text-[#F97316]" />
              <span className="text-sm font-medium text-white">Real-time Tracking</span>
              <Sparkles className="w-4 h-4 text-[#F97316]" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Campaign</span>
              <br />
              <span className="bg-gradient-to-r from-[#F97316] to-[#713306] bg-clip-text text-transparent">
                Tracker
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Monitor your campaign performance, track rewards, and analyze engagement metrics in real-time
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-black/80 backdrop-blur-sm border-gray-800 hover:border-[#F97316]/30 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Total Campaigns</p>
                    <p className="text-3xl font-bold text-white">{stats.totalCampaigns}</p>
                  </div>
                  <div className="bg-gradient-to-r from-[#F97316] to-[#713306] p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 backdrop-blur-sm border-gray-800 hover:border-[#155a69]/30 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Active Campaigns</p>
                    <p className="text-3xl font-bold text-white">{stats.activeCampaigns}</p>
                  </div>
                  <div className="bg-gradient-to-r from-[#155a69] to-[#F97316] p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 backdrop-blur-sm border-gray-800 hover:border-[#10B981]/30 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Total Rewards</p>
                    <p className="text-3xl font-bold text-white">₹{stats.totalRewards.toLocaleString()}</p>
                  </div>
                  <div className="bg-gradient-to-r from-[#10B981] to-[#155a69] p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 backdrop-blur-sm border-gray-800 hover:border-[#F97316]/30 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Paid Rewards</p>
                    <p className="text-3xl font-bold text-white">₹{stats.paidRewards.toLocaleString()}</p>
                  </div>
                  <div className="bg-gradient-to-r from-[#F97316] to-[#10B981] p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filters and Search */}
          <Card className="bg-black/80 backdrop-blur-sm border-gray-800 mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search campaigns, rewards, or transaction IDs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#F97316]"
                  />
                </div>
                
                <div className="flex gap-3">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40 bg-gray-900/50 border-gray-700 text-white">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-40 bg-gray-900/50 border-gray-700 text-white">
                      <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button 
                    variant="outline" 
                    className="border-gray-600 hover:bg-gray-800 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-black/60 border border-gray-800 mb-8">
              <TabsTrigger value="campaigns" className="data-[state=active]:bg-[#F97316] data-[state=active]:text-white">
                <Target className="w-4 h-4 mr-2" />
                Campaigns
              </TabsTrigger>
              <TabsTrigger value="rewards" className="data-[state=active]:bg-[#F97316] data-[state=active]:text-white">
                <Gift className="w-4 h-4 mr-2" />
                Rewards
              </TabsTrigger>
            </TabsList>

            {/* Campaigns Tab */}
            <TabsContent value="campaigns">
              <div className="grid gap-6">
                {campaigns.map((campaign) => (
                  <Card key={campaign.id} className="bg-black/80 backdrop-blur-sm border-gray-800 hover:border-[#F97316]/30 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-xl font-semibold text-white">{campaign.name}</h3>
                            <Badge className={getStatusColor(campaign.status)}>
                              {getStatusIcon(campaign.status)}
                              <span className="ml-1 capitalize">{campaign.status}</span>
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-400">
                              <Hash className="w-4 h-4" />
                              <span>ID: {campaign.id}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                              <Users className="w-4 h-4" />
                              <span>{campaign.participants} participants</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                              <MapPin className="w-4 h-4" />
                              <span>{campaign.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                              <Calendar className="w-4 h-4" />
                              <span>{campaign.startDate} - {campaign.endDate}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                              <Award className="w-4 h-4" />
                              <span>₹{campaign.reward} reward</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                              <Target className="w-4 h-4" />
                              <span>{campaign.type}</span>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="mt-4">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-400">Progress</span>
                              <span className="text-white">{campaign.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-[#F97316] to-[#713306] h-2 rounded-full transition-all duration-300"
                                style={{ width: `${campaign.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-800 text-white">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          <Button size="sm" className="bg-gradient-to-r from-[#F97316] to-[#713306] hover:from-[#F97316]/80 hover:to-[#713306]/80">
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Analytics
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Rewards Tab */}
            <TabsContent value="rewards">
              <div className="grid gap-6">
                {rewards.map((reward) => (
                  <Card key={reward.id} className="bg-black/80 backdrop-blur-sm border-gray-800 hover:border-[#F97316]/30 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-xl font-semibold text-white">₹{reward.amount.toLocaleString()}</h3>
                            <Badge className={getStatusColor(reward.status)}>
                              {getStatusIcon(reward.status)}
                              <span className="ml-1 capitalize">{reward.status}</span>
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-400">
                              <Hash className="w-4 h-4" />
                              <span>ID: {reward.id}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                              <Target className="w-4 h-4" />
                              <span>{reward.campaign}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                              <Calendar className="w-4 h-4" />
                              <span>{reward.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                              <DollarSign className="w-4 h-4" />
                              <span>{reward.type}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                              <Hash className="w-4 h-4" />
                              <span>TXN: {reward.transactionId}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-800 text-white">
                            <Eye className="w-4 h-4 mr-2" />
                            View Receipt
                          </Button>
                          <Button size="sm" className="bg-gradient-to-r from-[#F97316] to-[#713306] hover:from-[#F97316]/80 hover:to-[#713306]/80">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

export default Tracker;