/* eslint-disable react/no-unescaped-entities */
import { FaSearch } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { IoInformation } from "react-icons/io5";
import TableHeader from "@/components/ui/table-header";
import SectionHeader from "@/components/ui/section-header";
import { LuCalendarDays } from "react-icons/lu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useState } from "react";

const CommissionTrackingReportPage = () => {
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  return (
    <div className="mb-8 ">
      <div>
        <SectionHeader title={"Commission Tracking"} />
      </div>
      <div className="wrapper">
        <div>
          <TableHeader
            title={"Test Based Commission List"}
            selectedWidth={"w-[240px]"}
          />
        </div>
        <div className="xl:flex gap-5 mb-6">
          {/* Search Input */}
          <div className="flex max-w-[350px] items-center xl:mb-0 mb-6  space-x-2 bg-[#EBF5FF] px-4 py-2 rounded-full flex-shrink-0 w-full sm:w-auto ">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-gray-600 w-full"
            />
          </div>

          <div className="flex md:flex-row flex-col gap-6 flex-wrap">
            {/* Date From */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex max-w-[350px] md:max-w-none items-center md:justify-normal justify-between space-x-5 border text-sm border-primary px-8 py-2 rounded-full text-gray-400 flex-shrink-0 w-full sm:w-auto">
                  <span>
                    {dateFrom ? (
                      <span className="text-gray-600">
                        {format(dateFrom, "PPP")}
                      </span>
                    ) : (
                      "Date From"
                    )}
                  </span>
                  <LuCalendarDays className="text-primary" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={setDateFrom}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* Date To */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex max-w-[350px]  items-center md:justify-normal justify-between space-x-5 border text-sm border-primary px-8 py-2 rounded-full text-gray-400 flex-shrink-0 w-full sm:w-auto">
                  <span>
                    {dateTo ? (
                      <span className="text-gray-600">
                        {format(dateTo, "PPP")}
                      </span>
                    ) : (
                      "Date To"
                    )}
                  </span>
                  <LuCalendarDays className="text-primary" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateTo}
                  onSelect={setDateTo}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="table min-w-full">
            <thead>
              <tr className="text-left text-gray-800 border-b">
                <th className="py-2">Test Date</th>
                <th>Test Name</th>
                <th>Test Price(Tk)</th>
                <th>Paid Amount(Tk)</th>
                <th>Commission Amount(TK)</th>
                <th>User Action</th>
              </tr>
            </thead>
            <tbody>
              {Array(6)
                .fill("")
                .map((doctor, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td>16 August, 2024</td>
                    <td>Blood test</td>
                    <td>1000</td>
                    <td>900</td>
                    <td>1000</td>
                    <td>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="btn-outline">
                            <IoInformation size={18} />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>See Details</DialogTitle>
                            <DialogDescription>
                              Make changes to your profile here. Click save when
                              you're done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4"></div>
                          <DialogFooter>
                            <button type="submit" className="btn-primary">
                              View Changes
                            </button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommissionTrackingReportPage;
