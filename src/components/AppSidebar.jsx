import React, { useEffect, useState } from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from './ui/sidebar'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronRight, Plus } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import axios from 'axios'

function AppSidebar() {
const [profileData, setProfileData] = useState(null)

const pages = [
    {
        title : "Dashboard",
        path : '/admin/dashboard'
    },
    {
        title : "Offers",
        path : '/admin/offers'
    },
    {
        title : "Submission",
        path : '/admin/submission'
    },
]

const profile = async()=>{
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/getadmin`,{
    withCredentials:true
  })
  // console.log(res.data.data)
  setProfileData(res.data.data)
}

useEffect(()=>{
  profile()
},[])

  return (
    <>
        <Sidebar className='h-screen'>
          <SidebarContent  className="flex flex-col h-full">
            <div className="flex-1">
            <SidebarHeader></SidebarHeader>
            <SidebarGroup>
              <SidebarGroupLabel>Offers</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link className='font-bold'>Dashboard</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <Collapsible className='group/collapsible'>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                    <SidebarMenuButton >
                      <span className='font-bold'>Campaigns</span>
                       <ChevronRight className="ml-auto transition-transform rotate-0 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link className='font-bold'>All Offers</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link className='font-bold'>Active Offers</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link className='font-bold'>Inactive Offers</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                  </Collapsible>
                  <Collapsible className='group/collapsible'>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                    <SidebarMenuButton asChild>
                      <Link className='font-bold'>Reports
                       <ChevronRight className="ml-auto transition-transform rotate-0 group-data-[state=open]/collapsible:rotate-90" /></Link>
                    </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link className='font-bold'>Conversion</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link className='font-bold'>Clicks</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link className='font-bold'>Payments</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  </Collapsible>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Devloper</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link className='font-bold'>Account</Link>
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
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    </>
  )
}

export default AppSidebar