import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import {
  Clock,
  Headphones,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  User,
  Globe,
  ArrowRight,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subjest, setSubjest] = useState("")
  const [message, setMessage] = useState("")
  const [btnType, setBtnType] = useState(true)
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoading(true)
      setBtnType(true)
      const res  = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/contact/sendmsg`,{
        name,
        email,
        sub:subjest,
        message
      })
      console.log(res)
      toast("Submitted successfully",{style: {
        backgroundColor: "#065f46",
        color: "#fff",
        borderColor:"#fff",
        border:"2px"
      },duration:2000,position:"top-right"})
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
      setBtnType(false)
    }
  };

  useEffect(()=>{
    if (email && subjest && message && name) {
      setBtnType(false)
    }else {setBtnType(true)}
  },[email, subjest, message, name])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-16">
      <Toaster/>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0B7A75]/20 to-[#054f4c]/20 border border-[#0B7A75]/30 rounded-full px-4 py-2 mb-8">
            <Headphones className="w-4 h-4 text-[#0B7A75]" />
            <span className="text-sm font-medium text-white">24/7 Support Available</span>
            <Sparkles className="w-4 h-4 text-[#0B7A75]" />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Get in</span>
            <br />
            <span className="bg-gradient-to-r from-[#F97316] to-[#713306] bg-clip-text text-transparent">
              Touch
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Have questions about campaigns, rewards, or need technical support? We're here to help you every step of the way.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-black/80 backdrop-blur-sm border-gray-800 hover:border-[#F97316]/30 transition-all duration-300">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl text-white flex items-center gap-3">
                    <MessageSquare className="w-6 h-6 text-[#F97316]" />
                    Send us a Message
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-lg">
                    Fill out the form below and we'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-white font-medium">Full Name</label>
                        <Input
                          name="name"
                          value={name}
                          onChange={(e)=>setName(e.target.value)}
                          placeholder="Your full name"
                          className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#F97316] transition-colors"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-white font-medium">Email Address</label>
                        <Input
                          name="email"
                          type="email"
                          value={email}
                          onChange={(e)=>setEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#F97316] transition-colors"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-white font-medium">Subject</label>
                      <Input
                        name="subject"
                        value={subjest}
                        onChange={(e)=>setSubjest(e.target.value)}
                        placeholder="What's this about?"
                        className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#F97316] transition-colors"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-white font-medium">Message</label>
                      <Textarea
                        name="message"
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#F97316] transition-colors resize-none"
                        required
                      />
                    </div>
                    
                    <Button
                      disabled={btnType}
                      onClick={handleSubmit}
                      size="lg"
                      className="cursor-pointer w-full bg-gradient-to-r from-[#F97316] to-[#713306] hover:from-[#F97316]/80 hover:to-[#713306]/80 text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      {loading?<>
                      Sending...
                      </>:<>
                      Send Message
                      <ArrowRight className="w-5 h-5 ml-2" />
                      </>}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Quick Contact Card */}
              <Card className="bg-black/80 backdrop-blur-sm border-gray-800 hover:border-[#155a69]/30 transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-white flex items-center gap-3">
                    <Headphones className="w-5 h-5 text-[#155a69]" />
                    Quick Contact
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Reach out through these channels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="bg-gradient-to-r from-[#F97316] to-[#713306] p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Email Support</p>
                      <Link
                        to="mailto:contact@twcampaign.in"
                        className="text-[#F97316] hover:text-[#F97316]/80 transition-colors"
                      >
                        contact@twcampaign.in
                      </Link>
                      <p className="text-sm text-gray-400">Response within 2-4 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="bg-gradient-to-r from-[#155a69] to-[#F97316] p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Live Chat</p>
                      <p className="text-sm text-gray-400">Coming Soon</p>
                      <p className="text-sm text-gray-400">Real-time assistance</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="bg-gradient-to-r from-[#10B981] to-[#155a69] p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Phone Support</p>
                      <p className="text-sm text-gray-400">Coming Soon</p>
                      <p className="text-sm text-gray-400">Direct consultation</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Office Information */}
              <Card className="bg-black/80 backdrop-blur-sm border-gray-800 hover:border-[#10B981]/30 transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-white flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#10B981]" />
                    Office Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="bg-gradient-to-r from-[#10B981] to-[#F97316] p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Address</p>
                      <p className="text-gray-400">Durgapur, West Bengal</p>
                      <p className="text-sm text-gray-400">India</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="bg-gradient-to-r from-[#F97316] to-[#155a69] p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Working Hours</p>
                      <p className="text-sm text-gray-400">Monday - Saturday</p>
                      <p className="text-sm text-gray-400">10:00 AM - 8:00 PM IST</p>
                      <p className="text-sm text-gray-400 mt-1">Sunday: Closed</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="bg-gradient-to-r from-[#155a69] to-[#10B981] p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Time Zone</p>
                      <p className="text-gray-400">IST (UTC +5:30)</p>
                      <p className="text-sm text-gray-400">India Standard Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-black/40">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#10B981]/20 border border-[#10B981]/30 rounded-full px-4 py-2 mb-8">
            <MessageSquare className="w-4 h-4 text-[#10B981]" />
            <span className="text-sm font-medium text-white">Need Quick Answers?</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-white">Check Our</span>
            <span className="bg-gradient-to-r from-[#F97316] to-[#713306] bg-clip-text text-transparent"> FAQ</span>
          </h2>
          
          <p className="text-xl text-gray-400 mb-8">
            Find answers to commonly asked questions about campaigns, rewards, and platform features.
          </p>
          
          <Button
            size="lg"
            variant="outline"
            className="border-[#0B7A75] bg-transparent hover:bg-[#0B7A75]/10 text-[#0B7A75] hover:text-[#0B7A75] px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
          >
            Browse FAQ
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}

export default Contact;
