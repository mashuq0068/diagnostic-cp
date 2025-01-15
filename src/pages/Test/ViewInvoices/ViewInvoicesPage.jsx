/* eslint-disable react/no-unescaped-entities */
import { FaSearch } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

import { IoInformation } from "react-icons/io5";
import SectionHeader from "@/components/ui/section-header";
import { RiDeleteBinLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import useLoadingStore from "@/store/loadingStore";
import axios from "@/config/axiosConfig";
import Pagination from "@/utility/Pagination";
import PlaceHolder from "@/utility/PlaceHolder";
import { buildQueryParams } from "@/utility/buildQueryParams";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import TableHeader from "@/components/ui/table-header";

const ViewInvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const { setLoading } = useLoadingStore();
  const [queryParams, setQueryParams] = useState({
    page: 0,
    size: 10,
  });
  // useEffect
  useEffect(() => {
    getAllInvoices();
  }, [queryParams]);

  // function tol fetch invoice data
  const getAllInvoices = async () => {
    setLoading(true);
    try {
      const queryData = buildQueryParams(queryParams);
      const res = await axios.get(`/invoices?${queryData}`);
      setInvoices(res?.data?.invoices);
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
  // handle submit

  // handleDelete
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/invoices/${id}`);
      toast.success("Invoice Deleted Successfully");
      getAllInvoices();
    } catch (error) {
      toast.error("Delete is not permissible");
    } finally {
      setLoading(false);
    }
  };
  /// from frontend
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    console.log(searchTerm);
    if (!searchTerm) {
      getAllInvoices();
    }
    const filtered = invoices.filter((invoice) =>
      invoice?.patient?.fullName?.toLowerCase().includes(searchTerm)
    );
    setInvoices(filtered);
  };
  return (
    <div className="mb-8 ">
      <div>
        <SectionHeader title={"View Invoices"} />
      </div>

      <div className="wrapper">
        <div className="w-full mb-6">
          <div className="flex justify-between items-end gap-3 flex-wrap">
            <h2 className="text-base flex justify-between  flex-col font-medium mb-2">
              Invoice List
            </h2>

            <Link to="/test/invoice" className="btn-primary mb-3 text-[14px]">
              <BiPlus className="mr-2 text-lg" />
              New Invoice
            </Link>
          </div>
          <div className="h-[2px] bg-gray-200">
            <div className="h-[2px] bg-primary w-[120px]"></div>
          </div>
        </div>

        <>
          <div className="flex mb-5 md:space-x-6 md:space-y-0 space-y-3 flex-wrap">
            {/* Search Input */}
            <div className="flex py-2 items-center  space-x-2 bg-[#EBF5FF] px-4  rounded-full flex-shrink-0 w-full sm:w-auto mb-5 sm:mb-0">
              <FaSearch className="text-gray-500" />
              <input
                onChange={handleSearchChange}
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-gray-600 w-full"
              />
            </div>
          </div>
          <div className="table-responsive">
            <table className="table min-w-full">
              <thead>
                <tr className="text-left text-gray-800 border-b">
                  <th className="py-2">Invoice Date</th>
                  <th>Patient Name</th>
                  <th>Total Payment</th>
                  <th>Amount Paid</th>
                  <th>Discount</th>
                  <th>Due Amount</th>
                  <th>Payment Status</th>
                  <th>User Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.length > 0 ? (
                  invoices?.map((invoice) => (
                    <tr key={invoice.id} className="border-b hover:bg-gray-100">
                      <td className="py-4 flex items-center">
                        <span>
                          {new Date(
                            invoice?.invoiceDate
                          ).toLocaleDateString() || "N/A"}
                        </span>
                      </td>
                      <td>{invoice?.patient?.fullName || "N/A"}</td>
                      <td>{invoice?.totalPayment}</td>
                      <td>{invoice?.amountPaid}</td>
                      <td>{invoice?.discount}</td>
                      <td>{invoice?.dueAmount}</td>
                      <td>{invoice?.paymentStatus}</td>

                      <td className="flex space-x-2">
                        {/* View Details Button */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="btn-outline">
                              <IoInformation size={18} />
                            </button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Invoice Details</DialogTitle>
                              <DialogDescription>
                                Detailed information for Invoice #{invoice?.id}
                              </DialogDescription>
                            </DialogHeader>

                            <div className="grid grid-cols-1 gap-4">
                              {/* Invoice Information */}
                              <div className="wrapper shadow-none p-4">
                                <div>
                                  <TableHeader
                                    title={"Invoice Information"}
                                    selectedWidth={"w-[200px]"}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <p className="text-gray-600">
                                    <span className="font-medium mr-1">
                                      Invoice Date:
                                    </span>
                                    {new Date(
                                      invoice?.invoiceDate
                                    ).toLocaleDateString() || "N/A"}
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="font-medium mr-1">
                                      Patient Name:
                                    </span>
                                    {invoice?.patient?.fullName || "N/A"}
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="font-medium mr-1">
                                      Total Payment:
                                    </span>
                                    {invoice?.totalPayment || "N/A"}
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="font-medium mr-1">
                                      Amount Paid:
                                    </span>
                                    {invoice?.amountPaid || "N/A"}
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="font-medium mr-1">
                                      Discount:
                                    </span>
                                    {invoice?.discount}
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="font-medium mr-1">
                                      Due Amount:
                                    </span>
                                    {invoice?.dueAmount}
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="font-medium mr-1">
                                      Payment Status:
                                    </span>
                                    {invoice?.paymentStatus || "N/A"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {/* Edit Button */}
                        <Link
                          to={`/test/edit-invoice/${invoice?.id}`}
                          className="btn-outline border border-green-500 rounded-lg text-black hover:text-white hover:bg-green-500 transition duration-300"
                        >
                          <CiEdit size={18} />
                        </Link>

                        {/* Delete Button */}

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="btn-outline border border-red-400 rounded-lg text-red-400 hover:text-white hover:bg-red-400 transition duration-300">
                              <RiDeleteBinLine size={18} />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone.Because, This will
                                permanently delete your data.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="btn-primary bg-gray-200 text-black hover:text-black hover:bg-gray-300">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(invoice?.id)}
                                className="btn-primary bg-red-500 hover:bg-red-600"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
        </>
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

export default ViewInvoicesPage;
