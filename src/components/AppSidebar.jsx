import React from 'react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'

function AppSidebar() {
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

  return (
    <>
        <Sidebar>
            <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            Help
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent />
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
        </Sidebar>
    </>
  )
}

export default AppSidebar