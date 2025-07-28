import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toaster } from '@/components/ui/sonner';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { Edit, Share2, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

function Offers() {

  
    const [dialogState, setDialogState] = useState(false);
    const [campaignLength, setCampaignLength] = useState(0);
    const [edit, setEdit] = useState(false);
    const [table, setTable] = useState([]);
    const [campId, setCampId] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        campId: "",
        payoutRate: "",
        trackingUrl: "",
        description: "",
        campaignImage: null,
        provider: "",
      });

      const handleChange = (e) => {
        const { name, value, type, files, } = e.target;
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


      const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("title", formData.title);
        data.append("campId", formData.campId);
        data.append("payoutRate", formData.payoutRate);
        data.append("trackingUrl", formData.trackingUrl);
        data.append("description", formData.description);
        data.append("campaignImage", formData.campaignImage);
        data.append("provider", formData.provider);

        if (!edit) {
          try {
            const res = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/campaign/newcampaign`,
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
              `${import.meta.env.VITE_BACKEND_URL}/campaign/updatecamp/${campId}`,
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
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/getallcampaign`);
      console.log(res.data);
      setTable(res.data);
      setCampaignLength(res.data.length);
    };

    useEffect(()=>{
      getAllCampaign()
    },[])

    const deleteCampaign = async (id) => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/campaign/deletecampaign/${id}`
        );
        getAllCampaign();
      } catch (error) {
        console.log("Campaign delete error", error);
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
      } catch (error) {
        console.log("error while update campaign status", error);
      }
    };

    const copyUrl = async(value)=>{
      navigator.share({
        title:'try this',
        url:value
      })
      // navigator.clipboard.writeText(value)
      toast("share successfully", {
                style: {
                  backgroundColor: "#065f46",
                  color: "#fff",
                  borderColor: "#fff",
                  border: "2px",
                },
                duration: 2000,
      position: "top-right",})
    }

  return (
    <div className='flex flex-col gap-5'>
      <Toaster/>
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
                    <DialogTitle>{edit? "Update Campaign": "Create Campaign"}</DialogTitle>
                    <DialogDescription>
                      Use this to {edit? "update": "add new"} campaign.
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
                    <div className='flex gap-5 justify-between'>
                      <div className="flex flex-col gap-2">
                      <Label>Camp Id</Label>
                      <Input
                        name="campId"
                        value={formData.campId}
                        onChange={handleChange}
                        className="border-gray-600 border-2"
                        placeholder="Camp Id"
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
                        type='number'
                      />
                    </div>
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
                    <div className='flex gap-10'>
                      <Input
                        name="campaignImage"
                        onChange={handleChange}
                        className="border-gray-600 border-2 text-white cursor-pointer"
                        type="file"
                      />
                      <Select onValueChange={handleProviderChange} value={formData.provider} name='provider'>
                        <SelectTrigger className='border-gray-600 border-2'>
                          <SelectValue placeholder="Select provider"/>
                        </SelectTrigger>
                        <SelectContent className='border-gray-600 border-2 bg-black text-white font-semibold'>
                          <SelectGroup>
                            <SelectLabel className='text-gray-500'>Providers</SelectLabel>
                            <SelectItem value='hiqmobi'>Hiqmobi</SelectItem>
                            <SelectItem value='sankmo'>Sankmo</SelectItem>
                            <SelectItem value='icd'>Indian-camp</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
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
                            campId: "",
                            payoutRate: "",
                            trackingUrl: "",
                            description: "",
                            campaignImage: null,
                          });
                          setEdit(false);
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
                <TableHead className="text-white w-[10%]">Camp Id</TableHead>
                <TableHead className="text-white w-[10%]">Payout</TableHead>
                <TableHead className="text-white w-[20%]">
                  Tracking Url
                </TableHead>
                <TableHead className="text-white w-[25%]">
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
                  <TableCell>{camp.campId}</TableCell>
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
                      <Button className='bg-transparent hover:bg-[#A855F7]' onClick={()=>copyUrl(`https://task.hellome.site/campaign/${camp._id}`)}><Share2 className='color-white hover:color-black'/></Button>
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
                            campId: camp.campId || "",
                            payoutRate: camp.payoutRate || "",
                            trackingUrl: camp.trackingUrl || "",
                            description: camp.description || "",
                            campaignImage: null,
                            provider: camp.provider || "",
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
    </div>
  )
}

export default Offers