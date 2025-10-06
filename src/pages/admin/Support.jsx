import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  MessageSquare, 
  RefreshCw, 
  Download, 
  Eye, 
  Mail, 
  User, 
  Calendar, 
  Reply, 
  Check, 
  Clock,
  Archive,
  Search,
  Filter,
  Copy
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

function Support() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [replyText, setReplyText] = useState('');
  const [replyLoading, setReplyLoading] = useState(false);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/contact/getmsg`);
      console.log(res.data)
      setMessages(res.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (msgId) => {
    try {
      const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/contact/status/${msgId}`);
      console.log(res)
      setMessages(messages.map(msg => 
        msg._id === msgId ? { ...msg, status: 'read' } : msg
      ));
      toast.success('Message marked as read');
    } catch (error) {
      console.error('Error marking message as read:', error);
      toast.error('Failed to mark as read');
    }
  };

  const replyToMessage = async (messageId) => {
    try {
      setReplyLoading(true);
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/contact/reply/${messageId}`, {
        reply: replyText
      });
      setMessages(messages.map(msg => 
        msg._id === messageId ? { ...msg, status: 'replied', reply: replyText } : msg
      ));
      toast.success('Reply sent successfully');
      setReplyText('');
      setShowMessageDialog(false);
    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error('Failed to send reply');
    } finally {
      setReplyLoading(false);
    }
  };

  const copyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      toast.success('Email copied to clipboard');
    } catch (error) {
      console.error('Error copying email:', error);
      toast.error('Failed to copy email');
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.sub.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || message.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'unread':
        return <Badge variant="outline" className="border-yellow-500 bg-transparent text-yellow-500">Unread</Badge>;
      case 'read':
        return <Badge variant="outline" className="border-blue-500 bg-transparent text-blue-500">Read</Badge>;
      case 'replied':
        return <Badge variant="outline" className="border-green-500 bg-transparent text-green-500">Replied</Badge>;
      default:
        return <Badge variant="outline" className="border-gray-500 bg-transparent text-gray-500">Unknown</Badge>;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen p-6 flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex animate-spin h-16 w-16 border-4 border-transparent border-t-[#F97316] border-l-[#F97316] rounded-full justify-center items-center">
            <div className="animate-spin-reverse h-12 w-12 border-4 border-transparent border-t-[#EA580C] border-l-[#EA580C] rounded-full"></div>
          </div>
          <p className="text-gray-900 dark:text-white text-sm">Loading support messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <Toaster />
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-gradient-to-r from-[#F97316] to-[#713306] p-3 rounded-xl">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Support Messages</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage customer inquiries and support requests</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-gray-300 bg-gradient-to-r from-[#F97316]/40 to-[#713306]/40 dark:border-[#F97316]/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{messages.length}</div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-300 bg-gradient-to-r from-yellow-600/40 to-yellow-800/40 dark:border-yellow-600/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Unread</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
              {messages.filter(msg => msg.status === 'unread').length}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-300 bg-gradient-to-r from-[#10B981]/40 to-[#065f46]/40 dark:border-[#10B981]/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Replied</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">
              {messages.filter(msg => msg.status === 'replied').length}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-300 bg-gradient-to-r from-blue-600/40 to-blue-800/40 dark:border-blue-600/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              {messages.filter(msg => 
                new Date(msg.createdAt).toDateString() === new Date().toDateString()
              ).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card className="bg-white dark:bg-black/80 backdrop-blur-sm border-gray-300 dark:border-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-3 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-white text-sm"
              >
                <option value="all">All Status</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
              </select>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={fetchMessages}
                disabled={loading}
                variant="outline"
                className="border-[#F97316] bg-transparent hover:bg-[#F97316]/10 text-[#F97316] hover:text-[#F97316]"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
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
        </CardContent>
      </Card>

      {/* Messages Table */}
      <Card className="bg-white dark:bg-black/80 backdrop-blur-sm border-gray-300 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Support Messages ({filteredMessages.length})</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Customer inquiries and support requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-300 dark:border-gray-800">
                  <TableHead className="text-gray-700 dark:text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-400">Name</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-400">Email</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-400">Subject</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-400">Date</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-600 dark:text-gray-400">
                      No messages found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMessages.map((message) => (
                    <TableRow key={message._id} className="border-gray-300 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/30">
                      <TableCell>{getStatusBadge(message.status?"read":"unread")}</TableCell>
                      <TableCell className="font-medium text-gray-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          {message.fullName}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-300">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          {message.email}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300 max-w-xs truncate">
                        {message.sub}
                      </TableCell>
                      <TableCell className="text-gray-400 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(message.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-[#F97316] bg-transparent hover:bg-[#F97316]/10 text-[#F97316] hover:text-[#F97316]"
                                onClick={() => {
                                  setSelectedMessage(message);
                                  setShowMessageDialog(true);
                                }}
                              >
                                <Eye className="w-3 h-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl bg-gray-900 border-gray-800 text-white">
                              <DialogHeader>
                                <DialogTitle className="text-white">Message Details</DialogTitle>
                                <DialogDescription className="text-gray-400">
                                  Support inquiry from {selectedMessage?.name}
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium text-gray-400">Name</label>
                                    <p className="text-white">{selectedMessage?.fullName}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-400 mb-1 block">Email</label>
                                    <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg">
                                      <p className="text-white flex-1 text-sm break-all">{selectedMessage?.email}</p>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => copyEmail(selectedMessage?.email)}
                                        className="border-[#F97316] bg-transparent hover:bg-[#F97316]/10 text-[#F97316] hover:text-[#F97316] h-6 w-6 p-0 flex-shrink-0"
                                        title="Copy email to clipboard"
                                      >
                                        <Copy className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                                
                                <div>
                                  <label className="text-sm font-medium text-gray-400">Subject</label>
                                  <p className="text-white">{selectedMessage?.sub}</p>
                                </div>
                                
                                <div>
                                  <label className="text-sm font-medium text-gray-400">Message</label>
                                  <div className="bg-gray-800 p-4 rounded-lg">
                                    <p className="text-white whitespace-pre-wrap">{selectedMessage?.message}</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <label className="text-sm font-medium text-gray-400">Date Received</label>
                                  <p className="text-white">{selectedMessage && formatDate(selectedMessage.createdAt)}</p>
                                </div>
                              </div>
                              
                              <DialogFooter className="gap-2">
                                <Button
                                  variant="outline"
                                  className="border-[#F97316] bg-transparent hover:bg-[#F97316]/10 text-[#F97316] hover:text-[#F97316]"
                                  onClick={() => setShowMessageDialog(false)}
                                >
                                  Close
                                </Button>
                                
                                {selectedMessage?.status || (
                                  <Button
                                    onClick={() => markAsRead(selectedMessage._id)}
                                    variant="outline"
                                    className="border-blue-500 bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white"
                                  >
                                    <Check className="w-4 h-4 mr-2" />
                                    Mark as Read
                                  </Button>
                                )}
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
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
    </div>
  );
}

export default Support;