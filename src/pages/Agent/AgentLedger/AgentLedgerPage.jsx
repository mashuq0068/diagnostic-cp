import { useState } from "react";
import SectionHeader from "@/components/ui/section-header";
import TableHeader from "@/components/ui/table-header";
import { FaSearch } from "react-icons/fa";
import { IoInformation } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { TbUserPlus } from "react-icons/tb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PlaceHolder from "@/utility/PlaceHolder";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const AgentLedgerPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="mb-8">
      <div>
        <SectionHeader title={"Agent Ledger"} />
      </div>

      {/* Basic Information Form */}
      <div className="wrapper mb-8">
        <form
          className="flex flex-wrap items-end mb-8 gap-5"
          onSubmit={handleSubmit}
        >
          <div className="w-[90vw] md:w-[320px]">
            <label className="form-label">Agent</label>
            <select
              name="Agent"
              className="form-input form-select"
              defaultValue=""
            >
              <option value="" disabled>
                Choose
              </option>
              <option value="Agent 1" className="text-black">
                Agent 1
              </option>
              <option value="Agent 2" className="text-black">
                Agent 2
              </option>
              <option value="Agent 3" className="text-black">
                Agent 3
              </option>
            </select>
          </div>
          {/* Submit Button */}
          <div className="md:col-span-3">
            <button type="submit" className="btn-primary">
              <TbUserPlus className="mr-2 text-lg" />
              Access Agent Ledger
            </button>
          </div>
        </form>

        {/* Conditional Rendering */}
        {!isSubmitted ? (
          <div className="flex justify-center">
            {/* Placeholder Image */}
            <PlaceHolder />
          </div>
        ) : (
          <>
            {/* Information Summary */}
            <div>
              <TableHeader
                title={"Information Summary"}
                selectedWidth={"w-[200px]"}
              />
            </div>

            {/* Responsive Table Wrapper for Summary */}
            <div className="overflow-x-auto mb-8">
              <table className="table container min-w-full">
                <thead>
                  <tr className="text-left text-gray-800 border-b">
                    <th className="py-2">Agent ID</th>
                    <th>Agent Name</th>
                    <th>Rate of Visit</th>
                    <th>Current Balance</th>
                    <th>Commission percentage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-100">
                    <td className="py-4">11872</td>
                    <td>Agent 1</td>{" "}
                    {/* Replace with dynamic Agent name if needed */}
                    <td>900 TK</td>
                    <td>27,527 TK</td>
                    <td>30%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Agent Ledger */}
            <div className="wrapper">
              <TableHeader
                title={"Agent History"}
                selectedWidth={"w-[120px]"}
              />
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
                      <th className="py-2">Transaction Date</th>
                      <th>Transaction Type</th>
                      <th>Transaction Details</th>
                      <th>Debit</th>
                      <th>Credit</th>
                      <th>Balance</th>
                      <th>User Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array(6)
                      .fill("")
                      .map((_, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100">
                          <td className="py-4">16 August, 2024</td>
                          <td>Credit</td>
                          <td>Transaction is done by ------------</td>
                          <td>10,545 TK</td>
                          <td>10,545 TK</td>
                          <td>10,545 TK</td>
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
                                    Make changes to your profile here. Click
                                    save when you are done.
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
          </>
        )}
      </div>
    </div>
  );
};

export default AgentLedgerPage;
