import AppSidebar from '@/components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <SidebarProvider>
        <div className='flex w-full'>
            <AppSidebar/>
            <main className="flex-1 p-6 w-full">
                <SidebarTrigger/>
                <Outlet/>
            </main>
        </div>
    </SidebarProvider>
  )
}

export default AdminLayout