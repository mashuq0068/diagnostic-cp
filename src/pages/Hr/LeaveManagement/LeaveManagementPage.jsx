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
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { TbUserPlus } from "react-icons/tb";
import { AiOutlineLeft } from "react-icons/ai";
import {
  EmployeeOptions,
  LeaveTypeOptions,
  StatusOptions,
} from "@/utility/SelectOptions";
import useLoadingStore from "@/store/loadingStore";
import axios from "@/config/axiosConfig";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { capitalizeWords } from "@/utility/capitalizeWords";
import PlaceHolder from "@/utility/PlaceHolder";

const LeaveManagementPage = () => {
  const [showForm, setShowForm] = useState(false);
  const { setLoading } = useLoadingStore();
  const [leavesList, setLeavesList] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
    status: "",
    remarks: "",
  });

  useEffect(() => {
    getAllLeaves();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace with your actual API endpoint
      await axios.post("/leaves", formData);

      toast.success("Leave created successfully!");

      // Optionally reset the form
      setFormData({
        employeeId: "",
        leaveType: "",
        fromDate: "",
        toDate: "",
        reason: "",
        status: "",
        remarks: "",
      });
      setShowForm(false);
      getAllLeaves();
    } catch (error) {
      toast.error(error.message || "Error creating leave. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Get all leaves
  const getAllLeaves = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/leaves`);
      console.log(res);
      setLeavesList(res?.data);
    } catch (error) {
      toast.error("Failed to fetch payrolls:", error);
    } finally {
      setLoading(false);
    }
  };
  // handleDelete
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/leaves/${id}`);
      toast.success("Leave Deleted Successfully");
      getAllLeaves();
    } catch (error) {
      toast.error("Delete is not permissible");
    } finally {
      setLoading(false);
    }
  };
  /// from frontend
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (!searchTerm) {
      getAllLeaves();
    }
    const filtered = leavesList.filter((payroll) =>
      payroll?.employee?.nameEn.toLowerCase().includes(searchTerm)
    );
    setLeavesList(filtered);
  };
  return (
    <div className="mb-8 ">
      <div>
        <SectionHeader title={"Leave Management"} />
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
              {showForm ? "New Leave" : "Leave List"}
            </h2>
            {!showForm && (
              <button
                type="button"
                onClick={() => setShowForm(!showForm)}
                className="btn-primary mb-3 text-[14px]"
              >
                <BiPlus className="mr-2 text-lg" />
                New Leave
              </button>
            )}
          </div>
          <div className="h-[2px] bg-gray-200">
            <div className="h-[2px] bg-primary w-[120px]"></div>
          </div>
        </div>

        {showForm ? (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Employee Dropdown */}
              <div>
                <label className="form-label">Employee</label>
                <EmployeeOptions
                  defaultValue={formData.employeeId}
                  onEmployeeChange={(selectedOption) =>
                    setFormData((prev) => ({
                      ...prev,
                      employeeId: selectedOption?.value || "",
                    }))
                  }
                />
              </div>

              {/* Leave Type Dropdown */}
              <div>
                <label className="form-label">Leave Type</label>
                <select
                  name="leave_type"
                  value={formData.leaveType}
                  onChange={(e) =>
                    setFormData({ ...formData, leaveType: e.target.value })
                  }
                  className="form-input"
                >
                  <option value="">Choose Leave Type</option>
                  <LeaveTypeOptions />
                </select>
              </div>

              {/* From Date */}
              <div>
                <label className="form-label">From Date</label>
                <input
                  type="date"
                  name="from_date"
                  value={formData.fromDate}
                  onChange={(e) =>
                    setFormData({ ...formData, fromDate: e.target.value })
                  }
                  className="form-input"
                />
              </div>

              {/* To Date */}
              <div>
                <label className="form-label">To Date</label>
                <input
                  type="date"
                  name="to_date"
                  value={formData.toDate}
                  onChange={(e) =>
                    setFormData({ ...formData, toDate: e.target.value })
                  }
                  className="form-input"
                />
              </div>

              {/* Reason */}
              <div>
                <label className="form-label">Reason</label>
                <input
                  type="text"
                  name="reason"
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                  className="form-input"
                  placeholder="Enter reason"
                />
              </div>

              {/* Status Dropdown */}
              <div>
                <label className="form-label">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="form-input"
                >
                  <option value="" disabled>
                    Choose Status
                  </option>
                  <StatusOptions />
                </select>
              </div>

              {/* Remarks (Textarea) */}
              <div>
                <label className="form-label">Remarks</label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={(e) =>
                    setFormData({ ...formData, remarks: e.target.value })
                  }
                  className="form-input"
                  placeholder="Enter remarks"
                  rows="1"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-primary mt-8">
              <TbUserPlus className="mr-2 text-lg" />
              Create New Leave
            </button>
          </form>
        ) : (
          <>
            <div className="flex mb-5 md:space-x-6 md:space-y-0 space-y-3 flex-wrap">
              {/* Search Input */}
              <div className="flex py-2 items-center  space-x-2 bg-[#EBF5FF] px-4  rounded-full flex-shrink-0 w-full sm:w-auto mb-5 sm:mb-0">
                <FaSearch className="text-gray-500" />
                <input

                  onChange={handleSearchChange}
                  type="text"
                  placeholder="Search"
                  className="bg-transparent outline-none text-gray-700 w-full"
                />
              </div>
            </div>
            <div className="table-responsive">
              <table className="table min-w-full">
                <thead>
                  <tr className="text-left text-gray-800 border-b">
                    <th className="py-2">Employee Name</th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Leave Type</th>
                    <th>User Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leavesList?.length > 0 ? (
                    leavesList?.map((leave) => (
                      <tr
                        key={leave?.id}
                        className="border-b hover:bg-gray-100"
                      >
                        <td className="py-4 ">{leave?.employee?.nameEn}</td>
                        <td>{leave?.fromDate}</td>
                        <td>{leave?.toDate}</td>
                        <td>{leave?.reason}</td>
                        <td>{capitalizeWords(leave?.status) || "----"}</td>
                        <td>{capitalizeWords(leave?.leaveType) || "----"}</td>
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
                                <DialogTitle>Leave Details</DialogTitle>
                                <DialogDescription className="text-gray-500 text-sm">
                                  Information for Leave.
                                </DialogDescription>
                                <DialogDescription>
                                  <div className="grid grid-cols-1 gap-6">
                                    {/* Leave Information Section */}
                                    <div className="p-4">
                                      <div className="w-full mb-6">
                                        <h2 className="text-base text-black font-medium mb-2">
                                          Leave Information
                                        </h2>
                                        <div className="h-[2px] bg-gray-200">
                                          <div className="h-[2px] bg-primary w-[210px]"></div>
                                        </div>
                                      </div>
                                      <div className="space-y-4">
                                        <p className="text-gray-700">
                                          <span className="font-medium mr-1">
                                            Employee Name:
                                          </span>
                                          {leave?.employee?.nameEn}
                                        </p>
                                        <p className="text-gray-700">
                                          <span className="font-medium mr-1">
                                            From Date:
                                          </span>
                                          {leave?.fromDate}
                                        </p>
                                        <p className="text-gray-700">
                                          <span className="font-medium mr-1">
                                            To Date:
                                          </span>
                                          {leave?.toDate}
                                        </p>
                                        <p className="text-gray-700">
                                          <span className="font-medium mr-1">
                                            Reason:
                                          </span>
                                          {leave?.reason}
                                        </p>
                                        <p className="text-gray-700">
                                          <span className="font-medium mr-1">
                                            Status:
                                          </span>
                                          {capitalizeWords(leave?.status) ||
                                            "----"}
                                        </p>
                                        <p className="text-gray-700">
                                          <span className="font-medium mr-1">
                                            Leave Type:
                                          </span>
                                          {capitalizeWords(leave?.leaveType) ||
                                            "----"}
                                        </p>
                                        <p className="text-gray-700">
                                          <span className="font-medium mr-1">
                                            Remarks:
                                          </span>
                                          {leave?.remarks || "----"}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4"></div>
                              <DialogFooter></DialogFooter>
                            </DialogContent>
                          </Dialog>
                          {/* Edit Button */}
                          <Link
                            to={`/hr/edit-leave/${leave?.id}`}
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
                                  This action cannot be undone.Because, This
                                  will permanently delete your data.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="btn-primary bg-gray-200 text-black hover:text-black hover:bg-gray-300">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(leave?.id)}
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
        )}
      </div>
    </div>
  );
};

export default LeaveManagementPage;
