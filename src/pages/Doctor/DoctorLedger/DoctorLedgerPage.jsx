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
import {  useState } from "react";
import { buildQueryParams } from "@/utility/buildQueryParams";
import useLoadingStore from "@/store/loadingStore";
import axios from "@/config/axiosConfig";
import Pagination from "@/utility/Pagination";
import PlaceHolder from "@/utility/PlaceHolder";
import { DoctorOptions } from "@/utility/SelectOptions";

const DoctorLedgerPage = () => {
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [doctorLedgers, setDoctorLedgers] = useState([]);
  const [doctorId, setDoctorId] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const { setLoading } = useLoadingStore();
  const [queryParams, setQueryParams] = useState({
    page: 0,
    size: 10,
  });
  // function tol fetch doctor data

  // handle page change
  const handlePageChange = (page) => {
    setQueryParams((prev) => ({
      ...prev,
      page: page,
    }));
  };
  // useEffect(() => {
  //   getAllDoctorLedgers();
  // }, [queryParams]);
  const handleDoctorChange = async (selectedOption) => {
    setLoading(true);
    const id = selectedOption?.value;
    setDoctorId(id);
    try {
      const queryData = buildQueryParams(queryParams);
      const res = await axios.get(`/doctor-ledgers/${id}/doctor-ledgers?${queryData}`);
      console.log(res);
      setDoctorLedgers(res?.data);
      setTotalPages(res?.data?.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mb-8">
      <div>
        <SectionHeader title={"Doctor Ledger"} />
      </div>

      {/* doctor ledger */}
      <div className="wrapper">
        <form className="flex flex-wrap items-end mb-8 gap-5">
          <div className="w-[90vw] md:w-[320px]">
            <label className="form-label">Doctor</label>
            <DoctorOptions
              defaultValue={doctorId}
              onDoctorChange={handleDoctorChange}
            />
          </div>
        </form>

        {doctorLedgers?.length > 0 ? (
          <>
            {/* Information Summary */}
            <div>
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
                      <th className="py-2">Doctor ID</th>
                      <th>Doctor Name</th>
                      <th>Rate of Visit</th>
                      <th> Balance</th>
                      <th>Commission percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-100">
                      <td className="py-4">{doctorLedgers[0]?.doctor?.id}</td>
                      <td>{doctorLedgers[0]?.doctor?.nameEn}</td>{" "}
                      {/* Replace with dynamic Agent name if needed */}
                      <td>{doctorLedgers[0]?.doctor?.rateOfVisit}</td>
                      <td>{doctorLedgers[0]?.doctor?.total_balance}</td>
                      <td>{doctorLedgers[0]?.doctor?.commissionPercentage}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* ledger history */}
            <div>
              <div>
                <TableHeader
                  title={"Doctor History"}
                  selectedWidth={"w-[120px]"}
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
              <div className="overflow-x-auto">
                <table className="table min-w-full">
                  <thead>
                    <tr className="text-left text-gray-800 border-b">
                      <th className="py-2">Transaction Date</th>
                      <th>Transaction Type</th>
                      <th>Transaction Details</th>
                      <th>Payment Amount</th>
                      <th>Balance</th>
                      <th>User Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctorLedgers?.length > 0 ? (
                      doctorLedgers?.map((ledger, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100">
                          <td className="py-4">{ledger?.transactionDate}</td>
                          <td>{ledger?.transactionType}</td>
                          <td>{ledger?.transactionDetails}</td>
                          <td>{ledger?.paymentAmount}</td>
                          <td>{ledger?.balance}</td>
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
                                    Patient Ledger Details
                                  </DialogTitle>
                                  <DialogDescription className="text-gray-500 text-sm">
                                    Complete information for this transaction.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogDescription>
                                  <div className="grid grid-cols-1 gap-6">
                                    {/* Transaction Information Section */}
                                    <div className="p-4">
                                      <div className="w-full mb-6">
                                        <h2 className="text-base text-black font-medium mb-2">
                                          Transaction Information
                                        </h2>
                                        <div className="h-[2px] bg-gray-200">
                                          <div className="h-[2px] bg-primary w-[210px]"></div>
                                        </div>
                                      </div>
                                      <div className="space-y-4">
                                        <p className="text-gray-600">
                                          <span className="font-medium mr-1">
                                            Transaction Date:
                                          </span>
                                           {ledger?.transactionDate}
                                        </p>
                                        <p className="text-gray-600">
                                          <span className="font-medium mr-1">
                                            Transaction Type:
                                          </span>
                                          {ledger?.transactionType || "N/A"}
                                        </p>
                                        <p className="text-gray-600">
                                          <span className="font-medium mr-1">
                                            Transaction Details:
                                          </span>
                                          {ledger?.transactionDetails || "N/A"}
                                        </p>
                                        <p className="text-gray-600">
                                          <span className="font-medium mr-1">
                                            Payment Amount:
                                          </span>
                                          {ledger?.paymentAmount || 0}
                                        </p>

                                        <p className="text-gray-600">
                                          <span className="font-medium mr-1">
                                            Balance:
                                          </span>
                                          {ledger?.balance || 0}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </DialogDescription>
                              </DialogContent>
                            </Dialog>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="12" className="py-8 text-center">
                          <PlaceHolder />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div>
            <div colSpan="12" className="py-8 text-center">
              <PlaceHolder />
            </div>
          </div>
        )}
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

export default DoctorLedgerPage;
