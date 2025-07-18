import React from 'react'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const statusBadgeStyles = {
  Paid: "bg-green-600 text-white",
  Pending: "bg-yellow-500 text-black",
  Failed: "bg-red-600 text-white",
};

function Payments() {

    const payments = []

  return (
    <div className="m-6 rounded-md">
      <Table className="w-full rounded-md">
        <TableHeader>
          <TableRow className="sticky top-0 z-10 bg-[#071e23] border-b border-[#A855F7]">
            <TableHead className="text-white w-[5%]">No</TableHead>
            <TableHead className="text-white w-[18%]">User Name</TableHead>
            <TableHead className="text-white w-[28%]">UPI ID</TableHead>
            <TableHead className="text-white w-[15%]">Amount</TableHead>
            <TableHead className="text-white w-[14%]">Status</TableHead>
            <TableHead className="text-white w-[20%]">Payment Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-[#F97316] py-8 font-semibold">
                No payment records found.
              </TableCell>
            </TableRow>
          ) : (
            payments.map((pay, idx) => (
              <TableRow
                key={pay._id || idx}
                className={`odd:bg-[#0c2b33] even:bg-[#365c6e] hover:bg-[#00CFFF22] transition-colors`}
              >
                <TableCell className="font-medium text-[#F5F5F5]">{idx + 1}</TableCell>
                <TableCell className="text-[#00CFFF]">{pay.userName}</TableCell>
                <TableCell className="truncate max-w-[180px]">
                  {/* <CopyCell value={pay.upiId} label="UPI ID" /> */}
                </TableCell>
                <TableCell className="font-semibold text-[#F97316] text-base">
                  ₹{pay.amount}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full font-semibold text-xs ${statusBadgeStyles[pay.status] ?? "bg-gray-500 text-white"}`}>
                    {pay.status}
                  </span>
                </TableCell>
                <TableCell className="text-xs text-[#9CA3AF] min-w-[120px]">
                  {new Date(pay.paymentDate).toLocaleString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default Payments
