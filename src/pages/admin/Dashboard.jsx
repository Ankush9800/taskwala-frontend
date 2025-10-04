import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import axios from 'axios';
import {
  Coins,
  Target,
  TrendingUp,
  Users2,
  Activity,
  DollarSign,
  Eye,
  Calendar,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  RefreshCw,
  Download,
  Filter,
  Sparkles,
  CheckCircle,
  AlertCircle,
  XCircle,
  Award,
  Globe,
  Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useMainContext } from '@/lib/context';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

function Dashboard() {
  const {systemData, responseTime} = useMainContext()
  const [totalCamp, setTotalCamp] = useState(0);
  const [totalSubmission, setTotalSubmission] = useState(0);
  const [totalConversion, setTotalConversion] = useState(0);
  const [totalPayout, setTotalPayout] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uptime, setUptime] = useState("")
  const [subData, setSubData] = useState(null)
  const [monthlyGrowthRate, setMonthlyGrowthRate] = useState(0)
  const [chartData, setChartData] = useState(null)
  const [anaMonthSub, setAnaMonthSub] = useState(null)

  // Mock data for recent activities and trends
  const [recentActivities] = useState([
    {
      id: 1,
      type: 'campaign_created',
      title: 'New Campaign Created',
      description: 'Social Media Boost campaign launched',
      timestamp: '2 hours ago',
      status: 'success',
    },
    {
      id: 2,
      type: 'payment_processed',
      title: 'Payment Processed',
      description: '₹15,000 distributed to 25 users',
      timestamp: '4 hours ago',
      status: 'success',
    },
    {
      id: 3,
      type: 'high_activity',
      title: 'High Activity Alert',
      description: 'Campaign #CMP001 receiving high engagement',
      timestamp: '6 hours ago',
      status: 'warning',
    },
    {
      id: 4,
      type: 'system_update',
      title: 'System Update',
      description: 'Analytics dashboard updated with new metrics',
      timestamp: '1 day ago',
      status: 'info',
    },
  ]);

  const [quickStats] = useState({
    activeUsers: 1247,
    pendingPayments: 23,
    avgConversionRate: 12.5,
    totalRevenue: 125000,
  });

  const osData = ()=>{
    const time = systemData.uptime
    const hours = Math.floor(time/3600)
    const minuites = Math.floor((time % 3600)/60)
    const second = Math.floor(time % 60)
    setUptime(`${hours}h ${minuites}m ${second}s`)
  }

  const campaigns = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/getallcampaign`);
      setTotalCamp(res.data.length);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  const conversion = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/getpostback`);
      const conv = res.data.data[0];
      setTotalConversion(res.data.data[1]);
      let totalPayout = 0;
      for (let i = 0; i < conv.length; i++) {
        totalPayout += conv[i]?.payout ?? 0;
      }
      setTotalPayout(totalPayout);
    } catch (error) {
      console.error('Error fetching conversions:', error);
    }
  };

  const submission = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/getallsubmission`);
      const subs = res.data.data
      setTotalSubmission(subs[1]);
      setSubData(subs)
      setMonthlyGrowthRate(Math.round((subs[3]-subs[4])/subs[4]*100))
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const refreshData = async () => {
    setLoading(true);
    await Promise.all([campaigns(), conversion(), submission()]);
    setLoading(false);
  };

  const getAnalytics = async()=>{
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/analytics`)
    console.log(res.data)
    setChartData(res.data)
  }

  const anaSubmissions = async()=>{
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/monthsdata`)
    console.log(res.data)
    setAnaMonthSub(res.data)
  }

  useEffect(() => {
    refreshData();
    osData()
    getAnalytics()
    anaSubmissions()
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'campaign_created': return <Target className="w-4 h-4" />;
      case 'payment_processed': return <DollarSign className="w-4 h-4" />;
      case 'high_activity': return <TrendingUp className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getActivityColor = (status) => {
    switch (status) {
      case 'success': return 'text-[#10B981] bg-[#10B981]/20';
      case 'warning': return 'text-[#F97316] bg-[#F97316]/20';
      case 'info': return 'text-[#155a69] bg-[#155a69]/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const chartConfig = {
    activeUsers: {
      label: "activeUsers",
      color: "#F97316",
    },
    totalSubmissions: {
      label: "Submissions",
      color: "#F97316",
    },
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F97316]/20 to-[#713306]/20 border border-[#F97316]/30 rounded-full px-4 py-2 mb-4">
            <BarChart3 className="w-4 h-4 text-[#F97316]" />
            <span className="text-sm font-medium text-white">Admin Dashboard</span>
            <Sparkles className="w-4 h-4 text-[#F97316]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Admin</h1>
          <p className="text-gray-400">Here's what's happening with your campaigns today.</p>
        </div>
        
        <div className="flex gap-3">
          <Button
            onClick={refreshData}
            disabled={loading}
            variant="outline"
            className="border-[#F97316] bg-transparent hover:bg-[#F97316]/10 text-[#F97316] hover:text-[#F97316]"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button className="bg-gradient-to-r from-[#F97316] to-[#713306] hover:from-[#F97316]/80 hover:to-[#713306]/80">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-black/80 backdrop-blur-sm border-gray-800 hover:border-[#F97316]/30 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Campaigns</CardTitle>
            <div className="bg-gradient-to-r from-[#F97316] to-[#713306] p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Target className="w-4 h-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">{totalCamp}</div>
            <div className="flex items-center text-sm">
              <ArrowUpRight className="w-4 h-4 text-[#10B981] mr-1" />
              <span className="text-[#10B981]">+12%</span>
              <span className="text-gray-400 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/80 backdrop-blur-sm border-gray-800 hover:border-[#155a69]/30 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Monthly Submissions</CardTitle>
            <div className="bg-gradient-to-r from-[#155a69] to-[#F97316] p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Users2 className="w-4 h-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">{subData?.[3]}</div>
            <div className="flex items-center text-sm">
              {monthlyGrowthRate > 0 ?<div className='flex items-center'>
                <ArrowUpRight className="w-4 h-4 text-[#10B981] mr-1" />
                <span className="text-[#10B981]">+{monthlyGrowthRate}%</span>
              </div>:<div className='flex items-center'>
                <ArrowDownRight className="w-4 h-4 text-[#F97316] mr-1" />
                <span className="text-[#F97316]">{monthlyGrowthRate}%</span>
              </div>}
              <span className="text-gray-400 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/80 backdrop-blur-sm border-gray-800 hover:border-[#10B981]/30 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Rewards</CardTitle>
            <div className="bg-gradient-to-r from-[#10B981] to-[#155a69] p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Coins className="w-4 h-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">₹{totalPayout.toLocaleString()}</div>
            <div className="flex items-center text-sm">
              <ArrowUpRight className="w-4 h-4 text-[#10B981] mr-1" />
              <span className="text-[#10B981]">+15%</span>
              <span className="text-gray-400 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/80 backdrop-blur-sm border-gray-800 hover:border-[#F97316]/30 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Conversion Rate</CardTitle>
            <div className="bg-gradient-to-r from-[#F97316] to-[#10B981] p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">
              {totalSubmission > 0 ? Number((totalConversion/totalSubmission)*100).toFixed(2) : 0}%
            </div>
            <div className="flex items-center text-sm">
              <ArrowDownRight className="w-4 h-4 text-[#F97316] mr-1" />
              <span className="text-[#F97316]">-2%</span>
              <span className="text-gray-400 ml-1">from last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-black/80 backdrop-blur-sm border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Users</p>
                <p className="text-2xl font-bold text-white">{quickStats.activeUsers.toLocaleString()}</p>
              </div>
              <Activity className="w-8 h-8 text-[#10B981]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/80 backdrop-blur-sm border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending Payments</p>
                <p className="text-2xl font-bold text-white">{quickStats.pendingPayments}</p>
              </div>
              <Clock className="w-8 h-8 text-[#F97316]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/80 backdrop-blur-sm border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Conversion</p>
                <p className="text-2xl font-bold text-white">{quickStats.avgConversionRate}%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-[#155a69]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/80 backdrop-blur-sm border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white">₹{quickStats.totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-[#10B981]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="bg-black/60 border border-gray-800">
          <TabsTrigger value="analytics" className="data-[state=active]:bg-[#F97316] data-[state=active]:text-white text-white">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#F97316] data-[state=active]:text-white text-white">
            <PieChart className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-[#F97316] data-[state=active]:text-white text-white">
            <Activity className="w-4 h-4 mr-2" />
            Recent Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Visitors</CardTitle>
                <CardDescription className="text-gray-400">
                  Daily visitors metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className='h-full w-full'>
                  <AreaChart data={chartData} margin={{left: 0, right: 12,}}>
                  {/* <CartesianGrid vertical={false}/> */}
                  <XAxis dataKey="date"/>
                  <YAxis dataKey="activeUsers"/>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent/>}/>
                  <Area dataKey="activeUsers" type="natural"/>
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="bg-black/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Performance Trends</CardTitle>
                <CardDescription className="text-gray-400">
                  Monthly submission metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className='h-full w-full'>
                  <AreaChart data={anaMonthSub} margin={{left: 0, right: 12,}}>
                  {/* <CartesianGrid vertical={false}/> */}
                  <XAxis dataKey="month"/>
                  <YAxis dataKey="totalSubmissions"/>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent/>}/>
                  <Area dataKey="totalSubmissions" type={"bump"}/>
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Campaign Performance */}
            <Card className="bg-black/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#F97316]" />
                  Campaign Performance
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Top performing campaigns this month
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Social Media Boost</p>
                      <p className="text-sm text-gray-400">245 participants</p>
                    </div>
                    <Badge className="bg-[#10B981] text-white">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Product Review Campaign</p>
                      <p className="text-sm text-gray-400">180 participants</p>
                    </div>
                    <Badge className="bg-[#F97316] text-white">Completed</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Referral Challenge</p>
                      <p className="text-sm text-gray-400">95 participants</p>
                    </div>
                    <Badge className="bg-[#155a69] text-white">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card className="bg-black/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#10B981]" />
                  System Health
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Current system status and performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white">API Response Time</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                      <span className="text-[#10B981]">{responseTime}ms</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">System Usage</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                      <span className="text-[#10B981]">{Math.floor((systemData?.cpuLoad[1]/systemData?.cpuLength)*100)}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Memory Usage</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                      <span className="text-[#10B981]">{Math.floor(((systemData?.memory.total-systemData?.memory.free)/systemData?.memory?.total)*100)}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Server Uptime</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                      <span className="text-[#10B981]">{uptime}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="bg-black/80 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#F97316]" />
                Recent Activity
              </CardTitle>
              <CardDescription className="text-gray-400">
                Latest activities and system events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-lg">
                    <div className={`p-2 rounded-lg ${getActivityColor(activity.status)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{activity.title}</h4>
                      <p className="text-sm text-gray-400">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Dashboard;