import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Toaster } from '@/components/ui/sonner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Wallet,
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Search,
  Filter,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Download,
  Send,
  Eye,
  FileText,
  Sparkles,
  Copy,
  Phone,
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3
} from 'lucide-react'
import { toast } from 'sonner'

function Payments() {
  const [payments, setPayments] = useState([])
  const [page, setPage] = useState(1)
  const [countTotal, setCountTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)

  // Mock data for demonstration - replace with actual API calls
  const mockPayments = [
    {
      _id: "1",
      userName: "John Doe",
      phone: "+91 9876543210",
      upiId: "john.doe@paytm",
      amount: 250.00,
      status: "Paid",
      paymentDate: new Date(),
      transactionId: "TXN123456789",
      referralAmount: 50.00,
      campaignAmount: 200.00,
      paymentMethod: "UPI"
    },
    {
      _id: "2", 
      userName: "Jane Smith",
      phone: "+91 9876543211",
      upiId: "jane.smith@gpay",
      amount: 175.50,
      status: "Pending",
      paymentDate: new Date(),
      transactionId: null,
      referralAmount: 25.50,
      campaignAmount: 150.00,
      paymentMethod: "UPI"
    },
    {
      _id: "3",
      userName: "Mike Johnson", 
      phone: "+91 9876543212",
      upiId: "mike.j@phonepe",
      amount: 320.75,
      status: "Failed",
      paymentDate: new Date(),
      transactionId: null,
      referralAmount: 70.75,
      campaignAmount: 250.00,
      paymentMethod: "UPI"
    }
  ]

  useEffect(() => {
    // Simulate API call
    setPayments(mockPayments)
    setCountTotal(mockPayments.length)
  }, [page])

  const copy = async (value) => {
    try {
      await navigator.clipboard.writeText(value)
      toast.success("Copied to clipboard!", { duration: 2000 })
    } catch (error) {
      toast.error("Copy failed", { duration: 2000 })
    }
  }

  // Filter payments based on search and filters
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.upiId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.phone?.includes(searchTerm) ||
                         payment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || payment.status?.toLowerCase() === statusFilter.toLowerCase()
    
    let matchesDate = true
    if (dateFilter !== "all") {
      const paymentDate = new Date(payment.paymentDate)
      const today = new Date()
      const diffTime = Math.abs(today - paymentDate)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      switch (dateFilter) {
        case "today":
          matchesDate = diffDays <= 1
          break
        case "week":
          matchesDate = diffDays <= 7
          break
        case "month":
          matchesDate = diffDays <= 30
          break
        default:
          matchesDate = true
      }
    }
    
    return matchesSearch && matchesStatus && matchesDate
  })

  // Calculate stats
  const stats = {
    total: payments.length,
    totalAmount: payments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0),
    paidAmount: payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0),
    pendingAmount: payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0),
    failedAmount: payments.filter(p => p.status === 'Failed').reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0),
    paidCount: payments.filter(p => p.status === 'Paid').length,
    pendingCount: payments.filter(p => p.status === 'Pending').length,
    failedCount: payments.filter(p => p.status === 'Failed').length
  }

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return <Badge className="bg-[#10B981] text-white"><CheckCircle className="w-3 h-3 mr-1" />Paid</Badge>
      case 'pending':
        return <Badge className="bg-[#F97316] text-white"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
      case 'failed':
        return <Badge className="bg-red-600 text-white"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>
      default:
        return <Badge className="bg-gray-600 text-white"><AlertCircle className="w-3 h-3 mr-1" />Unknown</Badge>
    }
  }

  return (
    <div className="space-y-8 p-6">
      <Toaster />
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F97316]/20 to-[#713306]/20 border border-[#F97316]/30 rounded-full px-4 py-2 mb-4">
            <Wallet className="w-4 h-4 text-[#F97316]" />
            <span className="text-sm font-medium text-white">Payment Management</span>
            <Sparkles className="w-4 h-4 text-[#F97316]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Payments & Payouts</h1>
          <p className="text-gray-400">Manage user payments, process payouts, and track financial transactions.</p>
        </div>
        
        <div className="flex gap-3">
          <Button
            onClick={() => setLoading(!loading)}
            disabled={loading}
            variant="outline"
            className="border-[#F97316] bg-transparent hover:bg-[#F97316]/10 text-[#F97316] hover:text-[#F97316]"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            className="bg-gradient-to-r from-[#F97316] to-[#713306] hover:from-[#F97316]/80 hover:to-[#713306]/80"
          >
            <Send className="w-4 h-4 mr-2" />
            Process Payments
          </Button>
          <Button
            variant="outline"
            className="border-[#F97316] bg-transparent hover:bg-[#F97316]/10 text-[#F97316] hover:text-[#F97316]"
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
              Total Payments
              <Wallet className="w-4 h-4 text-[#F97316]" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">₹{stats.totalAmount.toFixed(2)}</div>
            <p className="text-xs text-gray-400 mt-1">{stats.total} transactions</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-[#10B981]/20 to-[#065f46]/20 border-[#10B981]/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center justify-between">
              Paid Amount
              <ArrowUpRight className="w-4 h-4 text-[#10B981]" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">₹{stats.paidAmount.toFixed(2)}</div>
            <p className="text-xs text-gray-400 mt-1">{stats.paidCount} successful</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-600/20 to-yellow-800/20 border-yellow-600/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center justify-between">
              Pending Amount
              <Clock className="w-4 h-4 text-yellow-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">₹{stats.pendingAmount.toFixed(2)}</div>
            <p className="text-xs text-gray-400 mt-1">{stats.pendingCount} awaiting</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-600/20 to-red-800/20 border-red-600/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center justify-between">
              Failed Amount
              <ArrowDownRight className="w-4 h-4 text-red-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">₹{stats.failedAmount.toFixed(2)}</div>
            <p className="text-xs text-gray-400 mt-1">{stats.failedCount} failed</p>
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
                placeholder="Search by name, UPI ID, phone, or transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px] bg-gray-700 border-gray-600 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all" className="text-white hover:bg-gray-700">All Status</SelectItem>
                  <SelectItem value="paid" className="text-white hover:bg-gray-700">Paid</SelectItem>
                  <SelectItem value="pending" className="text-white hover:bg-gray-700">Pending</SelectItem>
                  <SelectItem value="failed" className="text-white hover:bg-gray-700">Failed</SelectItem>
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

      {/* Payments Table */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#F97316]" />
                Payment Records
              </CardTitle>
              <CardDescription className="text-gray-400">
                Showing {filteredPayments.length} of {stats.total} payments
              </CardDescription>
            </div>
            <Badge variant="outline" className="border-[#F97316] bg-transparent text-[#F97316]">
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
                  <TableHead className="text-gray-300">User Details</TableHead>
                  <TableHead className="text-gray-300">UPI ID</TableHead>
                  <TableHead className="text-gray-300">Amount Breakdown</TableHead>
                  <TableHead className="text-gray-300">Total Amount</TableHead>
                  <TableHead className="text-gray-300">Transaction ID</TableHead>
                  <TableHead className="text-gray-300">Date & Time</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-[#F97316] py-8 font-semibold">
                      No payment records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPayments.map((payment, index) => (
                    <TableRow
                      className="border-gray-700 hover:bg-gray-800/30 transition-colors"
                      key={payment._id}
                    >
                      <TableCell className="text-gray-300 font-mono">
                        {((page - 1) * 10) + index + 1}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-white font-medium">{payment.userName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-400 text-sm">{payment.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-gray-400" />
                          <span className="text-white font-mono">{payment.upiId}</span>
                          <Button 
                            size="sm"
                            variant="ghost"
                            onClick={() => copy(payment.upiId)}
                            className="h-6 w-6 p-0 hover:bg-gray-700"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                            <span className="text-gray-300 text-sm">Campaign: ₹{payment.campaignAmount}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#F97316] rounded-full"></div>
                            <span className="text-gray-300 text-sm">Referral: ₹{payment.referralAmount}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <IndianRupee className="w-4 h-4 text-[#F97316]" />
                          <span className="text-white font-semibold text-lg">₹{payment.amount}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {payment.transactionId ? (
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="border-gray-600 bg-transparent text-gray-300 font-mono">
                              {payment.transactionId}
                            </Badge>
                            <Button 
                              size="sm"
                              variant="ghost"
                              onClick={() => copy(payment.transactionId)}
                              className="h-6 w-6 p-0 hover:bg-gray-700"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        ) : (
                          <span className="text-gray-500">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-300 text-sm">
                            {new Date(payment.paymentDate).toLocaleString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(payment.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-[#F97316] bg-transparent hover:bg-[#F97316]/10 text-[#F97316] hover:text-[#F97316]"
                            onClick={() => {
                              setSelectedPayment(payment)
                              setShowPaymentDialog(true)
                            }}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          {payment.status === 'Pending' && (
                            <Button
                              size="sm"
                              className="bg-[#10B981] hover:bg-[#10B981]/80 text-white"
                            >
                              <Send className="w-3 h-3 mr-1" />
                              Pay
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
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
                {page !== 1 ? 
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

      {/* Payment Details Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#F97316]" />
              Payment Details
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Complete payment information and transaction details
            </DialogDescription>
          </DialogHeader>
          
          {selectedPayment && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300">User Name</label>
                  <p className="text-white mt-1">{selectedPayment.userName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300">Phone Number</label>
                  <p className="text-white mt-1">{selectedPayment.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300">UPI ID</label>
                  <p className="text-white mt-1 font-mono">{selectedPayment.upiId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300">Payment Method</label>
                  <p className="text-white mt-1">{selectedPayment.paymentMethod}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300">Campaign Amount</label>
                  <p className="text-white mt-1">₹{selectedPayment.campaignAmount}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300">Referral Amount</label>
                  <p className="text-white mt-1">₹{selectedPayment.referralAmount}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300">Total Amount</label>
                  <p className="text-white mt-1 text-xl font-bold">₹{selectedPayment.amount}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedPayment.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300">Transaction ID</label>
                  <p className="text-white mt-1 font-mono">{selectedPayment.transactionId || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300">Payment Date</label>
                  <p className="text-white mt-1">{new Date(selectedPayment.paymentDate).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)} className="border-[#F97316] bg-transparent hover:bg-[#F97316]/10 text-[#F97316] hover:text-[#F97316]">
              Close
            </Button>
            {selectedPayment?.status === 'Pending' && (
              <Button className="bg-gradient-to-r from-[#F97316] to-[#713306] hover:from-[#F97316]/80 hover:to-[#713306]/80">
                <Send className="w-4 h-4 mr-2" />
                Process Payment
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Empty State */}
      {filteredPayments.length === 0 && !loading && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-12 text-center">
            <Wallet className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No payments found</h3>
            <p className="text-gray-400 mb-6">
              {searchTerm || statusFilter !== "all" || dateFilter !== "all" 
                ? "Try adjusting your search or filter criteria" 
                : "Payment records will appear here once users start earning from campaigns"}
            </p>
            <Button 
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

export default Payments
