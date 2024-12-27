/* eslint-disable react/no-unescaped-entities */
import SectionHeader from "@/components/ui/section-header";
import TableHeader from "@/components/ui/table-header";
import { FaSearch } from "react-icons/fa";
import { IoInformation } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import useLoadingStore from "@/store/loadingStore";
import { buildQueryParams } from "@/utility/buildQueryParams";
import axios from "@/config/axiosConfig";
import Pagination from "@/utility/Pagination";

const CommissionTrackingPage = () => {
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [agentCommissions, setAgentCommissions] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const { setLoading } = useLoadingStore();
  const [queryParams, setQueryParams] = useState({
    page: 0,
    size: 10,
    fullName: "",
  });
  useEffect(() => {
    getAllAgentCommissions();
  }, [queryParams]);
  const getAllAgentCommissions = async () => {
    setLoading(true);
    try {
      const queryData = buildQueryParams(queryParams);
      const res = await axios.get(`/agent-commissions?${queryData}`);

      setAgentCommissions(res?.data?.agentCommissions);
      setTotalPages(res?.data?.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // handle page change
  const handlePageChange = (page) => {
    setQueryParams((prev) => ({
      ...prev,
      page: page,
    }));
  };

  return (
    <div className="mb-8">
      <div>
        <SectionHeader title={"Agent Commission Tracking"} />
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
                <th className="py-2">Invoice Date</th>
                <th>Test Name</th>
                <th>Test Amount(Tk)</th>
                <th>Paid Amount(Tk)</th>
                <th>Commission percentage</th>
                <th>Commission Amount(TK)</th>
                <th>User Action</th>
              </tr>
            </thead>
            <tbody>
              {agentCommissions?.map((commission, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td>
                    {commission?.createdAt
                      ? new Date(commission.createdAt).toLocaleString()
                      : "-----"}
                  </td>
                  <td>{commission?.test?.nameEn || "----"}</td>
                  <td>{commission?.testAmount || "----"}</td>
                  <td>{commission?.paidAmount || "----"}</td>
                  <td>{commission?.commissionPercentage || "----"}</td>
                  <td>{commission?.commissionAmount || "----"}</td>
                  <td>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="btn-outline">
                          <IoInformation size={18} />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px] bg-white rounded-lg shadow-lg p-6">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-semibold text-gray-800">
                            Commission Details
                          </DialogTitle>
                          <DialogDescription className="text-gray-500 text-sm">
                            Complete information about this commission.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogDescription>
                          <div className="grid grid-cols-1 gap-6">
                            {/* Test Details Section */}
                            <div className="p-4">
                              <div className="w-full mb-6">
                                <h2 className="text-base text-black font-medium mb-2">
                                  Test Details
                                </h2>
                                <div className="h-[2px] bg-gray-200">
                                  <div className="h-[2px] bg-primary w-[210px]"></div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <p className="text-gray-600">
                                  <span className="font-medium mr-1">
                                    Test Name:
                                  </span>
                                  {commission?.test?.nameEn || "N/A"}
                                </p>
                                <p className="text-gray-600">
                                  <span className="font-medium mr-1">
                                    Test Amount:
                                  </span>
                                  {commission?.testAmount || 0}
                                </p>
                              </div>
                            </div>

                            {/* Commission Information Section */}
                            <div className="p-4">
                              <div className="w-full mb-6">
                                <h2 className="text-base text-black font-medium mb-2">
                                  Commission Information
                                </h2>
                                <div className="h-[2px] bg-gray-200">
                                  <div className="h-[2px] bg-primary w-[210px]"></div>
                                </div>
                              </div>
                              <div className="space-y-4">
                              <p className="text-gray-600">
                                  <span className="font-medium mr-1">
                                   Agent Name:
                                  </span>
                                  {commission?.agent?.nameEn || "N/A"}
                                </p>
                                <p className="text-gray-600">
                                  <span className="font-medium mr-1">
                                    Commission Percentage:
                                  </span>
                                  {commission?.commissionPercentage || "N/A"}
                                </p>
                                <p className="text-gray-600">
                                  <span className="font-medium mr-1">
                                    Commission Amount:
                                  </span>
                                  {commission?.commissionAmount || 0}
                                </p>
                              </div>
                            </div>

                            {/* Payment Information Section */}
                            <div className="p-4">
                              <div className="w-full mb-6">
                                <h2 className="text-base text-black font-medium mb-2">
                                  Payment Information
                                </h2>
                                <div className="h-[2px] bg-gray-200">
                                  <div className="h-[2px] bg-primary w-[210px]"></div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <p className="text-gray-600">
                                  <span className="font-medium mr-1">
                                    Paid Amount:
                                  </span>
                                  {commission?.paidAmount || 0}
                                </p>
                                <p className="text-gray-600">
                                  <span className="font-medium mr-1">
                                    Date Created:
                                  </span>
                                  {commission?.createdAt
                                    ? new Date(
                                        commission.createdAt
                                      ).toLocaleString()
                                    : "N/A"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={queryParams.page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CommissionTrackingPage;
