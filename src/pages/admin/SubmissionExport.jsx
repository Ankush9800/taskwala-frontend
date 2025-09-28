import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { 
  Download, 
  RefreshCw, 
  Filter, 
  Search, 
  Calendar,
  User,
  Target,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  FileSpreadsheet,
  FileText,
  Database
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

function SubmissionExport() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [campaignFilter, setCampaignFilter] = useState('all');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedSubmissions, setSelectedSubmissions] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [dateRange, setDateRange] = useState();
  const [exportLoading, setExportLoading] = useState(false);

  const fetchSubmissions = async () => {
    try {
      let obj = {}
      if (searchQuery) {
        obj.refUpiId = searchQuery
      }
      if (dateRange?.from && dateRange?.to) {
        obj.createdAt = {
            $gte: dateRange?.from.toISOString(),
            $lte: dateRange?.to.toISOString()
        }
      }
      if (campaignFilter !== "all") {
        obj.campName = campaignFilter
      }

      const res  = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/campaign/excampdata`,obj)
      // console.log("hi",res.data)
      setSubmissions(res.data)
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast.error('Failed to fetch submissions');
      setSubmissions([]); // Ensure array on error
    } finally {
      setLoading(false);
    }
  };

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/getallcampaign`);
      setCampaigns(res.data || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };
  const exportToCSV = async() => {
    try {
      const obj = {}
      if (searchQuery) {
        obj.refUpiId = searchQuery
      }
      if (dateRange?.from && dateRange?.to) {
        obj.createdAt = {
            $gte: dateRange?.from.toISOString(),
            $lte: dateRange?.to.toISOString()
        }
      }
      if (campaignFilter !== "all") {
        obj.campName = campaignFilter
      }

      const response  = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/campaign/exsubs`,obj,{
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "data.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    let timeout
    if (searchQuery) {
      timeout = setTimeout(() => {
        fetchSubmissions();
      }, 1000);
    }
    return ()=>{
      clearTimeout(timeout)
    }
  }, [searchQuery, campaignFilter, dateRange?.from && dateRange?.to]);
  
  useEffect(() => {
    fetchCampaigns();
  }, [])
  

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex animate-spin h-16 w-16 border-4 border-transparent border-t-[#F97316] border-l-[#F97316] rounded-full justify-center items-center">
            <div className="animate-spin-reverse h-12 w-12 border-4 border-transparent border-t-[#EA580C] border-l-[#EA580C] rounded-full"></div>
          </div>
          <p className="text-white text-sm">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <Toaster />
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-gradient-to-r from-[#F97316] to-[#713306] p-3 rounded-xl">
            <Download className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Submission Export</h1>
            <p className="text-gray-400">Sort, filter and export submission data</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-black/80 backdrop-blur-sm border-gray-800 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Total Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{Array.isArray(submissions) ? submissions.length : 0}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/80 backdrop-blur-sm border-gray-800 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{Array.isArray(submissions) ? submissions.length : 0}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/80 backdrop-blur-sm border-gray-800 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Selected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#F97316]">{selectedSubmissions.length}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/80 backdrop-blur-sm border-gray-800 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">
              {Array.isArray(submissions) ? submissions.filter(sub => sub.status === null || sub.status === undefined).length : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card className="bg-black/80 backdrop-blur-sm border-gray-800 text-white mb-6">
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Search and Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative md:col-span-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Enter refer"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <Select value={campaignFilter} onValueChange={setCampaignFilter}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Filter by campaign" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campaigns</SelectItem>
                  {campaigns.map((campaign) => (
                    <SelectItem key={campaign._id} value={campaign.title}>
                      {campaign.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-gray-800 border-gray-700 text-white hover:bg-gray-700 truncate",
                      !dateRange && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="truncate">
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "dd/MM")} - {format(dateRange.to, "dd/MM/yy")}
                          </>
                        ) : (
                          format(dateRange.from, "dd/MM/yy")
                        )
                      ) : (
                        "Date range"
                      )}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <CalendarComponent
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={1}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
              <div className="flex gap-3">
                <Button
                  onClick={fetchSubmissions}
                  disabled={loading}
                  variant="outline"
                  className="border-[#F97316] bg-transparent hover:bg-[#F97316]/10 text-[#F97316] hover:text-[#F97316]"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setCampaignFilter('all');
                    setDateRange(undefined);
                    setSelectedSubmissions([]);
                  }}
                  variant="outline"
                  className="border-gray-600 bg-transparent hover:bg-gray-600/10 text-gray-300 hover:text-white"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={exportToCSV}
                  disabled={exportLoading || submissions?.length === 0}
                  className="bg-[#10B981] hover:bg-[#059669]"
                >
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  {exportLoading ? 'Exporting...' : 'Export CSV'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submissions Table */}
      
    </div>
  );
}

export default SubmissionExport;