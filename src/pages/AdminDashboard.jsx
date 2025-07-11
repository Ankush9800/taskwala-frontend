import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/sonner";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Coins, Edit, Target, Trash2, TrendingUp, Users2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Admin() {
  const navigate = useNavigate()
  const isLocal = window.location.hostname === "localhost";
  const backendUrl = isLocal
    ? import.meta.env.VITE_BACKEND_URL
    : "https://backend.hellome.site";
  const [campaignLength, setCampaignLength] = useState(0);
  const [hiqmobiData, setHiqmobiData] = useState([])
  const [table, setTable] = useState([]);
  const [submissions, setSubmissions] = useState([])
  const [dialogState, setDialogState] = useState(false);
  const [edit, setEdit] = useState(false);
  const [campId, setCampId] = useState("");
  const [page, setPage] = useState(1)
  const [disable, setDisable] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    payoutRate: "",
    trackingUrl: "",
    description: "",
    campaignImage: null,
  });
  const limit = 10

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("payoutRate", formData.payoutRate);
    data.append("trackingUrl", formData.trackingUrl);
    data.append("description", formData.description);
    data.append("campaignImage", formData.campaignImage);

    if (!edit) {
      try {
        const res = await axios.post(
          `${backendUrl}/campaign/newcampaign`,
          data
        );
        getAllCampaign();
        console.log("succesfully created", res, formData);
        setDialogState(false);
        toast("Created successfully", {
          style: {
            backgroundColor: "#065f46",
            color: "#fff",
            borderColor: "#fff",
            border: "2px",
          },
          duration: 2000,
          position: "top-right",
        });
      } catch (error) {
        console.log("error", error);
        toast("Campaign creation failed", {
          style: {
            backgroundColor: "#BA2D0B",
            color: "#fff",
            borderColor: "#fff",
            border: "2px",
          },
          duration: 2000,
          position: "top-right",
        });
      }
    } else {
      try {
        const res = await axios.post(
          `${backendUrl}/campaign/updatecamp/${campId}`,
          data
        );
        getAllCampaign();
        setDialogState(false);
        console.log(res.data);
        toast("Campaign updated successfully", {
          style: {
            backgroundColor: "#065f46",
            color: "#fff",
            borderColor: "#fff",
            border: "2px",
          },
          duration: 2000,
          position: "top-right",
        });
      } catch (error) {
        console.log("error while updating campaign", error);
        toast("Campaign update failed", {
          style: {
            backgroundColor: "#BA2D0B",
            color: "#fff",
            borderColor: "#fff",
            border: "2px",
          },
          duration: 2000,
          position: "top-right",
        });
      } finally {
        setEdit(false);
      }
    }
  };

  const getAllCampaign = async () => {
    const res = await axios.get(`${backendUrl}/campaign/getallcampaign`);
    console.log(res.data);
    setTable(res.data);
    setCampaignLength(res.data.length);
  };

  const getAllSubmission = async() =>{
    const res = await axios.get(`${backendUrl}/campaign/getallsubmission`)
    const submission = res.data.data
    setSubmissions(submission)
    console.log(submission)
  }

  const handleLogout = async()=>{
    try {
      const res = await axios.get(`${backendUrl}/admin/adminlogout`,{
        withCredentials : true
      })
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCampaign();
    getAllSubmission();
  }, []);

  useEffect(()=>{
    HiqmobiTrack()
  },[page])

  const deleteCampaign = async (id) => {
    try {
      const res = await axios.post(
        `${backendUrl}/campaign/deletecampaign/${id}`
      );
      getAllCampaign();
    } catch (error) {
      console.log("Campaign delete error", error);
    }
  };

  const changeCampaignState = async (id, status) => {
    try {
      const res = await axios.post(
        `${backendUrl}/campaign/updatecampstatus/${id}`,
        {
          campaignStatus: status,
        }
      );
      console.log(res);
      getAllCampaign();
    } catch (error) {
      console.log("error while update campaign status", error);
    }
  };

  const HiqmobiTrack = async () =>{
    const res1 = await axios.get(`${backendUrl}/campaign/gethiqmobidata?page=${page}`)
    setHiqmobiData(res1.data.data)
    const length1 = (res1.data.data.length)
    const res2 = await axios.get(`${backendUrl}/campaign/gethiqmobidata?page=${page+1}`)
    const length2 = (res2.data.data.length)
    if ((length1 === limit && length2 === 0) || length1 < limit) {
      setDisable(false)
    }
    if(length1 === limit && length2 > 0){
      setDisable(true)
    }
  }


  return (
    <>
      <Toaster />
      {/* main section */}
      <div className="flex justify-between">
        <div className="py-8 px-5">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00CFFF] to-[#A855F7] bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage campaigns, users, and platform analytics
        </p>
      </div>
      <div className="pt-10 pr-10">
        <Button
          onClick={handleLogout}
          className="bg-gradient-to-r from-[#F97316] to-[#713306] hover:scale-105 cursor-pointer mr-10"
        >
          Logout
        </Button>
      </div>
      </div>
      {/* tabs section */}
      <div className="px-5 w-screen">
        <Tabs defaultValue="Dashboard" className="w-full">
          <TabsList className="cursor-pointer bg-[#071e23] w-140 gap-2">
            <TabsTrigger
              value="Dashboard"
              className="cursor-pointer text-white data-[state=active]:bg-[#10B981] data-[state=active]:text-black"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="Campaign"
              className="cursor-pointer text-white data-[state=active]:bg-[#10B981] data-[state=active]:text-black"
            >
              Campaign
            </TabsTrigger>
            <TabsTrigger
              value="Submission"
              className="cursor-pointer text-white data-[state=active]:bg-[#10B981] data-[state=active]:text-black"
            >
              Submission
            </TabsTrigger>
            <TabsTrigger
              value="Hiqmobi"
              className="cursor-pointer text-white data-[state=active]:bg-[#10B981] data-[state=active]:text-black"
            >
              Hiqmobi
            </TabsTrigger>
          </TabsList>

          {/* Dashboard content */}
          <TabsContent value="Dashboard" className="w-full">
            <div className="flex gap-5 w-full">
              <Card className="bg-[#071e23] border-0 text-white w-1/4">
                <CardHeader className="flex justify-between">
                  <CardTitle>Total Campaigns</CardTitle>
                  <Target className="w-4 text-[#9CA3AF]" />
                </CardHeader>
                <CardContent className="text-[#10B981] font-bold text-2xl">
                  {campaignLength}
                </CardContent>
              </Card>
              <Card className="bg-[#071e23] border-0 text-white w-1/4">
                <CardHeader className="flex justify-between">
                  <CardTitle>Total Submission</CardTitle>
                  <Users2 className="w-4 text-[#9CA3AF]" />
                </CardHeader>
                <CardContent className="text-[#00CFFF] font-bold text-2xl">
                  {submissions.length}
                </CardContent>
              </Card>
              <Card className="bg-[#071e23] border-0 text-white w-1/4">
                <CardHeader className="flex justify-between">
                  <CardTitle>Total Rewards</CardTitle>
                  <Coins className="w-4 text-[#9CA3AF]" />
                </CardHeader>
                <CardContent className="text-[#A855F7] font-bold text-2xl">
                  ₹45345
                </CardContent>
              </Card>
              <Card className="bg-[#071e23] border-0 text-white w-1/4">
                <CardHeader className="flex justify-between">
                  <CardTitle>Conversion Rate</CardTitle>
                  <TrendingUp className="w-4 text-[#9CA3AF]" />
                </CardHeader>
                <CardContent className="text-[#F97316] font-bold text-2xl">
                  74.3%
                </CardContent>
              </Card>
            </div>
            <div></div>
          </TabsContent>

          {/* Campaign content */}
          <TabsContent value="Campaign" className="flex flex-col gap-5">
            <div className="flex justify-end">
              <Dialog open={dialogState} onOpenChange={setDialogState}>
                <Button
                  onClick={getAllCampaign}
                  className="bg-gradient-to-r from-[#F97316] to-[#713306] hover:scale-105 cursor-pointer mr-10"
                >
                  Refresh
                </Button>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-[#F97316] to-[#713306] hover:scale-105 cursor-pointer">
                    Create Campaign
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black text-white border-gray-500">
                  <DialogHeader>
                    <DialogTitle>Create Campaign</DialogTitle>
                    <DialogDescription>
                      Use this to add new campaign.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <Label>Name</Label>
                      <Input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="border-gray-600 border-2"
                        placeholder="Campaign name"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Payout Rate</Label>
                      <Input
                        name="payoutRate"
                        value={formData.payoutRate}
                        onChange={handleChange}
                        className="border-gray-600 border-2"
                        placeholder="Campaign payout rate"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Tracking URL</Label>
                      <Input
                        name="trackingUrl"
                        value={formData.trackingUrl}
                        onChange={handleChange}
                        className="border-gray-600 border-2"
                        placeholder="Campaign tracking url"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Campaign image</Label>
                      <Input
                        name="campaignImage"
                        onChange={handleChange}
                        className="border-gray-600 border-2 text-white cursor-pointer"
                        type="file"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Description</Label>
                      <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border-gray-600 border-2"
                        placeholder="Campaign description"
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        onClick={() => {
                          setFormData({
                            title: "",
                            payoutRate: "",
                            trackingUrl: "",
                            description: "",
                            campaignImage: null,
                          });
                        }}
                        className="cursor-pointer bg-white text-black filter hover:scale-105 hover:bg-white"
                      >
                        Reset
                      </Button>
                      <Button
                        type="submit"
                        className="cursor-pointer bg-gradient-to-r from-[#F97316] to-[#670404] hover:scale-105"
                      >
                        {edit? "Update Campaign": "Add Campaign"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="overflow-x-auto max-h-96 rounded-md">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="sticky z-10 top-0 bg-[#071e23]">
                    <TableHead className="text-white w-[5%]">No</TableHead>
                    <TableHead className="text-white w-[10%]">Name</TableHead>
                    <TableHead className="text-white w-[10%]">Payout</TableHead>
                    <TableHead className="text-white w-[20%]">
                      Tracking Url
                    </TableHead>
                    <TableHead className="text-white w-[35%]">
                      Description
                    </TableHead>
                    <TableHead className="text-white w-[10%]">Status</TableHead>
                    <TableHead className="text-white w-[10%]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {table.map((camp, index) => (
                    <TableRow
                      className="even:bg-[#0c2b33] odd:bg-[#4c2d1faa] hover:bg-transparent"
                      key={camp._id}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{camp.title}</TableCell>
                      <TableCell>₹{camp.payoutRate}</TableCell>
                      <TableCell className="truncate max-w-[50px]">
                        {camp.trackingUrl}
                      </TableCell>
                      <TableCell className="truncate max-w-[50px]">
                        {camp.description}
                      </TableCell>
                      <TableCell>
                        {camp.campaignStatus ? "active" : "inactive"}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 items-center">
                          <Switch
                            checked={camp.campaignStatus}
                            onCheckedChange={(value) =>
                              changeCampaignState(camp._id, value)
                            }
                            className="cursor-pointer data-[state=checked]:bg-green-500 bg-gray-400 border-2 transition-colors"
                          />
                          <Button
                            onClick={() => {
                              setEdit(true);
                              setFormData({
                                title: camp.title || "",
                                payoutRate: camp.payoutRate || "",
                                trackingUrl: camp.trackingUrl || "",
                                description: camp.description || "",
                                campaignImage: null,
                              });
                              setCampId(camp._id);
                              setDialogState(true);
                            }}
                            className="bg-transparent cursor-pointer hover:bg-[#A855F7] hover:text-black"
                          >
                            <Edit />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button className="bg-transparent cursor-pointer text-red-500 hover:bg-[#A855F7] hover:text-black">
                                <Trash2 />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-black text-white border-2 border-gray-700">
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete the campaign.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="text-black">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-800"
                                  onClick={() => deleteCampaign(camp._id)}
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
          </TabsContent>

          {/* Submission contest */}
          <TabsContent value="Submission">
            <div className="py-5 px-10 flex justify-end">
              <Button
                  onClick={getAllSubmission}
                  className="bg-gradient-to-r from-[#F97316] to-[#713306] hover:scale-105 cursor-pointer mr-10"
                >
                  Refresh
                </Button>
            </div>
          <ScrollArea className="h-100 rounded-md">
            <div>
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="sticky z-10 top-0 bg-[#071e23]">
                    <TableHead className="text-white w-[5%]">No</TableHead>
                    <TableHead className="text-white w-[10%]">Phone</TableHead>
                    <TableHead className="text-white w-[10%]">Upi</TableHead>
                    <TableHead className="text-white w-[10%]">Payout</TableHead>
                    <TableHead className="text-white w-[20%]">
                      Tracking Url
                    </TableHead>
                    <TableHead className="text-white w-[25%]">
                      time
                    </TableHead>
                    <TableHead className="text-white w-[10%]">Status</TableHead>
                    <TableHead className="text-white w-[10%]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((camp, index) => (
                    <TableRow
                      className="even:bg-[#0c2b33] odd:bg-[#365c6e] hover:bg-transparent"
                      key={camp._id}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{camp.phone}</TableCell>
                      <TableCell>{camp.upi}</TableCell>
                      <TableCell>
                        ₹{camp.payoutRate}
                      </TableCell>
                      <TableCell className="truncate max-w-[50px]">
                        {camp.redirectUrl}
                      </TableCell>
                      <TableCell className="truncate max-w-[50px]">
                        {new Date(camp.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {camp.status}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 items-center">
                          
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
          </TabsContent>

          {/* Hiqmobi Conversion */}
          <TabsContent value="Hiqmobi">
            <ScrollArea className="h-104 rounded-md">
            <div>
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="sticky z-10 top-0 bg-[#071e23]">
                    <TableHead className="text-white w-[5%]">No</TableHead>
                    <TableHead className="text-white w-[10%]">C-Name</TableHead>
                    <TableHead className="text-white w-[10%]">Offer-id</TableHead>
                    <TableHead className="text-white w-[10%]">Payout</TableHead>
                    <TableHead className="text-white w-[20%]">
                      Phone
                    </TableHead>
                    <TableHead className="text-white w-[25%]">
                      Upi-id
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hiqmobiData?.map((camp, index) => (
                    <TableRow
                      className="even:bg-[#0c2b33] odd:bg-[#365c6e] hover:bg-transparent"
                      key={index}
                    >
                      <TableCell>{(page - 1)*limit + index + 1}</TableCell>
                      <TableCell>{camp.p3}</TableCell>
                      <TableCell>{camp.offerid}</TableCell>
                      <TableCell>
                        ₹
                      </TableCell>
                      <TableCell className="truncate max-w-[50px]">
                        {camp.p1}
                      </TableCell>
                      <TableCell>
                        {camp.p2}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
          
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={()=> setPage(p => Math.max(p-1,1))}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <span className="px-4 py-1 text-sm font-medium">Page {page}</span>
                  </PaginationItem>
                  <PaginationItem>
                    {disable?<PaginationNext onClick={()=> setPage(p => Math.max(p+1,1))}/>:<></>}
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default Admin;