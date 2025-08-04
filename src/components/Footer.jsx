import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='flex flex-col gap-10 py-10'>
      <div className='flex flex-col md:flex-row gap-5 justify-center md:text-left text-center border-b-1 border-[#64686f] pb-10'>
        <div className='flex flex-col items-center md:w-1/4'>
          <h2 className='font-bold text-2xl bg-gradient-to-r from-[#00CFFF] to-[#A855F7] bg-clip-text text-transparent'>Taskwala</h2>
          <p className='text-[#9CA3AF] mx-10 text-center'>The future of campaign-based rewards. Engage, reward and grow your community like never before.</p>
        </div>
        <div className='flex flex-col md:w-1/4'>
          <h4 className='font-bold text-[#F5F5F5] text-lg'>Product</h4>
          <Link className='text-[#9CA3AF] text-md'>Features</Link>
          <Link className='text-[#9CA3AF] text-md'>Pricing</Link>
          {/* <Link className='text-[#9CA3AF] text-md'>Api</Link> */}
          {/* <Link className='text-[#9CA3AF] text-md'>Intrigation</Link> */}
        </div>
        <div className='flex flex-col md:w-1/4'>
          <h4 className='font-bold text-[#F5F5F5] text-lg'>Company</h4>
          <Link to={'https://www.facebook.com/profile.php?id=61574122799682'} className='text-[#9CA3AF] text-md'>About</Link>
          {/* <Link className='text-[#9CA3AF] text-md'>Blog</Link> */}
          {/* <Link className='text-[#9CA3AF] text-md'>Careers</Link> */}
          <Link to={'mailto:connect@twcampaign.in'} className='text-[#9CA3AF] text-md'>Contact</Link>
        </div>
        <div className='flex flex-col md:w-1/4'>
          <h4 className='font-bold text-[#F5F5F5] text-lg'>Support</h4>
          <Link to={'mailto:connect@twcampaign.in'} className='text-[#9CA3AF] text-md'>Help Center</Link>
          {/* <Link className='text-[#9CA3AF] text-md'>Documentation</Link> */}
          <Link className='text-[#9CA3AF] text-md'>Status</Link>
          <Link className='text-[#9CA3AF] text-md'>Privacy</Link>
        </div>
      </div>
      <div className='flex justify-center items-center text-center mx-10 h-2'>
        <p className='text-[#9CA3AF] text-md'>© 2024 Taskwala. All rights reserved. Built with passion for the future of engagement. </p>
      </div>
    </footer>
  )
}

export default Footer