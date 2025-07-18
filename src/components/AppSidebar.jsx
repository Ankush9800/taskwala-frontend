import React, { useEffect, useState } from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from './ui/sidebar'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronRight, LogOut, Plus, VerifiedIcon } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import axios from 'axios'
import { Dashboard, Offers, Submission } from '@/pages'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'

function AppSidebar() {
const navigate = useNavigate()

const [profileData, setProfileData] = useState(null)

const profile = async()=>{
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/getadmin`,{
    withCredentials:true
  })
  setProfileData(res.data.data)
}

const handleLogout = async()=>{
  try {
    await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/adminlogout`,{
      withCredentials:true
    })
    navigate("/login")
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
  profile()
},[])

  return (
    <>
        <Sidebar className='h-screen'>
          <SidebarContent  className="flex flex-col h-full bg-gray-900 text-white focus:bg-white">
            <div className="flex-1">
            <SidebarHeader></SidebarHeader>
            <SidebarGroup>
              <SidebarGroupLabel className='text-gray-400'>Offers</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link className='font-bold' to={"/admin/dashboard"}>Dashboard</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <Collapsible className='group/collapsible'>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                    <SidebarMenuButton className='cursor-pointer'>
                      <span className='font-bold'>Campaigns</span>
                       <ChevronRight className="ml-auto transition-transform rotate-0 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link className='font-bold text-white' to={"/admin/offers"}>All Offers</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      {/* <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link className='font-bold text-white'>Active Offers</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link className='font-bold'>Inactive Offers</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem> */}
                    </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                  </Collapsible>
                  <Collapsible className='group/collapsible'>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                    <SidebarMenuButton className='cursor-pointer'>
                      <span className='font-bold'>Reports</span>
                       <ChevronRight className="ml-auto transition-transform rotate-0 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link className='font-bold text-white' to={"/admin/conversion"}>Conversion</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link className='font-bold text-white' to={"/admin/submission"}>Clicks</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link className='font-bold' to={"/admin/payments"}>Payments</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  </Collapsible>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel className='text-gray-400'>Devloper</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link className='font-bold'>Images</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            </div>
            <SidebarFooter className="px-4 border-t ">
              <div className="flex items-center justify-between">
                {/* Profile Avatar */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 rounded-md">
                    <AvatarImage src={profileData?.avatar} alt="User" className=' object-cover' />
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col'>
                    <span className="text-sm font-medium">{profileData?.fullName}</span>
                  <span className="text-[12px] font-mono">{profileData?.email}</span>
                  </div>
                </div>

                {/* + Button */}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="default" className="h-8 w-8 bg-gray-900 cursor-pointer ">
                        <Plus className='h-4 w-4'/>
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='bg-gray-800 border-1 border-gray-600 text-white' side='right'>
                    <DropdownMenuGroup>
                      <DropdownMenuItem className='cursor-pointer hover:!bg-gray-700 hover:!text-white'><VerifiedIcon/><Link to={"/admin/profile"}>Account</Link></DropdownMenuItem>
                      {/* <DropdownMenuSeparator/> */}
                      <DropdownMenuItem className='cursor-pointer hover:!bg-gray-700 hover:!text-white'>
                        <LogOut/> <Button className='bg-transparent h-3 p-0 hover:bg-transparent cursor-pointer' onClick={handleLogout}>Logout</Button>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    </>
  )
}

export default AppSidebar