import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Target, Mail, ExternalLink, Heart, ArrowRight, Contact } from 'lucide-react'
import axios from 'axios'
import { Toaster } from './ui/sonner'
import { toast } from 'sonner'

function Footer() {
  const [mail, setMail] = useState("")

  const sendMail = async()=>{
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/contact/news?email=${mail}`)
      console.log(res)
      toast("Submitted successfully",{style: {
        backgroundColor: "#065f46",
        color: "#fff",
        borderColor:"#fff",
        border:"2px"
      },duration:2000,position:"top-right"})
    } catch (error) {
      console.error(error)
      toast("Submission failed",{style: {
        backgroundColor: "red",
        color: "#fff",
        borderColor:"#fff",
        border:"2px"
      },duration:2000,position:"top-right"})
    }
  }
  return (
    <footer className='bg-black/95 border-t border-gray-800 mt-auto'>
      <Toaster/>
      {/* Main Footer Content */}
      <div className='max-w-7xl mx-auto px-4 md:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          
          {/* Brand Section */}
          <div className='lg:col-span-1 space-y-4'>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-[#0B7A75] to-[#054f4c] p-2 rounded-lg">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-bold text-xl bg-gradient-to-r from-[#0B7A75] to-[#054f4c] bg-clip-text text-transparent">
                TaskWala
              </h2>
            </div>
            <p className='text-gray-400 text-sm leading-relaxed max-w-sm'>
              The future of campaign-based rewards. Engage, reward and grow your community like never before.
            </p>
            
            {/* Newsletter Signup */}
            <div className='space-y-3'>
              <h4 className='text-white font-medium text-sm'>Stay Updated</h4>
              <div className='flex gap-2'>
                <input 
                  type="email"
                  value={mail} 
                  onChange={(e)=>setMail(e.target.value)}
                  placeholder="Enter your email"
                  className='flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316]'
                />
                <button onClick={sendMail} className='bg-gradient-to-r from-[#F97316] to-[#713306] hover:from-[#F97316]/80 hover:to-[#713306]/80 px-4 py-2 rounded-lg transition-all duration-300'>
                  <ArrowRight className='w-4 h-4 text-white' />
                </button>
              </div>
            </div>
          </div>

          {/* Product Section */}
          <div className='space-y-4'>
            <h4 className='font-semibold text-white text-lg'>Product</h4>
            <div className='space-y-3'>
              <Link 
                to="/campaigns"
                className='flex items-center gap-2 text-gray-400 hover:text-[#F97316] transition-colors duration-300 text-sm group'
              >
                <span>Campaigns</span>
                <ExternalLink className='w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </Link>
              <Link 
                to="/refer"
                className='flex items-center gap-2 text-gray-400 hover:text-[#F97316] transition-colors duration-300 text-sm group'
              >
                <span>Refer & Earn</span>
                <ExternalLink className='w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </Link>
              <Link 
                to="/pricing"
                className='flex items-center gap-2 text-gray-400 hover:text-[#F97316] transition-colors duration-300 text-sm group'
              >
                <span>Pricing</span>
                <ExternalLink className='w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </Link>
            </div>
          </div>

          {/* Company Section */}
          <div className='space-y-4'>
            <h4 className='font-semibold text-white text-lg'>Company</h4>
            <div className='space-y-3'>
              <Link 
                to="https://www.facebook.com/profile.php?id=61574122799682"
                target="_blank"
                className='flex items-center gap-2 text-gray-400 hover:text-[#F97316] transition-colors duration-300 text-sm group'
              >
                <span>About Us</span>
                <ExternalLink className='w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </Link>
              <Link 
                to="/contact"
                className='flex items-center gap-2 text-gray-400 hover:text-[#F97316] transition-colors duration-300 text-sm group'
              >
                <Mail className='w-3 h-3' />
                <span>Contact</span>
              </Link>
              <Link 
                to="mailto:contact@twcampaign.in"
                className='flex items-center gap-2 text-gray-400 hover:text-[#F97316] transition-colors duration-300 text-sm group'
              >
                <Mail className='w-3 h-3' />
                <span>Email Us</span>
              </Link>
            </div>
          </div>

          {/* Support Section */}
          <div className='space-y-4'>
            <h4 className='font-semibold text-white text-lg'>Support</h4>
            <div className='space-y-3'>
              <Link 
                to="mailto:contact@twcampaign.in"
                className='flex items-center gap-2 text-gray-400 hover:text-[#F97316] transition-colors duration-300 text-sm group'
              >
                <span>Help Center</span>
                <ExternalLink className='w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </Link>
              <Link 
                to="/status"
                className='flex items-center gap-2 text-gray-400 hover:text-[#F97316] transition-colors duration-300 text-sm group'
              >
                <span>Status</span>
                <ExternalLink className='w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </Link>
              <Link 
                to="/privacy"
                className='flex items-center gap-2 text-gray-400 hover:text-[#F97316] transition-colors duration-300 text-sm group'
              >
                <span>Privacy Policy</span>
                <ExternalLink className='w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </Link>
              <Link 
                to="/terms"
                className='flex items-center gap-2 text-gray-400 hover:text-[#F97316] transition-colors duration-300 text-sm group'
              >
                <span>Terms of Service</span>
                <ExternalLink className='w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-gray-800'>
        <div className='max-w-7xl mx-auto px-4 md:px-8 py-6'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-gray-400 text-sm text-center md:text-left'>
              © 2024 TaskWala. All rights reserved.
            </p>
            <div className='flex items-center gap-2 text-gray-400 text-sm'>
              <span>Built with</span>
              <Heart className='w-4 h-4 text-red-500 fill-current' />
              <span>for the future of engagement</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer