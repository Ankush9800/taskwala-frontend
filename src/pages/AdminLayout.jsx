import AppSidebar from '@/components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <SidebarProvider>
        <div className='flex w-full min-h-screen bg-white dark:bg-gray-900'>
            <AppSidebar/>
            <main className="flex-1 p-6 w-full bg-white dark:bg-gray-900">
                <SidebarTrigger className='text-black dark:text-white'/>
                <Outlet/>
            </main>
        </div>
    </SidebarProvider>
  )
}

export default AdminLayout