import { useState } from "react";
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
import { IoInformation} from "react-icons/io5";
import SectionHeader from "@/components/ui/section-header";
import { BiPlus } from "react-icons/bi";
import { LuCalendarDays } from "react-icons/lu";
import { TbUserPlus } from "react-icons/tb";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { AiOutlineLeft } from "react-icons/ai";

const IncomeManagementPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  return (
    <div className="mb-8">
      <div>
        <SectionHeader title={"Income Management"} />
      </div>
      <div className="wrapper">
        <div className="w-full mb-6">
        <div className="flex justify-between items-end gap-3 flex-wrap">
            <h2 className="text-base flex justify-between  flex-col font-medium mb-2">
              {showForm && (
                <button
                  className=" text-gray-700 mb-5 text-lg"
                  onClick={() => setShowForm(!showForm)}
                >
                  <AiOutlineLeft />
                </button>
              )}
              {showForm ? "New Income" : "Income List"}
            </h2>
            {!showForm && (
              <button
                type="button"
                onClick={() => setShowForm(!showForm)}
                className="btn-primary mb-3 text-[14px]"
              >
                <BiPlus className="mr-2 text-lg" />
                New Income
              </button>
            )}
          </div>
          <div className="h-[2px] bg-gray-200">
            <div className="h-[2px] bg-primary w-[120px]"></div>
          </div>
        </div>

        {showForm ? (
          // Form Section

          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div>
                <label className="form-label">Income Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter Income name"
                />
              </div>
              <div>
                <label className="form-label">Amount</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="form-label"> Additional Income Source</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter Additional Income Source"
                />
              </div>
              <div>
                <label className="form-label">Invoice ID</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="EnterInvoice ID"
                />
              </div>
              <div>
                <label className="form-label">Description</label>
                <textarea
                  className="form-input"
                  placeholder="Enter description"
                  rows="1"
                ></textarea>
              </div>
            </div>
            {/* Submit Button */}
            <div className="mt-6">
              <button type="submit" className="btn-primary">
                <TbUserPlus className="mr-2 text-lg" />
                Create New Income
              </button>
            </div>
          </form>
        ) : (
          // Table Section
          <div className="transition-all ease-in-out duration-300">
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
            <div className="table-responsive">
              <table className="table min-w-full">
                <thead>
                  <tr className="text-left text-gray-800 border-b">
                    <th className="py-2">Income Name</th>
                    <th>Description</th>
                    <th>Income Source</th>
                    <th>Amount</th>
                    <th>Invoice Date</th>
                    <th>Created By</th>
                    <th>Updated By</th>
                    <th>User Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array(6)
                    .fill("")
                    .map((_, index) => (
                      <tr key={index} className="border-b hover:bg-gray-100">
                        <td className="py-4">Income</td>
                        <td>------------</td>
                        <td>Sample</td>
                        <td>10, 545 TK</td>
                        <td>12 August, 2024</td>
                        <td>Creator</td>
                        <td>Modifier</td>
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
                                  Make changes to your profile here. Click save
                                  when you are done.
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
        )}
      </div>
    </div>
  );
};

export default IncomeManagementPage;
