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
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { TbUserPlus } from "react-icons/tb";
import { AiOutlineLeft } from "react-icons/ai";
import useLoadingStore from "@/store/loadingStore";
import axios from "@/config/axiosConfig";
import Select from "react-select";
import customStyles from "@/utility/react-select-styles";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import PlaceHolder from "@/utility/PlaceHolder";

const initialPayrollState = {
  employeeId: null,
  salaryType: null,
  salary: null,
  paymentDate: null,
};
const PayrollManagementPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialPayrollState);
  const [payrollList, setPayrollList] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState();
  const { setLoading } = useLoadingStore();
  useEffect(() => {
    getAllEmployees();
    getAllPayrolls();
  }, []);
  // get all employees
  const getAllEmployees = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/employees`);
      setEmployeeOptions(
        res?.data?.employees?.map((employee) => ({
          value: employee.id,
          label: employee.nameEn,
        }))
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  // Get all payrolls
  const getAllPayrolls = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/payroll`);
      console.log(res);
      setPayrollList(res?.data);
    } catch (error) {
      toast.error("Failed to fetch payrolls:", error);
    } finally {
      setLoading(false);
    }
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/payroll", formData);
      toast.success("Payroll created successfully");
      setFormData(initialPayrollState);
      setShowForm(false);
      getAllPayrolls();
      setShowForm(false); // Close form after submission
    } catch (error) {
      toast.error(error?.message || "Failed to create payroll");
    } finally {
      setLoading(false);
    }
  };

  // delete payroll
  // handleDelete
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/payroll/${id}`);
      toast.success("Payroll Deleted Successfully");
      getAllPayrolls();
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
      getAllPayrolls();
    }
    const filtered = payrollList.filter((payroll) =>
      payroll?.employee?.nameEn.toLowerCase().includes(searchTerm)
    );
    setPayrollList(filtered);
  };
  return (
    <div className="mb-8 ">
      <div>
        <SectionHeader title={"Payroll Management"} />
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
              {showForm ? "New Payroll" : "Payroll List"}
            </h2>
            {!showForm && (
              <button
                type="button"
                onClick={() => setShowForm(!showForm)}
                className="btn-primary mb-3 text-[14px]"
              >
                <BiPlus className="mr-2 text-lg" />
                New Payroll
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
                <Select
                  options={employeeOptions}
                  styles={customStyles}
                  className="react-select-container rounded-lg"
                  classNamePrefix="react-select"
                  placeholder="Choose Employee"
                  onChange={(selectedOption) =>
                    setFormData((prev) => ({
                      ...prev,
                      employeeId: selectedOption?.value || "",
                    }))
                  }
                />
              </div>

              {/* Salary Type Dropdown */}
              <div>
                <label className="form-label">Salary Type</label>
                <select
                  name="salaryType"
                  className="form-input"
                  value={formData.salaryType}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      salaryType: e.target.value,
                    }))
                  }
                >
                  <option value="" disabled selected>
                    Choose Salary Type
                  </option>
                  <option value="BASIC_SALARY">Basic Salary</option>
                  <option value="BONUS">Bonus</option>
                  <option value="DEDUCTIONS">Deductions</option>
                </select>
              </div>

              {/* Payment Amount */}
              <div>
                <label className="form-label">Payment Amount</label>
                <input
                  type="number"
                  name="paymentAmount"
                  placeholder="Enter Payment Amount"
                  className="form-input"
                  value={formData.paymentAmount}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      salary: Number(e.target.value),
                    }))
                  }
                />
              </div>

              {/* Payment Date */}
              <div>
                <label className="form-label">Payment Date</label>
                <input
                  type="date"
                  name="paymentDate"
                  className="form-input"
                  value={formData.paymentDate}
                  // onChange={(e) =>
                  //   setFormData((prev) => ({
                  //     ...prev,
                  //     paymentDate: e.target.value,
                  //   }))
                  // }
                />
              </div>
              {/* Remarks */}
              <div>
                <label className="form-label">Remarks</label>
                <textarea
                  name="remarks"
                  className="form-input"
                  value={formData.remarks}
                  // onChange={(e) =>
                  //   setFormData((prev) => ({
                  //     ...prev,
                  //     remarks: e.target.value,
                  //   }))
                  // }
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button type="submit" className="btn-primary">
                <TbUserPlus className="mr-2 text-lg" />
                Create New Payroll
              </button>
            </div>
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
                  className="bg-transparent outline-none text-gray-600 w-full"
                />
              </div>
            </div>
            <div className="table-responsive">
              <table className="table min-w-full">
                <thead>
                  <tr className="text-left text-gray-800 border-b">
                    <th className="py-2">Employee Name</th>
                    <th>Salary(TK)</th>
                    <th>Basic Salary</th>
                    <th>Deductions</th>

                    <th>Payment Date</th>
                    <th>User Action</th>
                  </tr>
                </thead>
                <tbody>
                  {payrollList?.length > 0 ? (
                    payrollList?.map((payroll, index) => (
                      <tr key={index} className="border-b hover:bg-gray-100">
                        <td className="py-4 flex items-center">
                          <span>{payroll?.employee?.nameEn}</span>
                        </td>
                        <td>{payroll?.salary}</td>
                        <td>{payroll?.basicSalary || 0}</td>
                        <td>{payroll?.deductions || 0}</td>

                        <td>{payrollList?.paymentDate || "----"}</td>
                        <td className="flex space-x-2">
                          {/* View Details Button */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <button className="btn-outline">
                                <IoInformation size={18} />
                              </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px] bg-white rounded-lg shadow-lg p-6">
                              <DialogHeader>
                                <DialogTitle className="text-xl font-semibold text-gray-800">
                                  Payroll Details
                                </DialogTitle>
                                <DialogDescription className="text-gray-500 text-sm">
                                  Information for Payroll.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogDescription>
                                <div className="grid grid-cols-1 gap-6">
                                  {/* Transaction Information Section */}
                                  <div className="p-4">
                                    <div className="w-full mb-6">
                                      <h2 className="text-base text-black font-medium mb-2">
                                        Payroll Information
                                      </h2>
                                      <div className="h-[2px] bg-gray-200">
                                        <div className="h-[2px] bg-primary w-[210px]"></div>
                                      </div>
                                    </div>
                                    <div className="space-y-4">
                                      <p className="text-gray-600">
                                        <span className="font-medium mr-1">
                                          Employee Name:
                                        </span>
                                        {payroll?.employee?.nameEn}
                                      </p>
                                      <p className="text-gray-600">
                                        <span className="font-medium mr-1">
                                          Salary:
                                        </span>
                                        {payroll?.salary || 0}
                                      </p>
                                      <p className="text-gray-600">
                                        <span className="font-medium mr-1">
                                          Basic Salary:
                                        </span>
                                        {payroll?.basicSalary || 0}
                                      </p>
                                      <p className="text-gray-600">
                                        <span className="font-medium mr-1">
                                          Deductions:
                                        </span>
                                        {payroll?.deductions || 0}
                                      </p>
                                      <p className="text-gray-600">
                                        <span className="font-medium mr-1">
                                          paymentDate:
                                        </span>
                                        {payroll?.paymentDate || "---"}
                                      </p>
                                      <p className="text-gray-600">
                                        <span className="font-medium mr-1">
                                          Remarks:
                                        </span>
                                        {payroll?.remarks || "---"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </DialogDescription>
                            </DialogContent>
                          </Dialog>
                          {/* Edit Button */}

                          <Link
                            to={`/hr/edit-payroll/${payroll?.id}`}
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
                                  onClick={() => handleDelete(payroll?.id)}
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

export default PayrollManagementPage;
