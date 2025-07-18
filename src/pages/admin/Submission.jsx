import { Button } from '@/components/ui/button'
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Submission() {

  const [submissions, setSubmissions] = useState([])
  const [page, setPage] = useState(1)
  const [countTotal, setCountTotal] = useState(0)
  const [indexCount, setIndexCount] = useState(1)

  const getAllSubmission = async() =>{
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/getallsubmission?page=${page}`)
    const submission = res.data.data
    setSubmissions(submission[0])
    setCountTotal(submission[1])
    setIndexCount((page - 1)*10)
    console.log(submission)
  }

  useEffect(()=>{
    getAllSubmission()
  },[page])

  return (
    <>
    <div className="py-5 px-10 flex justify-end">
              <Button
                  onClick={getAllSubmission}
                  className="bg-gradient-to-r from-[#F97316] to-[#713306] hover:scale-105 cursor-pointer mr-10"
                >
                  Refresh
                </Button>
            </div>
            <div className='pb-10'>
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
                      <TableCell>{indexCount + index + 1}</TableCell>
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
          <Pagination>
                <PaginationContent>
                  <PaginationItem className="cursor-pointer">
                    {page!=1?<PaginationPrevious onClick={()=> setPage(p => Math.max(p-1,1))}/>:<></>}
                  </PaginationItem>
                  <PaginationItem>
                    <span className="px-4 py-1 text-sm font-medium">Page {page}</span>
                  </PaginationItem>
                  <PaginationItem className="cursor-pointer">
                    {page*10<countTotal?<PaginationNext onClick={()=> setPage(p => Math.max(p+1,1))}/>:<></>}
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
    </>
  )
}

export default Submission