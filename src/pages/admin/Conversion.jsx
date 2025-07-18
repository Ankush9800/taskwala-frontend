import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Conversion() {

    const [conversion, setConversion] = useState(null)
    const [page, setPage] = useState(1)
    const [countTotal, setCountTotal] = useState(0)
    const [indexCount, setIndexCount] = useState(1)

    const conversionData = async()=>{
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaign/getpostback?page=${page}`)
        console.log(res.data.data,'aa')
        setConversion(res.data.data[0])
        setCountTotal(res.data.data[1])
        setIndexCount((page - 1)*10)
    }

    useEffect(()=>{
        conversionData()
        
    },[page])

  return (
    <div>
        <ScrollArea className="h-104 rounded-md">
            <div>
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="sticky z-10 top-0 bg-[#071e23]">
                    <TableHead className="text-white w-[5%]">No</TableHead>
                    <TableHead className="text-white w-[10%]">C-Name</TableHead>
                    <TableHead className="text-white w-[10%]">Offer-id</TableHead>
                    <TableHead className="text-white w-[10%]">Payout</TableHead>
                    <TableHead className="text-white w-[10%]">Time</TableHead>
                    <TableHead className="text-white w-[20%]">
                      Phone
                    </TableHead>
                    <TableHead className="text-white w-[25%]">
                      Upi-id
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {conversion?.map((camp, index) => (
                    <TableRow
                      className="even:bg-[#0c2b33] odd:bg-[#365c6e] hover:bg-transparent"
                      key={index}
                    >
                      <TableCell>{indexCount + index + 1}</TableCell>
                      <TableCell>{camp.cName}</TableCell>
                      <TableCell>{camp.campId}</TableCell>
                      <TableCell>
                        ₹{camp.payout}
                      </TableCell>
                      <TableCell>{new Date(camp.createdAt).toLocaleString()}</TableCell>
                      <TableCell className="truncate max-w-[50px]">
                        {camp.phoneNo}
                      </TableCell>
                      <TableCell>
                        {camp.upiId}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
          
              <Pagination>
                <PaginationContent>
                  <PaginationItem className="cursor-pointer">
                    {page!=1?<PaginationPrevious onClick={()=> setPage(p => Math.max(p-1,1))}/>:<></>}
                  </PaginationItem>
                  <PaginationItem>
                    <span className="px-4 py-1 text-sm font-medium">Page {page}</span>
                  </PaginationItem>
                  <PaginationItem className="cursor-pointer">
                    {page*10<countTotal?<PaginationNext onClick={()=> setPage(p => Math.max(p+1,1))} />:<></>}
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
    </div>
  )
}

export default Conversion