import React from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  icons,
  MoveRightIcon,
  Play,
  Shield,
  Star,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function Home() {
const navigate = useNavigate()
  return (
    <>
      {/* first part */}
      <div className="overflow-x-hidden flex flex-col gap-10 pt-32 pb-16 justify-center items-center bg-[#0f0f1d] text-white">
        <div className="w-screen flex justify-center items-center">
          <span className="mx-10 bg-gradient-to-r from-[#00CFFF] to-[#167bc8] rounded-2xl px-2 py-1 font-bold text-[#F5F5F5]">
            🚀 Revolutionizing Campaign Rewards
          </span>
        </div>
        <div className="w-screen flex justify-center items-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-[#10B981] via-[#00CFFF] to-[#A855F7] bg-clip-text text-transparent leading-tight flex flex-col items-center ">
            Transform Engagement
            <br />
            <span className="bg-gradient-to-r from-[#00CFFF] to-[#A855F7] bg-clip-text text-transparent">
              Into Rewards
            </span>
          </h1>
        </div>
        <div className="w-screen flex justify-center items-center bg-re">
          <p className="w-3/4 xl:w-1/2 lg:w-1/2 md:1/2 sm:w-3/4 text-[#9CA3AF]">
            The future of campaign-based rewards is here. Create, manage, and
            participate in dynamic campaigns that drive real engagement and
            deliver meaningful rewards.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center">
          <Button
            onClick={()=>navigate("/campaigns")}
            variant="outline"
            size="lg"
            className="cursor-pointer hover:text-white  bg-gradient-to-r from-[#F97316] to-[#713306] border-0 transition-all duration-300 transform hover:scale-110"
          >
            <span className="pb-1">Start your journey</span>
            <MoveRightIcon />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-primary/20 cursor-pointer hover:scale-110 group text-black"
          >
            <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
            <p className="">Watch demo</p>
          </Button>
        </div>
        <div className="w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 items-center justify-center">
          <div className="flex flex-col items-center">
            <h1 className="bg-gradient-to-r from-[#10B981] to-[#044731] bg-clip-text text-transparent font-bold text-4xl">
              10K+
            </h1>
            <p className="text-[#9CA3AF]">Active Campaigns</p>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="bg-gradient-to-r from-[#10B981] to-[#044731] bg-clip-text text-transparent font-bold text-4xl">
              500K+
            </h1>
            <p className="text-[#9CA3AF]">Rewards Distributed</p>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="bg-gradient-to-r from-[#10B981] to-[#044731] bg-clip-text text-transparent font-bold text-4xl">
              98%
            </h1>
            <p className="text-[#9CA3AF]">Satisfaction Rate</p>
          </div>
        </div>
      </div>
      {/* second part */}
      <div className="overflow-x-hidden bg-[#0c0c28] text-white">
        <div className="flex justify-center mt-16">
          <span className="mx-10 w-auto bg-gradient-to-r from-[#00CFFF] to-[#167bc8] rounded-2xl px-2 py-1 font-bold text-[#F5F5F5]">
            Features
          </span>
        </div>
        <div className="flex flex-col items-center justify-center text-center my-5 gap-10">
          <h2 className="text-4xl font-bold">
            Everything You Need to
            <span className="bg-gradient-to-r from-[#00CFFF] to-[#A855F7] bg-clip-text text-transparent">
              {" "}
              Succeed
            </span>
          </h2>
          <p className="text-[#9CA3AF] mx-10">
            Powerful tools and insights to create compelling campaigns and
            maximize engagement
          </p>
        </div>
        <div className="mx-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-center my-16">
            <Card className="group w-full mx-auto max-w-sm bg-[#1E1E2F] border-transparent border-2 hover:border-[#356555] transition-all duration-300">
              <CardHeader>
                <div className="bg-gradient-to-br from-[#00CFFF] to-[#A855F7] h-12 w-12 flex items-center justify-center rounded-md text-white group-hover:scale-110 transition-all duration-300">
                  <Zap className="w-6 h-6" />
                </div>
                <CardTitle className="text-white mt-4 text-lg">
                  Smart Campaign Creation
                </CardTitle>
                <CardDescription className="text-[#9CA3AF]">
                  AI-powered tools to design-converting campaigns in minutes,
                  not hours.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="group w-full mx-auto max-w-sm bg-[#1E1E2F] border-transparent border-2 hover:border-[#356555] transition-all duration-300">
              <CardHeader>
                <div className="bg-gradient-to-br from-[#A855F7] to-[#F97316] h-12 w-12 flex items-center justify-center rounded-md text-white group-hover:scale-110 transition-all duration-300">
                  <Users className="w-6 h-6" />
                </div>
                <CardTitle className="text-white mt-4 text-lg">
                  Real-time Analytics
                </CardTitle>
                <CardDescription className="text-[#9CA3AF]">
                  Track engagement, monitor performance, and optimize campaigns
                  with live data insights.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="group w-full mx-auto max-w-sm bg-[#1E1E2F] border-transparent border-2 hover:border-[#356555] transition-all duration-300">
              <CardHeader>
                <div className="bg-gradient-to-br from-[#10B981] to-[#00CFFF] h-12 w-12 flex items-center justify-center rounded-md text-white group-hover:scale-110 transition-all duration-300">
                  <Trophy className="w-6 h-6" />
                </div>
                <CardTitle className="text-white mt-4 text-lg">
                  Automated Rewards
                </CardTitle>
                <CardDescription className="text-[#9CA3AF]">
                  Seamless reward distribution with multiple payout options and
                  instant processing.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="group w-full mx-auto max-w-sm bg-[#1E1E2F] border-transparent border-2 hover:border-[#356555] transition-all duration-300">
              <CardHeader>
                <div className="bg-gradient-to-br from-[#F97316] to-[#A855F7] h-12 w-12 flex items-center justify-center rounded-md text-white group-hover:scale-110 transition-all duration-300">
                  <Shield className="w-6 h-6" />
                </div>
                <CardTitle className="text-white mt-4 text-lg">
                  Fraud Protection
                </CardTitle>
                <CardDescription className="text-[#9CA3AF]">
                  Advanced security measures to ensure authentic participation
                  and protect your campaigns.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="group w-full mx-auto max-w-sm bg-[#1E1E2F] border-transparent border-2 hover:border-[#356555] transition-all duration-300">
              <CardHeader>
                <div className="bg-gradient-to-br from-[#00CFFF] to-[#10B981] h-12 w-12 flex items-center justify-center rounded-md text-white group-hover:scale-110 transition-all duration-300">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <CardTitle className="text-white mt-4 text-lg">
                  Performance Optimization
                </CardTitle>
                <CardDescription className="text-[#9CA3AF]">
                 Machine learning algorithms continuously improve campaign effectiveness and ROI.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="group w-full mx-auto max-w-sm bg-[#1E1E2F] border-transparent border-2 hover:border-[#356555] transition-all duration-300">
              <CardHeader>
                <div className="bg-gradient-to-br from-[#A855F7] to-[#10B981] h-12 w-12 flex items-center justify-center rounded-md text-white group-hover:scale-110 transition-all duration-300">
                  <Star className="w-6 h-6" />
                </div>
                <CardTitle className="text-white mt-4 text-lg">
                  Custom Integrations
                </CardTitle>
                <CardDescription className="text-[#9CA3AF]">
                  Connect with your existing tools and platforms for a unified workflow experience.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
      {/* third part */}
      <div className="bg-[#0f0f1d] text-white py-16">
        <div className="flex justify-center">
          <span className="mx-10 bg-gradient-to-r from-[#00CFFF] to-[#167bc8] rounded-2xl px-2 py-1 font-bold text-[#F5F5F5] my-5">
            Process
          </span>
        </div>
        <div className="flex items-center justify-center text-center my-5 gap-10r">
          <h2 className="text-4xl font-bold">
            Simple Steps to
            <span className="bg-gradient-to-r from-[#00CFFF] to-[#A855F7] bg-clip-text text-transparent">
              {" "}
              Success
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  place-items-center">
          <div className="flex flex-col gap-4 items-center max-w-md p-10">
            <div className="w-16 h-16 bg-gradient-to-br from-[#00CFFF] to-[#A855F7] rounded-[50%] flex items-center justify-center font-bold text-xl">
              1
            </div>
            <h3 className="text-xl font-semibold text-[#F5F5F5]">
              Create Campaign
            </h3>
            <p className="text-[#9CA3AF] text-center">
              Design your campaign with our intuitive builder. Set goals, define
              rewards, and customize engagement rules.
            </p>
          </div>
          <div className="flex flex-col gap-4 items-center max-w-md p-10">
            <div className="w-16 h-16 bg-gradient-to-br from-[#A855F7] to-[#F97316] rounded-[50%] flex items-center justify-center font-bold text-xl">
              1
            </div>
            <h3 className="text-xl font-semibold text-[#F5F5F5]">
              Drive Engagement
            </h3>
            <p className="text-[#9CA3AF] text-center">
              Launch your campaign and watch as participants engage with your
              content and complete tasks.
            </p>
          </div>
          <div className="flex flex-col gap-4 items-center max-w-md p-10">
            <div className="w-16 h-16 bg-gradient-to-br from-[#F97316] to-[#10B981] rounded-[50%] flex items-center justify-center font-bold text-xl">
              1
            </div>
            <h3 className="text-xl font-semibold text-[#F5F5F5]">
              Distribute Rewards
            </h3>
            <p className="text-[#9CA3AF] text-center">
              Automatically distribute rewards to participants and track ROI
              with detailed analytics.
            </p>
          </div>
        </div>
      </div>
      {/* fourth part */}
      <div className="bg-[#131331] text-white py-16">
        <div className="flex flex-col justify-center items-center text-center gap-8 mb-8">
          <h2 className="text-4xl font-bold">
            Ready to Transform Your
            <span className="bg-gradient-to-r from-[#00CFFF] to-[#A855F7] bg-clip-text text-transparent">
              {" "}
              Campaigns?
            </span>
          </h2>
          <p className="text-[#9CA3AF] mx-10">
            Join thousands of successful brands who are already using Taskwala
            to drive engagement and reward their communities.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-8 px-10">
          <Button size="lg" className="bg-gradient-to-r from-[#F97316] to-[#713306] border-0 hover:scale-110 transition-all duration-300 cursor-pointer" onClick={()=>navigate("/campaign")}> <ArrowRight className="w-5 h-5"/>Start now</Button>
          <Button size="lg" variant="outline" className="bg-transparent hover:scale-110 transition-all duration-300 cursor-pointer">Schedule Demo</Button>
        </div>
      </div>
    </>
  );
}

export default Home;
