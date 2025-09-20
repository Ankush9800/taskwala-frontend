import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Toaster } from '@/components/ui/sonner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import axios from 'axios'
import { 
  Clipboard, 
  Trash2, 
  RefreshCw,
  Search,
  Filter,
  TrendingUp,
  Target,
  DollarSign,
  Users,
  Calendar,
  Phone,
  CreditCard,
  Download,
  FileText,
  Sparkles,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

function Conversion() {
    const [conversion, setConversion] = useState(null)
    const [page, setPage] = useState(1)
    const [countTotal, setCountTotal] = useState(0)
    const [indexCount, setIndexCount] = useState(1)
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [providerFilter, setProviderFilter] = useState("all")
    const [dateFilter, setDateFilter] = useState("all")

    const conversionData = async() => {
        try {
            setLoading(true)
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/getpostback?page=${page}`)
            // console.log(res.data.data,'aa')
            setConversion(res.data.data[0])
            setCountTotal(res.data.data[1])
            setIndexCount((page - 1)*10)
        } catch (error) {
            console.error("Error fetching conversions:", error)
            toast.error("Failed to fetch conversions")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        conversionData()
    }, [page])

    const copy = async(value) => {
        try {
            await navigator.clipboard.writeText(value)
            toast.success("Copied to clipboard!", {
                duration: 2000,
            })
        } catch (error) {
            console.log(error)
            toast.error("Copy failed", {
                duration: 2000,
            })
        }
    }

    // Filter conversions based on search and filters
    const filteredConversions = conversion?.filter(conv => {
        const matchesSearch = conv.cName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             conv.campId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             conv.phoneNo?.includes(searchTerm) ||
                             conv.upiId?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesProvider = providerFilter === "all" || conv.provider?.toLowerCase() === providerFilter.toLowerCase();
        
        let matchesDate = true;
        if (dateFilter !== "all") {
            const convDate = new Date(conv.createdAt);
            const today = new Date();
            const diffTime = Math.abs(today - convDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            switch (dateFilter) {
                case "today":
                    matchesDate = diffDays <= 1;
                    break;
                case "week":
                    matchesDate = diffDays <= 7;
                    break;
                case "month":
                    matchesDate = diffDays <= 30;
                    break;
                default:
                    matchesDate = true;
            }
        }
        
        return matchesSearch && matchesProvider && matchesDate;
    }) || [];

    // Calculate stats
    const stats = {
        total: conversion?.length || 0,
        totalPayout: conversion?.reduce((sum, conv) => sum + (parseFloat(conv.payout) || 0), 0) || 0,
        avgPayout: conversion?.length > 0 ? 
            (conversion.reduce((sum, conv) => sum + (parseFloat(conv.payout) || 0), 0) / conversion.length).toFixed(2) : 0,
        todayConversions: conversion?.filter(conv => {
            const convDate = new Date(conv.createdAt);
            const today = new Date();
            return convDate.toDateString() === today.toDateString();
        }).length || 0
    };

    return (
        <div className="space-y-8 p-6">
            <Toaster />
            
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F97316]/20 to-[#713306]/20 border border-[#F97316]/30 rounded-full px-4 py-2 mb-4">
                        <TrendingUp className="w-4 h-4 text-[#F97316]" />
                        <span className="text-sm font-medium text-white">Conversion Tracking</span>
                        <Sparkles className="w-4 h-4 text-[#F97316]" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Conversions & Analytics</h1>
                    <p className="text-gray-400">Track campaign performance, monitor conversions, and analyze user engagement.</p>
                </div>
                
                <div className="flex gap-3">
                    <Button
                        onClick={conversionData}
                        disabled={loading}
                        variant="outline"
                        className="border-gray-600 hover:bg-gray-800 text-white"
                    >
                        <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                    <Button
                        variant="outline"
                        className="border-gray-600 hover:bg-gray-800 text-white"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-r from-[#F97316]/20 to-[#713306]/20 border-[#F97316]/30">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-gray-300 flex items-center justify-between">
                            Total Conversions
                            <Target className="w-4 h-4 text-[#F97316]" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{stats.total}</div>
                        <p className="text-xs text-gray-400 mt-1">All time conversions</p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-[#10B981]/20 to-[#065f46]/20 border-[#10B981]/30">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-gray-300 flex items-center justify-between">
                            Today's Conversions
                            <CheckCircle className="w-4 h-4 text-[#10B981]" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{stats.todayConversions}</div>
                        <p className="text-xs text-gray-400 mt-1">Last 24 hours</p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-[#155a69]/20 to-[#0c434a]/20 border-[#155a69]/30">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-gray-300 flex items-center justify-between">
                            Total Payout
                            <DollarSign className="w-4 h-4 text-[#155a69]" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">₹{stats.totalPayout.toFixed(2)}</div>
                        <p className="text-xs text-gray-400 mt-1">Combined earnings</p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-600/20 to-purple-800/20 border-purple-600/30">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-gray-300 flex items-center justify-between">
                            Avg. Payout
                            <BarChart3 className="w-4 h-4 text-purple-400" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">₹{stats.avgPayout}</div>
                        <p className="text-xs text-gray-400 mt-1">Per conversion</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters and Search */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                placeholder="Search by campaign, phone, UPI ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-gray-700 border-gray-600 text-white"
                            />
                        </div>
                        <div className="flex gap-3">
                            <Select value={providerFilter} onValueChange={setProviderFilter}>
                                <SelectTrigger className="w-[150px] bg-gray-700 border-gray-600 text-white">
                                    <Filter className="w-4 h-4 mr-2" />
                                    <SelectValue placeholder="Provider" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-600">
                                    <SelectItem value="all" className="text-white hover:bg-gray-700">All Providers</SelectItem>
                                    <SelectItem value="cpalead" className="text-white hover:bg-gray-700">CPAlead</SelectItem>
                                    <SelectItem value="adgate" className="text-white hover:bg-gray-700">AdGate</SelectItem>
                                    <SelectItem value="offertoro" className="text-white hover:bg-gray-700">OfferToro</SelectItem>
                                    <SelectItem value="custom" className="text-white hover:bg-gray-700">Custom</SelectItem>
                                </SelectContent>
                            </Select>
                            
                            <Select value={dateFilter} onValueChange={setDateFilter}>
                                <SelectTrigger className="w-[130px] bg-gray-700 border-gray-600 text-white">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <SelectValue placeholder="Date" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-600">
                                    <SelectItem value="all" className="text-white hover:bg-gray-700">All Time</SelectItem>
                                    <SelectItem value="today" className="text-white hover:bg-gray-700">Today</SelectItem>
                                    <SelectItem value="week" className="text-white hover:bg-gray-700">This Week</SelectItem>
                                    <SelectItem value="month" className="text-white hover:bg-gray-700">This Month</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Conversions Table */}
            <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-white flex items-center gap-2">
                                <FileText className="w-5 h-5 text-[#F97316]" />
                                Conversion Records
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                Showing {filteredConversions.length} of {stats.total} conversions
                            </CardDescription>
                        </div>
                        <Badge variant="outline" className="border-[#F97316] text-[#F97316]">
                            Page {page}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-gray-700 hover:bg-gray-800/50">
                                    <TableHead className="text-gray-300">#</TableHead>
                                    <TableHead className="text-gray-300">Campaign</TableHead>
                                    <TableHead className="text-gray-300">Offer ID</TableHead>
                                    <TableHead className="text-gray-300">Goal</TableHead>
                                    <TableHead className="text-gray-300">Payout</TableHead>
                                    <TableHead className="text-gray-300">Date & Time</TableHead>
                                    <TableHead className="text-gray-300">Provider</TableHead>
                                    <TableHead className="text-gray-300">Phone</TableHead>
                                    <TableHead className="text-gray-300">UPI ID</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredConversions.map((conv, index) => (
                                    <TableRow
                                        className="border-gray-700 hover:bg-gray-800/30 transition-colors"
                                        key={index}
                                    >
                                        <TableCell className="text-gray-300 font-mono">
                                            {indexCount + index + 1}
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <p className="text-white font-medium">{conv.cName}</p>
                                                <p className="text-gray-400 text-sm">Campaign</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="border-gray-600 text-gray-300 font-mono">
                                                {conv.campId}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Target className="w-3 h-3 text-[#F97316]" />
                                                <span className="text-white">{conv.goal}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="w-3 h-3 text-[#10B981]" />
                                                <span className="text-white font-semibold">
                                                    {conv.payout ? `₹${conv.payout}` : "₹0"}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-3 h-3 text-gray-400" />
                                                <span className="text-gray-300 text-sm">
                                                    {new Date(conv.createdAt).toLocaleString()}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge 
                                                variant="outline" 
                                                className="border-[#F97316] text-[#F97316] capitalize"
                                            >
                                                {conv.provider}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-3 h-3 text-gray-400" />
                                                <span className="text-white font-mono">{conv.phoneNo}</span>
                                                <Button 
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => copy(conv.phoneNo)}
                                                    className="h-6 w-6 p-0 hover:bg-gray-700"
                                                >
                                                    <Clipboard className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <CreditCard className="w-3 h-3 text-gray-400" />
                                                <span className="text-white font-mono">{conv.upiId}</span>
                                                <Button 
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => copy(conv.upiId)}
                                                    className="h-6 w-6 p-0 hover:bg-gray-700"
                                                >
                                                    <Clipboard className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Pagination */}
            <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem className="cursor-pointer">
                                {page != 1 ? 
                                    <PaginationPrevious 
                                        onClick={() => setPage(p => Math.max(p-1, 1))}
                                        className="hover:bg-gray-700 text-white"
                                    /> : 
                                    <></>
                                }
                            </PaginationItem>
                            <PaginationItem>
                                <span className="px-4 py-2 text-sm font-medium text-white bg-[#F97316] rounded">
                                    Page {page} of {Math.ceil(countTotal / 10)}
                                </span>
                            </PaginationItem>
                            <PaginationItem className="cursor-pointer">
                                {page * 10 < countTotal ? 
                                    <PaginationNext 
                                        onClick={() => setPage(p => p + 1)}
                                        className="hover:bg-gray-700 text-white"
                                    /> : 
                                    <></>
                                }
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </CardContent>
            </Card>

            {/* Empty State */}
            {filteredConversions.length === 0 && !loading && (
                <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-12 text-center">
                        <TrendingUp className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">No conversions found</h3>
                        <p className="text-gray-400 mb-6">
                            {searchTerm || providerFilter !== "all" || dateFilter !== "all" 
                                ? "Try adjusting your search or filter criteria" 
                                : "Conversions will appear here once campaigns start generating results"}
                        </p>
                        <Button 
                            onClick={conversionData}
                            className="bg-gradient-to-r from-[#F97316] to-[#713306] hover:from-[#F97316]/80 hover:to-[#713306]/80"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Refresh Data
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default Conversion