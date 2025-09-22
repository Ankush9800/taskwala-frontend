import React from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  MoveRightIcon,
  Play,
  Shield,
  Star,
  TrendingUp,
  Trophy,
  Users,
  Zap,
  Target,
  Gift,
  CheckCircle,
  Sparkles,
  BarChart3,
  Rocket,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0B7A75]/20 to-[#054f4c]/20 border border-[#0B7A75]/30 rounded-full px-4 py-2 mb-8">
            <Rocket className="w-4 h-4 text-[#0B7A75]" />
            <span className="text-sm font-medium text-white">Revolutionizing Campaign Rewards</span>
            <Sparkles className="w-4 h-4 text-[#0B7A75]" />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Transform</span>
            <br />
            <span className="bg-gradient-to-r from-[#0B7A75] to-[#054f4c] bg-clip-text text-transparent">
              Engagement
            </span>
            <br />
            <span className="text-white">Into Rewards</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            The future of campaign-based rewards is here. Create, manage, and participate in dynamic campaigns that drive real engagement and deliver meaningful rewards.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              onClick={() => navigate("/campaigns")}
              size="lg"
              className="bg-gradient-to-r from-[#0B7A75] to-[#054f4c] hover:from-[#0B7A75]/80 hover:to-[#054f4c]/80 px-8 py-4 text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Target className="w-5 h-5 mr-2" />
              Start Your Journey
              <MoveRightIcon className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#0B7A75] bg-transparent hover:bg-[#0B7A75]/10 text-[#0B7A75] hover:text-[#0B7A75] px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-[#0B7A75] mb-2">10K+</h3>
              <p className="text-gray-400">Active Campaigns</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-[#0B7A75] mb-2">500K+</h3>
              <p className="text-gray-400">Rewards Distributed</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-[#0B7A75] mb-2">98%</h3>
              <p className="text-gray-400">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#155a69]/20 border border-[#155a69]/30 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-[#155a69]" />
              <span className="text-sm font-medium text-white">Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Everything You Need to</span>
              <br />
              <span className="bg-gradient-to-r from-[#0B7A75] to-[#054f4c] bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Powerful tools and insights to create compelling campaigns and maximize engagement
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-black/80 backdrop-blur-sm border-gray-800 hover:border-[#0B7A75]/30 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-r from-[#0B7A75] to-[#054f4c] p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl mb-2">Smart Campaign Creation</CardTitle>
                <CardDescription className="text-gray-400 leading-relaxed">
                  AI-powered tools to design converting campaigns in minutes, not hours.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/80 backdrop-blur-sm border-gray-800 hover:border-[#0B7A75]/30 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-r from-[#0B7A75] to-[#054f4c] p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl mb-2">Real-time Analytics</CardTitle>
                <CardDescription className="text-gray-400 leading-relaxed">
                  Track engagement, monitor performance, and optimize campaigns with live data insights.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/80 backdrop-blur-sm border-gray-800 hover:border-[#0B7A75]/30 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-r from-[#22D186] to-[#0B7A75] p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl mb-2">Automated Rewards</CardTitle>
                <CardDescription className="text-gray-400 leading-relaxed">
                  Seamless reward distribution with multiple payout options and instant processing.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/80 backdrop-blur-sm border-gray-800 hover:border-[#0B7A75]/30 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-r from-[#0B7A75] to-[#054f4c] p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl mb-2">Fraud Protection</CardTitle>
                <CardDescription className="text-gray-400 leading-relaxed">
                  Advanced security measures to ensure authentic participation and protect your campaigns.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/80 backdrop-blur-sm border-gray-800 hover:border-[#0B7A75]/30 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-r from-[#0B7A75] to-[#22D186] p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl mb-2">Performance Optimization</CardTitle>
                <CardDescription className="text-gray-400 leading-relaxed">
                  Machine learning algorithms continuously improve campaign effectiveness and ROI.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/80 backdrop-blur-sm border-gray-800 hover:border-[#0B7A75]/30 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-r from-[#22D186] to-[#0B7A75] p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl mb-2">Custom Integrations</CardTitle>
                <CardDescription className="text-gray-400 leading-relaxed">
                  Connect with your existing tools and platforms for a unified workflow experience.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#10B981]/20 border border-[#10B981]/30 rounded-full px-4 py-2 mb-6">
              <Target className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-medium text-white">Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Simple Steps to</span>
              <br />
              <span className="bg-gradient-to-r from-[#0B7A75] to-[#054f4c] bg-clip-text text-transparent">
                Success
              </span>
            </h2>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-[#0B7A75] to-[#054f4c] w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Create Campaign</h3>
              <p className="text-gray-400 leading-relaxed">
                Design your campaign with our intuitive builder. Set goals, define rewards, and customize engagement rules.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-r from-[#0B7A75] to-[#054f4c] w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Drive Engagement</h3>
              <p className="text-gray-400 leading-relaxed">
                Launch your campaign and watch as participants engage with your content and complete tasks.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-r from-[#22D186] to-[#0B7A75] w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Distribute Rewards</h3>
              <p className="text-gray-400 leading-relaxed">
                Automatically distribute rewards to participants and track ROI with detailed analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Ready to Transform Your</span>
              <br />
              <span className="bg-gradient-to-r from-[#0B7A75] to-[#054f4c] bg-clip-text text-transparent">
                Campaigns?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Join thousands of successful brands who are already using TaskWala to drive engagement and reward their communities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#0B7A75] to-[#054f4c] hover:from-[#0B7A75]/80 hover:to-[#054f4c]/80 px-8 py-4 text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" 
                onClick={() => navigate("/campaigns")}
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Start Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-[#0B7A75] bg-transparent hover:bg-[#0B7A75]/10 text-[#0B7A75] hover:text-[#0B7A75] px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

