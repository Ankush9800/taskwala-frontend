import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { account, storage } from '@/lib/Appwrite'
import { ID } from 'appwrite'
import { 
  Camera, 
  Edit2, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  Shield, 
  Settings, 
  User, 
  Key,
  Save,
  X
} from 'lucide-react'
import React, { useEffect, useState } from 'react'

function Profile() {
    const [profile, setProfile] = useState({})
    const [file, setFile] = useState(null)
    const [avatarDialog, setAvatarDialog] = useState(false)
    const [phoneDialog, setPhoneDialog] = useState(false)
    const [passwordDialog, setPasswordDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState("overview")
    
    // Form states
    const [phone, setPhone] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    
    const profileData = async () => {
        try {
            setLoading(true)
            const res = await account.get()
            setProfile(res)
            console.log(res)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const updateAvatar = async () => {
        if (!file) return
        
        try {
            setLoading(true)
            const response = await storage.createFile(
                import.meta.env.VITE_APPWRITE_STORAGE,
                ID.unique(),
                file
            )
            
            const prevUrl = await storage.getFileView(
                import.meta.env.VITE_APPWRITE_STORAGE,
                response.$id
            )
            
            await account.updatePrefs({
                avatar: prevUrl
            })
            
            setAvatarDialog(false)
            setFile(null)
            await profileData() // Refresh profile data
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const updatePhone = async () => {
        if (!phone || !currentPassword) return
        
        try {
            setLoading(true)
            await account.updatePhone(
                `+91${phone}`,
                currentPassword
            )
            setPhoneDialog(false)
            setPhone("")
            setCurrentPassword("")
            await profileData() // Refresh profile data
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    
    const updatePassword = async () => {
        if (!currentPassword || !newPassword || newPassword !== confirmPassword) return
        
        try {
            setLoading(true)
            await account.updatePassword(newPassword, currentPassword)
            setPasswordDialog(false)
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        profileData()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white">Admin Profile</h1>
                <p className="text-gray-400 mt-2">Manage your account settings and preferences</p>
            </div>

            <div className="max-w-6xl mx-auto">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                        <TabsTrigger value="overview" className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="flex items-center gap-2">
                            <Settings className="w-4 h-4" />
                            Settings
                        </TabsTrigger>
                        <TabsTrigger value="security" className="flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Security
                        </TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Profile Card */}
                            <Card className="lg:col-span-2 border-0 shadow-lg bg-gray-800/80 backdrop-blur-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center gap-2 text-[#F97316]">
                                        <User className="w-5 h-5" />
                                        Profile Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Avatar Section */}
                                    <div className="flex items-center gap-6">
                                        <div className="relative">
                                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#F97316] shadow-lg">
                                                <img 
                                                    src={profile.prefs?.avatar || '/api/placeholder/150/150'} 
                                                    alt="Profile" 
                                                    className="object-cover w-full h-full" 
                                                />
                                            </div>
                                            <button
                                                onClick={() => setAvatarDialog(true)}
                                                className="absolute -bottom-2 -right-2 p-2 bg-[#F97316] text-white rounded-full hover:bg-[#EA580C] transition-colors shadow-lg"
                                            >
                                                <Camera className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
                                            <p className="text-lg text-gray-300 mb-2">{profile.email}</p>
                                            <Badge variant="secondary" className="bg-[#F97316]/10 text-[#F97316] border-[#F97316]/20">
                                                Admin User
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Profile Details */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                                                <Mail className="w-5 h-5 text-[#155a69]" />
                                                <div>
                                                    <p className="text-sm text-gray-400">Email</p>
                                                    <p className="font-medium text-white">{profile.email}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                                                <Phone className="w-5 h-5 text-[#10B981]" />
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-400">Phone Number</p>
                                                    <p className="font-medium text-white">
                                                        {profile.phone ? profile.phone.replace(/^\+91/, "") : "Not added"}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => setPhoneDialog(true)}
                                                    className="p-1 text-[#10B981] hover:bg-[#10B981]/10 rounded transition-colors"
                                                    title="Edit Phone Number"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                                                <Calendar className="w-5 h-5 text-[#F97316]" />
                                                <div>
                                                    <p className="text-sm text-gray-400">Created At</p>
                                                    <p className="font-medium text-white">
                                                        {profile.$createdAt ? new Date(profile.$createdAt).toLocaleDateString() : 'N/A'}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                                                <Clock className="w-5 h-5 text-[#A855F7]" />
                                                <div>
                                                    <p className="text-sm text-gray-400">Last Updated</p>
                                                    <p className="font-medium text-white">
                                                        {profile.$updatedAt ? new Date(profile.$updatedAt).toLocaleDateString() : 'N/A'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Stats */}
                            <div className="space-y-4">
                                <Card className="border-0 shadow-lg bg-gradient-to-br from-[#F97316] to-[#EA580C] text-white">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-orange-100">Account Status</p>
                                                <p className="text-2xl font-bold">Active</p>
                                            </div>
                                            <Shield className="w-8 h-8 text-orange-200" />
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-lg bg-gradient-to-br from-[#155a69] to-[#0f4c5c] text-white">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-teal-100">Role</p>
                                                <p className="text-2xl font-bold">Administrator</p>
                                            </div>
                                            <User className="w-8 h-8 text-teal-200" />
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-lg bg-gradient-to-br from-[#10B981] to-[#059669] text-white">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-green-100">Sessions</p>
                                                <p className="text-2xl font-bold">12</p>
                                            </div>
                                            <Settings className="w-8 h-8 text-green-200" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>
                    {/* Settings Tab */}
                    <TabsContent value="settings" className="space-y-6">
                        <Card className="border-0 shadow-lg bg-gray-800/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-[#F97316]">
                                    <Settings className="w-5 h-5" />
                                    Account Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <Label className="text-sm font-medium text-gray-300">Full Name</Label>
                                            <Input 
                                                value={profile.name || ""} 
                                                readOnly 
                                                className="mt-1 bg-gray-700/50 border-gray-600 text-white"
                                            />
                                        </div>
                                        
                                        <div>
                                            <Label className="text-sm font-medium text-gray-300">Email Address</Label>
                                            <Input 
                                                value={profile.email || ""} 
                                                readOnly 
                                                className="mt-1 bg-gray-700/50 border-gray-600 text-white"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <Label className="text-sm font-medium text-gray-300">User ID</Label>
                                            <Input 
                                                value={profile.$id || ""} 
                                                readOnly 
                                                className="mt-1 bg-gray-700/50 border-gray-600 text-white text-xs"
                                            />
                                        </div>
                                        
                                        <div>
                                            <Label className="text-sm font-medium text-gray-300">Account Type</Label>
                                            <Input 
                                                value="Administrator" 
                                                readOnly 
                                                className="mt-1 bg-gray-700/50 border-gray-600 text-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Security Tab */}
                    <TabsContent value="security" className="space-y-6">
                        <Card className="border-0 shadow-lg bg-gray-800/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-[#F97316]">
                                    <Shield className="w-5 h-5" />
                                    Security Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card className="border border-gray-600 bg-gray-700/50">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <Key className="w-5 h-5 text-[#F97316]" />
                                                    <div>
                                                        <h3 className="font-medium text-white">Password</h3>
                                                        <p className="text-sm text-gray-400">Update your password</p>
                                                    </div>
                                                </div>
                                                <Button 
                                                    onClick={() => setPasswordDialog(true)}
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-[#F97316] bg-transparent text-[#F97316] hover:bg-[#F97316] hover:text-white"
                                                >
                                                    Change
                                                </Button>
                                            </div>
                                            <p className="text-xs text-gray-500">Last changed: 30 days ago</p>
                                        </CardContent>
                                    </Card>

                                    <Card className="border border-gray-600 bg-gray-700/50">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <Phone className="w-5 h-5 text-[#10B981]" />
                                                    <div>
                                                        <h3 className="font-medium text-white">Phone Number</h3>
                                                        <p className="text-sm text-gray-400">Secure your account</p>
                                                    </div>
                                                </div>
                                                <Button 
                                                    onClick={() => setPhoneDialog(true)}
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-[#10B981] bg-transparent text-[#10B981] hover:bg-[#10B981] hover:text-white"
                                                >
                                                    {profile.phone ? 'Update' : 'Add'}
                                                </Button>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                {profile.phone ? `Current: ${profile.phone.replace(/^\+91/, "")}` : 'Not configured'}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Avatar Update Dialog */}
            <Dialog open={avatarDialog} onOpenChange={setAvatarDialog}>
                <DialogContent className="bg-gray-800 border-gray-600 shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-[#F97316]">
                            <Camera className="w-5 h-5" />
                            Update Profile Picture
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label className="text-sm font-medium text-gray-300">Choose Image</Label>
                            <Input 
                                type="file" 
                                accept=".jpg,.jpeg,.png" 
                                onChange={(e) => setFile(e.target.files?.[0])}
                                className="mt-1 bg-gray-700 border-gray-600 text-white"
                            />
                        </div>
                        {file && (
                            <div className="text-sm text-gray-400">
                                Selected: {file.name}
                            </div>
                        )}
                    </div>
                    <DialogFooter className="gap-2">
                        <Button 
                            variant="outline" 
                            onClick={() => {
                                setAvatarDialog(false)
                                setFile(null)
                            }}
                            disabled={loading}
                            className="border-[#F97316] bg-transparent hover:bg-[#F97316]/10 text-[#F97316] hover:text-[#F97316]"
                        >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                        </Button>
                        <Button 
                            onClick={updateAvatar}
                            disabled={!file || loading}
                            className="bg-[#F97316] hover:bg-[#EA580C]"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {loading ? 'Uploading...' : 'Upload'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Phone Update Dialog */}
            <Dialog open={phoneDialog} onOpenChange={setPhoneDialog}>
                <DialogContent className="bg-gray-800 border-gray-600 shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-[#10B981]">
                            <Phone className="w-5 h-5" />
                            Update Phone Number
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label className="text-sm font-medium text-gray-300">Phone Number</Label>
                            <div className="flex mt-1">
                                <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-600 bg-gray-700 text-gray-300 text-sm rounded-l-md">
                                    +91
                                </span>
                                <Input 
                                    type="tel"
                                    placeholder="Enter phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="rounded-l-none bg-gray-700 border-gray-600 text-white"
                                />
                            </div>
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-gray-300">Current Password</Label>
                            <Input 
                                type="password"
                                placeholder="Enter your current password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="mt-1 bg-gray-700 border-gray-600 text-white"
                            />
                        </div>
                    </div>
                    <DialogFooter className="gap-2">
                        <Button 
                            variant="outline" 
                            onClick={() => {
                                setPhoneDialog(false)
                                setPhone("")
                                setCurrentPassword("")
                            }}
                            disabled={loading}
                            className="border-[#F97316] bg-transparent hover:bg-[#F97316]/10 text-[#F97316] hover:text-[#F97316]"
                        >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                        </Button>
                        <Button 
                            onClick={updatePhone}
                            disabled={!phone || !currentPassword || loading}
                            className="bg-[#10B981] hover:bg-[#059669]"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {loading ? 'Updating...' : 'Update'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Password Update Dialog */}
            <Dialog open={passwordDialog} onOpenChange={setPasswordDialog}>
                <DialogContent className="bg-gray-800 border-gray-600 shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-[#F97316]">
                            <Key className="w-5 h-5" />
                            Change Password
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label className="text-sm font-medium text-gray-300">Current Password</Label>
                            <Input 
                                type="password"
                                placeholder="Enter current password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="mt-1 bg-gray-700 border-gray-600 text-white"
                            />
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-gray-300">New Password</Label>
                            <Input 
                                type="password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="mt-1 bg-gray-700 border-gray-600 text-white"
                            />
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-gray-300">Confirm New Password</Label>
                            <Input 
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 bg-gray-700 border-gray-600 text-white"
                            />
                        </div>
                        {newPassword && confirmPassword && newPassword !== confirmPassword && (
                            <p className="text-sm text-red-400">Passwords do not match</p>
                        )}
                    </div>
                    <DialogFooter className="gap-2">
                        <Button 
                            variant="outline" 
                            onClick={() => {
                                setPasswordDialog(false)
                                setCurrentPassword("")
                                setNewPassword("")
                                setConfirmPassword("")
                            }}
                            disabled={loading}
                            className="border-[#F97316] bg-transparent hover:bg-[#F97316]/10 text-[#F97316] hover:text-[#F97316]"
                        >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                        </Button>
                        <Button 
                            onClick={updatePassword}
                            disabled={!currentPassword || !newPassword || newPassword !== confirmPassword || loading}
                            className="bg-[#F97316] hover:bg-[#EA580C]"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {loading ? 'Updating...' : 'Change Password'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Profile