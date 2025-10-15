import React, { useEffect, useState } from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarMenuSub, 
  SidebarMenuSubButton, 
  SidebarMenuSubItem 
} from './ui/sidebar';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronRight, 
  LogOut, 
  Plus, 
  VerifiedIcon,
  BarChart3,
  Target,
  FileText,
  CreditCard,
  MessageSquare,
  Settings,
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  Shield,
  Sparkles,
  Building2,
  HelpCircle,
  Download,
  Moon,
  Sun
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { account } from '@/lib/Appwrite';
import axios from 'axios';

function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [profileData, setProfileData] = useState(null);
  const [campaignsOpen, setCampaignsOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [campCount, SetCampCount] = useState(0)
  const [isDark, setIsDark] = useState(() => {const saved = localStorage.getItem("theme"); return saved === "dark";});

  const profile = async () => {
    try {
      const res = await account.get();
      setProfileData(res);
    } catch (error) {
      console.log('Error fetching profile:', error);
    }
  };

  const totalCamp = async()=>{
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/getallcampaign`)
    SetCampCount(res.data.length)
  }

  const unreadMsg = async()=>{
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/contact/getmsg`)
    console.log(res.data)
    let urlength = 0
    for (let i = 0; i < res.data.length; i++) {
      if (!res.data[i].status) {
        urlength++
      }
    }
    console.log(urlength)
    setUnreadCount(urlength)
  }

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isParentActive = (paths) => {
    return paths.some(path => location.pathname.includes(path));
  };

  useEffect(() => {
    profile();
    unreadMsg()
    totalCamp()
  }, []);

  useEffect(() => {
    if (location.pathname.includes('/admin/offers') || location.pathname.includes('/admin/campaigns')) {
      setCampaignsOpen(true);
    }
    if (location.pathname.includes('/admin/conversion') || location.pathname.includes('/admin/submission')) {
      setReportsOpen(true);
    }
  }, [location.pathname]);

  useEffect(()=>{
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark",isDark)
  },[isDark])

  return (
    <Sidebar className="h-screen border-r border-gray-200 dark:border-gray-800 select-none">
      <SidebarContent className="flex flex-col h-full bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black text-gray-900 dark:text-white">
        <div className="flex-1">
          {/* Logo Section */}
          <SidebarHeader className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-[#F97316] to-[#713306] p-2.5 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-[#F97316] to-[#713306] bg-clip-text text-transparent">
                  TaskWala
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Admin Portal</p>
              </div>
            </div>
          </SidebarHeader>

          {/* Navigation */}
          <div className="px-4 py-6 space-y-6">
            {/* Dashboard */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
                Overview
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild 
                      className={`group transition-all duration-200 ${
                        isActive('/admin/dashboard') 
                          ? 'bg-gradient-to-r from-[#F97316] to-[#713306] text-white shadow-lg' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <Link to="/admin/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                        <BarChart3 className="w-5 h-5" />
                        <span className="font-medium">Dashboard</span>
                        {isActive('/admin/dashboard') && (
                          <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Campaigns Section */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
                Campaign Management
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <Collapsible 
                    open={campaignsOpen} 
                    onOpenChange={setCampaignsOpen}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton 
                          className={`group transition-all duration-200 ${
                            isParentActive(['/admin/offers', '/admin/campaigns'])
                              ? 'bg-gray-100 dark:bg-gray-800/50 text-gray-900 dark:text-white' 
                              : 'hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full">
                            <Target className="w-5 h-5" />
                            <span className="font-medium">Campaigns</span>
                            <ChevronRight className="ml-auto w-4 h-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          </div>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2">
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton 
                              asChild
                              className={`transition-all duration-200 ${
                                isActive('/admin/offers')
                                  ? 'bg-[#F97316]/20 text-[#F97316] border-l-2 border-[#F97316]'
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-800/30 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                              }`}
                            >
                              <Link to="/admin/offers" className="flex items-center gap-3 px-3 py-2 ml-6 rounded-lg">
                                <div className="w-2 h-2 bg-current rounded-full"></div>
                                <span className="font-medium">All Offers</span>
                                <Badge variant="secondary" className="ml-auto bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs">
                                  {campCount}
                                </Badge>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Reports Section */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
                Analytics & Reports
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <Collapsible 
                    open={reportsOpen} 
                    onOpenChange={setReportsOpen}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton 
                          className={`group transition-all duration-200 ${
                            isParentActive(['/admin/conversion', '/admin/submission', '/admin/submission-export'])
                              ? 'bg-gray-100 dark:bg-gray-800/50 text-gray-900 dark:text-white' 
                              : 'hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full">
                            <FileText className="w-5 h-5" />
                            <span className="font-medium">Reports</span>
                            <ChevronRight className="ml-auto w-4 h-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          </div>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2">
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton 
                              asChild
                              className={`transition-all duration-200 ${
                                isActive('/admin/conversion')
                                  ? 'bg-[#155a69]/20 text-[#155a69] border-l-2 border-[#155a69]'
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-800/30 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                              }`}
                            >
                              <Link to="/admin/conversion" className="flex items-center gap-3 px-3 py-2 ml-6 rounded-lg">
                                <TrendingUp className="w-4 h-4" />
                                <span className="font-medium">Conversions</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton 
                              asChild
                              className={`transition-all duration-200 ${
                                isActive('/admin/submission')
                                  ? 'bg-[#155a69]/20 text-[#155a69] border-l-2 border-[#155a69]'
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-800/30 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                              }`}
                            >
                              <Link to="/admin/submission" className="flex items-center gap-3 px-3 py-2 ml-6 rounded-lg">
                                <Activity className="w-4 h-4" />
                                <span className="font-medium">Clicks & Submissions</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton 
                              asChild
                              className={`transition-all duration-200 ${
                                isActive('/admin/submission-export')
                                  ? 'bg-[#F97316]/20 text-[#F97316] border-l-2 border-[#F97316]'
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-800/30 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                              }`}
                            >
                              <Link to="/admin/submission-export" className="flex items-center gap-3 px-3 py-2 ml-6 rounded-lg">
                                <Download className="w-4 h-4" />
                                <span className="font-medium">Export Submissions</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>

                  {/* Payments */}
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild 
                      className={`group transition-all duration-200 ${
                        isActive('/admin/payments') 
                          ? 'bg-gradient-to-r from-[#10B981] to-[#155a69] text-white shadow-lg' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <Link to="/admin/payments" className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                        <CreditCard className="w-5 h-5" />
                        <span className="font-medium">Payments</span>
                        <Badge variant="secondary" className="ml-auto bg-[#F97316] text-white text-xs">
                          3
                        </Badge>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* System Section */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
                System
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild 
                      className="group transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      <Link to="/admin/users" className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                        <Users className="w-5 h-5" />
                        <span className="font-medium">User Management</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild 
                      className="group transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      <Link to="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                        <Settings className="w-5 h-5" />
                        <Link to={'/admin/profile'} className="font-medium">Settings</Link>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Support Section */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
                Support
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild 
                      className={`group transition-all duration-200 ${
                        isActive('/admin/support') 
                          ? 'bg-gradient-to-r from-[#F97316] to-[#713306] text-white shadow-lg' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <Link to="/admin/support" className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                        <MessageSquare className="w-5 h-5" />
                        <span className="font-medium">Support Messages</span>
                        {unreadCount > 0  && <Badge variant="secondary" className="ml-auto bg-yellow-500 text-black text-xs">
                          {unreadCount}
                        </Badge>}
                        {unreadCount == 0 && isActive('/admin/support') && (
                          <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild 
                      className="group transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      <Link to="/contact" className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                        <HelpCircle className="w-5 h-5" />
                        <span className="font-medium">Contact Support</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild 
                      className="group transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      <Link to="/admin/help" className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                        <HelpCircle className="w-5 h-5" />
                        <span className="font-medium">Help & Documentation</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </div>
        </div>

        {/* Footer */}
        <SidebarFooter className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          <div className="flex items-center justify-between">
            {/* Profile Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Avatar className="h-10 w-10 rounded-lg border-2 border-gray-300 dark:border-gray-700">
                <AvatarImage src={profileData?.prefs?.avatar} alt="User" className="object-cover" />
                <AvatarFallback className="bg-gradient-to-r from-[#F97316] to-[#713306] text-white font-semibold">
                  {profileData?.name?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {profileData?.name || 'Admin User'}
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  {profileData?.email || 'admin@taskwala.com'}
                </span>
              </div>
            </div>

            {/* Actions Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white w-48" 
                side="right"
                align="end"
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700">
                    <Shield className="w-4 h-4 mr-2" />
                    <Link to="/admin/profile" className="flex-1">Account Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer hover:bg-red-600 focus:bg-red-600 text-red-400 hover:text-white focus:text-white"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center justify-between gap-3 mt-3 p-2.5 bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
              <span className="text-xs text-black dark:text-white font-medium">System Online</span>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center gap-1 p-0.5 bg-gray-200 dark:bg-gray-900/50 rounded-md">
              <Button
                size="icon"
                className={`${!isDark?"bg-gray-800":"bg-gray-800"} h-6 w-6 hover:bg-gray-700 text-yellow-400 hover:text-yellow-300 transition-colors`}
                onClick={() => {
                  setIsDark(false)
                }}
                title="Light Mode"
              >
                <Sun className="h-3.5 w-3.5" />
              </Button>
              <Button
                size="icon"
                onFocus={true}
                className={`${isDark?"bg-gray-100":"bg-gray-100"} h-6 w-6 hover:bg-gray-700 text-blue-400 hover:text-blue-300 transition-colors`}
                onClick={() => {
                  setIsDark(true)
                }}
                title="Dark Mode"
              >
                <Moon className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;