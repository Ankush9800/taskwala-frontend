import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toaster } from '@/components/ui/sonner';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import axios from 'axios';
import { 
  Edit, 
  Share2, 
  Trash2, 
  Plus, 
  Search, 
  Filter, 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign,
  RefreshCw,
  Copy,
  Eye,
  MoreHorizontal,
  Grid3X3,
  List
} from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

function Offers() {
    const origin = window.location.origin
    const [dialogState, setDialogState] = useState(false);
    const [edit, setEdit] = useState(false);
    const [table, setTable] = useState([]);
    const [filteredTable, setFilteredTable] = useState([]);
    const [campId, setCampId] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [providerFilter, setProviderFilter] = useState("all");
    const [viewMode, setViewMode] = useState("table"); // table or grid
    const [activeTab, setActiveTab] = useState("all");

    const [formData, setFormData] = useState({
        title: "",
        campId: "",
        payoutRate: "",
        price: "",
        trackingUrl: "",
        description: "",
        campaignImage: null,
        provider: "",
        steps: [""],
        trackable: false,
    });

    // Calculate statistics
    const totalCampaigns = table.length;
    const activeCampaigns = table.filter(camp => camp.campaignStatus).length;
    const inactiveCampaigns = totalCampaigns - activeCampaigns;
    const totalPayout = table.reduce((sum, camp) => sum + (camp.payoutRate || 0), 0);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    const handleProviderChange = (newProviderValue) => {
        setFormData(prev => ({
            ...prev,
            provider: newProviderValue,
        }));
    };

    // Handle steps manipulation
    const addStep = () => {
        setFormData(prev => ({
            ...prev,
            steps: [...prev.steps, ""]
        }));
    };

    const removeStep = (index) => {
        setFormData(prev => ({
            ...prev,
            steps: prev.steps.filter((_, i) => i !== index)
        }));
    };

    const updateStep = (index, value) => {
        setFormData(prev => ({
            ...prev,
            steps: prev.steps.map((step, i) => 
                i === index ? value : step
            )
        }));
    };

    // Filter function
    const filterCampaigns = () => {
        let filtered = table;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(camp =>
                camp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                camp.campId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                camp.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Status filter
        if (statusFilter !== "all") {
            filtered = filtered.filter(camp =>
                statusFilter === "active" ? camp.campaignStatus : !camp.campaignStatus
            );
        }

        // Provider filter
        if (providerFilter !== "all") {
            filtered = filtered.filter(camp => camp.provider === providerFilter);
        }

        // Tab filter
        if (activeTab !== "all") {
            filtered = filtered.filter(camp =>
                activeTab === "active" ? camp.campaignStatus : !camp.campaignStatus
            );
        }

        setFilteredTable(filtered);
    };

    useEffect(() => {
        filterCampaigns();
    }, [table, searchTerm, statusFilter, providerFilter, activeTab]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const data = new FormData();
        data.append("title", formData.title);
        data.append("campId", formData.campId);
        data.append("payoutRate", formData.payoutRate);
        data.append("price", formData.price);
        data.append("trackingUrl", formData.trackingUrl);
        data.append("description", formData.description);
        data.append("campaignImage", formData.campaignImage);
        data.append("provider", formData.provider);
        data.append("trackable", formData.trackable);
        
        // Debug: Log the trackable value
        console.log("Trackable value being sent:", formData.trackable, typeof formData.trackable);
        
        // Append steps as individual array items
        formData.steps.forEach((step, index) => {
            data.append(`steps[${index}]`, step);
        });

        if (!edit) {
            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/campaign/newcampaign`,
                    data
                );
                getAllCampaign();
                console.log("Successfully created", res, formData);
                setDialogState(false);
                resetForm();
                toast.success("Campaign created successfully!", {
                    duration: 3000,
                });
            } catch (error) {
                console.log("error", error);
                toast.error("Failed to create campaign", {
                    duration: 3000,
                });
            }
        } else {
            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/campaign/updatecamp/${campId}`,
                    data
                );
                getAllCampaign();
                setDialogState(false);
                resetForm();
                setEdit(false);
                console.log(res.data);
                toast.success("Campaign updated successfully!", {
                    duration: 3000,
                });
            } catch (error) {
                console.log("error while updating campaign", error);
                toast.error("Failed to update campaign", {
                    duration: 3000,
                });
            }
        }
        setLoading(false);
    };

    const resetForm = () => {
        setFormData({
            title: "",
            campId: "",
            payoutRate: "",
            price: "",
            trackingUrl: "",
            description: "",
            campaignImage: null,
            provider: "",
            steps: [""],
            trackable: false,
        });
    };

    const getAllCampaign = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/getallcampaign`);
            console.log(res.data);
            setTable(res.data);
        } catch (error) {
            console.log("Error fetching campaigns:", error);
            toast.error("Failed to fetch campaigns");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllCampaign();
    }, []);

    const deleteCampaign = async (id) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/campaign/deletecampaign/${id}`
            );
            getAllCampaign();
            toast.success("Campaign deleted successfully!");
        } catch (error) {
            console.log("Campaign delete error", error);
            toast.error("Failed to delete campaign");
        }
    };

    const changeCampaignState = async (id, status) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/campaign/updatecampstatus/${id}`,
                {
                    campaignStatus: status,
                }
            );
            console.log(res);
            getAllCampaign();
            toast.success(`Campaign ${status ? 'activated' : 'deactivated'} successfully!`);
        } catch (error) {
            console.log("error while update campaign status", error);
            toast.error("Failed to update campaign status");
        }
    };

    const copyUrl = async (value) => {
        try {
            await navigator.clipboard.writeText(value);
            toast.success("URL copied to clipboard!");
        } catch (error) {
            // Fallback for share if clipboard fails
            if (navigator.share) {
                navigator.share({
                    title: 'Campaign URL',
                    url: value
                });
            } else {
                toast.error("Failed to copy URL");
            }
        }
    };

    const handleEdit = (camp) => {
        setEdit(true);
        
        // Handle steps - they might be stored as JSON string or array
        let stepsData = [""];
        if (camp.steps) {
            if (Array.isArray(camp.steps) && camp.steps.length > 0) {
                stepsData = camp.steps;
            } else if (typeof camp.steps === 'string') {
                try {
                    const parsedSteps = JSON.parse(camp.steps);
                    if (Array.isArray(parsedSteps) && parsedSteps.length > 0) {
                        stepsData = parsedSteps;
                    }
                } catch (error) {
                    console.log("Error parsing steps:", error);
                }
            }
        }
        
        setFormData({
            title: camp.title || "",
            campId: camp.campId || "",
            price: camp.price || "",
            payoutRate: camp.payoutRate || "",
            trackingUrl: camp.trackingUrl || "",
            description: camp.description || "",
            campaignImage: null,
            provider: camp.provider || "",
            steps: camp.process,
            trackable: camp.trackable || false,
        });
        setCampId(camp.id);
        setDialogState(true);
    };

    return (
        <div className="min-h-screen">
            <Toaster />
            
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Campaign Management</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your campaigns and track performance</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-[#F97316] to-[#EA580C] text-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-100">Total Campaigns</p>
                                <p className="text-2xl font-bold">{totalCampaigns}</p>
                            </div>
                            <Target className="w-8 h-8 text-orange-200" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-[#10B981] to-[#059669] text-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100">Active Campaigns</p>
                                <p className="text-2xl font-bold">{activeCampaigns}</p>
                            </div>
                            <TrendingUp className="w-8 h-8 text-green-200" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-[#155a69] to-[#0f4c5c] text-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-teal-100">Inactive Campaigns</p>
                                <p className="text-2xl font-bold">{inactiveCampaigns}</p>
                            </div>
                            <Users className="w-8 h-8 text-teal-200" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-[#A855F7] to-[#9333EA] text-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100">Total Payout</p>
                                <p className="text-2xl font-bold">₹{totalPayout}</p>
                            </div>
                            <DollarSign className="w-8 h-8 text-purple-200" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <CardTitle className="flex items-center gap-2 text-[#F97316]">
                            <Target className="w-5 h-5" />
                            Campaign Offers
                        </CardTitle>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3">
                            <Button
                                onClick={getAllCampaign}
                                variant="outline"
                                size="sm"
                                disabled={loading}
                                className="border-[#F97316] bg-transparent hover:bg-[#F97316]/10 text-[#F97316] hover:text-[#F97316]"
                            >
                                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                                Refresh
                            </Button>
                            
                            <div className="flex items-center gap-2 border border-gray-600 rounded-md p-1">
                                <Button
                                    variant={viewMode === "table" ? "secondary" : "ghost"}
                                    size="sm"
                                    onClick={() => setViewMode("table")}
                                    className="h-8 px-3"
                                >
                                    <List className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                                    size="sm"
                                    onClick={() => setViewMode("grid")}
                                    className="h-8 px-3"
                                >
                                    <Grid3X3 className="w-4 h-4" />
                                </Button>
                            </div>

                            <Dialog open={dialogState} onOpenChange={setDialogState}>
                                <DialogTrigger asChild>
                                    <Button className="bg-[#F97316] hover:bg-[#EA580C]">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create Campaign
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle className="text-[#F97316]">
                                            {edit ? "Update Campaign" : "Create Campaign"}
                                        </DialogTitle>
                                        <DialogDescription className="text-gray-600 dark:text-gray-400">
                                            {edit ? "Update campaign details" : "Add a new campaign to your offers"}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="overflow-y-auto max-h-[calc(90vh-8rem)] px-1">
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-gray-700 dark:text-gray-300">Campaign Name</Label>
                                                <Input
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                                                    placeholder="Enter campaign name"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-gray-700 dark:text-gray-300">Campaign ID</Label>
                                                <Input
                                                    name="campId"
                                                    value={formData.campId}
                                                    onChange={handleChange}
                                                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                                                    placeholder="Enter campaign ID"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-gray-900 dark:text-gray-300">Price (₹)</Label>
                                                <Input
                                                    name="price"
                                                    value={formData.price}
                                                    onChange={handleChange}
                                                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                                                    placeholder="0.00"
                                                    type="number"
                                                    step="0.01"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-gray-900 dark:text-gray-300">Payout Rate (₹)</Label>
                                                <Input
                                                    name="payoutRate"
                                                    value={formData.payoutRate}
                                                    onChange={handleChange}
                                                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                                                    placeholder="0.00"
                                                    type="number"
                                                    step="0.01"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-gray-900 dark:text-gray-300">Tracking URL</Label>
                                            <Input
                                                name="trackingUrl"
                                                value={formData.trackingUrl}
                                                onChange={handleChange}
                                                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                                                placeholder="https://example.com/track"
                                                type="url"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-gray-900 dark:text-gray-300">Campaign Image</Label>
                                                <Input
                                                    name="campaignImage"
                                                    onChange={handleChange}
                                                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white file:bg-gray-200 dark:file:bg-gray-600 file:text-gray-900 dark:file:text-white file:border-0 file:rounded"
                                                    type="file"
                                                    accept="image/*"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-gray-900 dark:text-gray-300">Provider</Label>
                                                <Select onValueChange={handleProviderChange} value={formData.provider}>
                                                    <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                                                        <SelectValue placeholder="Select provider" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                                                        <SelectGroup>
                                                            <SelectLabel className="text-gray-600 dark:text-gray-400">Providers</SelectLabel>
                                                            <SelectItem value="hiqmobi" className="text-gray-900 dark:text-white focus:bg-gray-100 dark:focus:bg-gray-600">Hiqmobi</SelectItem>
                                                            <SelectItem value="sankmo" className="text-gray-900 dark:text-white focus:bg-gray-100 dark:focus:bg-gray-600">Sankmo</SelectItem>
                                                            <SelectItem value="icd" className="text-gray-900 dark:text-white focus:bg-gray-100 dark:focus:bg-gray-600">Indian-camp</SelectItem>
                                                            <SelectItem value="jmd" className="text-gray-900 dark:text-white focus:bg-gray-100 dark:focus:bg-gray-600">JMD</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="trackable"
                                                checked={formData.trackable}
                                                onCheckedChange={(checked) => 
                                                    setFormData(prev => ({ ...prev, trackable: checked }))
                                                }
                                                className="data-[state=checked]:bg-[#F97316]"
                                            />
                                            <Label htmlFor="trackable" className="text-gray-900 dark:text-gray-300">
                                                Trackable Campaign
                                            </Label>
                                        </div>

                                        {/* Campaign Steps/Process */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-gray-900 dark:text-gray-300">Campaign Process Steps</Label>
                                                <Button
                                                    type="button"
                                                    onClick={addStep}
                                                    size="sm"
                                                    className="bg-[#F97316] hover:bg-[#EA580C] text-white"
                                                >
                                                    <Plus className="w-4 h-4 mr-1" />
                                                    Add Step
                                                </Button>
                                            </div>
                                            <div className="space-y-3 max-h-60 overflow-y-auto">
                                                {formData.steps.map((step, index) => (
                                                    <div key={index} className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-gray-750">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-sm font-medium text-[#F97316]">
                                                                Step {index + 1}
                                                            </span>
                                                            {formData.steps.length > 1 && (
                                                                <Button
                                                                    type="button"
                                                                    onClick={() => removeStep(index)}
                                                                    size="sm"
                                                                    variant="outline"
                                                                    className="border-red-500 bg-transparent text-red-500 hover:bg-red-500 hover:text-white"
                                                                >
                                                                    <Trash2 className="w-3 h-3" />
                                                                </Button>
                                                            )}
                                                        </div>
                                                        <Textarea
                                                            placeholder="Enter step description (e.g., Download and install the mobile app from Play Store)"
                                                            value={step}
                                                            onChange={(e) => updateStep(index, e.target.value)}
                                                            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                                                            rows={2}
                                                            required
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-gray-900 dark:text-gray-300">Description</Label>
                                            <Textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                                                placeholder="Enter campaign description"
                                                rows={3}
                                                required
                                            />
                                        </div>

                                        <DialogFooter className="gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => {
                                                    resetForm();
                                                    setEdit(false);
                                                    setDialogState(false);
                                                }}
                                                disabled={loading}
                                                className="border-[#F97316] bg-transparent hover:bg-[#F97316]/10 text-[#F97316] hover:text-[#F97316]"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={loading}
                                                className="bg-[#F97316] hover:bg-[#EA580C]"
                                            >
                                                {loading ? "Processing..." : (edit ? "Update Campaign" : "Create Campaign")}
                                            </Button>
                                        </DialogFooter>
                                        </form>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex flex-col lg:flex-row gap-4 mt-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search campaigns..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                                />
                            </div>
                        </div>
                        
                        <div className="flex gap-2">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[140px] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                                    <SelectItem value="all" className="text-gray-900 dark:text-white">All Status</SelectItem>
                                    <SelectItem value="active" className="text-gray-900 dark:text-white">Active</SelectItem>
                                    <SelectItem value="inactive" className="text-gray-900 dark:text-white">Inactive</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={providerFilter} onValueChange={setProviderFilter}>
                                <SelectTrigger className="w-[140px] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                                    <SelectValue placeholder="Provider" />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                                    <SelectItem value="all" className="text-gray-900 dark:text-white">All Providers</SelectItem>
                                    <SelectItem value="hiqmobi" className="text-gray-900 dark:text-white">Hiqmobi</SelectItem>
                                    <SelectItem value="sankmo" className="text-gray-900 dark:text-white">Sankmo</SelectItem>
                                    <SelectItem value="icd" className="text-gray-900 dark:text-white">Indian-camp/JMD</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Tabs */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
                        <TabsList className="grid w-full grid-cols-3 lg:w-[400px] bg-gray-200 dark:bg-gray-700">
                            <TabsTrigger value="all" className="data-[state=active]:bg-[#F97316]">
                                All ({totalCampaigns})
                            </TabsTrigger>
                            <TabsTrigger value="active" className="data-[state=active]:bg-[#10B981]">
                                Active ({activeCampaigns})
                            </TabsTrigger>
                            <TabsTrigger value="inactive" className="data-[state=active]:bg-[#EF4444]">
                                Inactive ({inactiveCampaigns})
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsContent value={activeTab} className="mt-0">
                            {loading ? (
                                <div className="flex items-center justify-center py-12">
                                    <RefreshCw className="w-8 h-8 animate-spin text-[#F97316]" />
                                    <span className="ml-2 text-gray-400">Loading campaigns...</span>
                                </div>
                            ) : filteredTable.length === 0 ? (
                                <div className="text-center py-12">
                                    <Target className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-300 mb-2">No campaigns found</h3>
                                    <p className="text-gray-500 mb-6">
                                        {searchTerm || statusFilter !== "all" || providerFilter !== "all"
                                            ? "Try adjusting your search or filters"
                                            : "Get started by creating your first campaign"}
                                    </p>
                                    {!searchTerm && statusFilter === "all" && providerFilter === "all" && (
                                        <Button
                                            onClick={() => setDialogState(true)}
                                            className="bg-[#F97316] hover:bg-[#EA580C]"
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Create First Campaign
                                        </Button>
                                    )}
                                </div>
                            ) : viewMode === "grid" ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filteredTable.map((camp, index) => (
                                        <Card key={camp._id} className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700/50">
                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{camp.title}</h3>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">ID: {camp.campId}</p>
                                                    </div>
                                                    <Badge
                                                        variant={camp.campaignStatus ? "default" : "secondary"}
                                                        className={camp.campaignStatus ? "bg-[#10B981]" : "bg-gray-500"}
                                                    >
                                                        {camp.campaignStatus ? "Active" : "Inactive"}
                                                    </Badge>
                                                </div>

                                                <div className="space-y-2 mb-4">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600 dark:text-gray-400">Payout:</span>
                                                        <span className="text-[#10B981] font-medium">₹{camp.payoutRate}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600 dark:text-gray-400">Provider:</span>
                                                        <span className="text-gray-900 dark:text-white">{camp.provider}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600 dark:text-gray-400">Trackable:</span>
                                                        <Badge
                                                            variant={camp.trackable ? "default" : "secondary"}
                                                            className={`${camp.trackable ? "bg-[#F97316]" : "bg-gray-500"} text-xs`}
                                                        >
                                                            {camp.trackable ? "Yes" : "No"}
                                                        </Badge>
                                                    </div>
                                                </div>

                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                                    {camp.description}
                                                </p>

                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => copyUrl(`https://twcampaign.in/campaign/${camp._id}`)}
                                                        className="border-[#F97316] bg-transparent hover:bg-[#F97316]/10 text-[#F97316] hover:text-[#F97316]"
                                                    >
                                                        <Copy className="w-3 h-3" />
                                                    </Button>
                                                    
                                                    <Switch
                                                        checked={camp.campaignStatus}
                                                        onCheckedChange={(value) => changeCampaignState(camp._id, value)}
                                                        className="data-[state=checked]:bg-[#10B981]"
                                                    />

                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleEdit(camp)}
                                                        className="border-[#F97316] bg-transparent hover:bg-[#F97316]/10 text-[#F97316] hover:text-[#F97316]"
                                                    >
                                                        <Edit className="w-3 h-3" />
                                                    </Button>

                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="border-red-500 bg-transparent text-red-500 hover:bg-red-500 hover:text-white"
                                                            >
                                                                <Trash2 className="w-3 h-3" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent className="bg-gray-800 border-gray-600">
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle className="text-white">
                                                                    Delete Campaign
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription className="text-gray-400">
                                                                    Are you sure you want to delete "{camp.title}"? This action cannot be undone.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel className="border-gray-600 text-gray-300 hover:bg-gray-700">
                                                                    Cancel
                                                                </AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => deleteCampaign(camp._id)}
                                                                    className="bg-red-600 hover:bg-red-700"
                                                                >
                                                                    Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-gray-300 dark:border-gray-600">
                                                <TableHead className="text-gray-900 dark:text-gray-300">#</TableHead>
                                                <TableHead className="text-gray-900 dark:text-gray-300">Campaign</TableHead>
                                                <TableHead className="text-gray-900 dark:text-gray-300">Camp ID</TableHead>
                                                <TableHead className="text-gray-900 dark:text-gray-300">Payout</TableHead>
                                                <TableHead className="text-gray-900 dark:text-gray-300">Provider</TableHead>
                                                <TableHead className="text-gray-900 dark:text-gray-300">Trackable</TableHead>
                                                <TableHead className="text-gray-900 dark:text-gray-300">Status</TableHead>
                                                <TableHead className="text-gray-900 dark:text-gray-300">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredTable.map((camp, index) => (
                                                <TableRow key={camp._id} className="border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700/50">
                                                    <TableCell className="text-gray-600 dark:text-gray-400">{index + 1}</TableCell>
                                                    <TableCell>
                                                        <div>
                                                            <div className="font-medium text-gray-900 dark:text-white">{camp.title}</div>
                                                            <div className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-xs">
                                                                {camp.description}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-gray-900 dark:text-gray-300">{camp.campId}</TableCell>
                                                    <TableCell className="text-[#10B981] font-medium">₹{camp.payoutRate}</TableCell>
                                                    <TableCell className="text-gray-900 dark:text-gray-300">{camp.provider}</TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={camp.trackable ? "default" : "secondary"}
                                                            className={camp.trackable ? "bg-[#F97316]" : "bg-gray-500"}
                                                        >
                                                            {camp.trackable ? "Yes" : "No"}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={camp.campaignStatus ? "default" : "secondary"}
                                                            className={camp.campaignStatus ? "bg-[#10B981]" : "bg-gray-500"}
                                                        >
                                                            {camp.campaignStatus ? "Active" : "Inactive"}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => copyUrl(`${origin}/camp?id=${camp.id}&afi=${camp.refId}`)}
                                                                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                                                title="Copy URL"
                                                            >
                                                                <Copy className="w-4 h-4" />
                                                            </Button>

                                                            <Switch
                                                                checked={camp.campaignStatus}
                                                                onCheckedChange={(value) => changeCampaignState(camp._id, value)}
                                                                className="data-[state=checked]:bg-[#10B981]"
                                                            />

                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => handleEdit(camp)}
                                                                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                                                title="Edit Campaign"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </Button>

                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <Button
                                                                        size="sm"
                                                                        variant="ghost"
                                                                        className="text-red-400 hover:text-red-300"
                                                                        title="Delete Campaign"
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </Button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle className="text-gray-900 dark:text-white">
                                                                            Delete Campaign
                                                                        </AlertDialogTitle>
                                                                        <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                                                                            Are you sure you want to delete "{camp.title}"? This action cannot be undone.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                                            Cancel
                                                                        </AlertDialogCancel>
                                                                        <AlertDialogAction
                                                                            onClick={() => deleteCampaign(camp._id)}
                                                                            className="bg-red-600 hover:bg-red-700"
                                                                        >
                                                                            Delete
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}

export default Offers