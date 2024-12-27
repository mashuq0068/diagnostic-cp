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

import { IoInformation, IoReturnUpBackSharp } from "react-icons/io5";
import SectionHeader from "@/components/ui/section-header";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { TbUserPlus } from "react-icons/tb";

const PerformanceTrackingPage = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="mb-8 ">
      <div>
        <SectionHeader title={"Performance Tracking"} />
      </div>

      <div className="wrapper">
        <div className="w-full mb-6">
          <div className="flex justify-between items-end gap-3 flex-wrap">
            <h2 className="text-base font-medium mb-2">
              {showForm ? "New Performance" : "Performance List"}
            </h2>
            <button
              type="button"
              onClick={() => setShowForm(!showForm)}
              className="btn-primary mb-3 text-[14px]"
            >
              {showForm ? (
                <IoReturnUpBackSharp className="mr-2 text-lg" />
              ) : (
                <BiPlus className="mr-2 text-lg" />
              )}
              {showForm ? "Back to List" : "New Performance"}
            </button>
          </div>
          <div className="h-[2px] bg-gray-200">
            <div className="h-[2px] bg-primary w-[120px]"></div>
          </div>
        </div>

        {showForm ? (
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Employee Dropdown */}
              <div>
                <label className="form-label">Employee</label>
                <select name="employee_id" className="form-input">
                  <option value="">Choose</option>
                  <option value="1">Employee 1</option>
                  <option value="2">Employee 2</option>
                  <option value="3">Employee 3</option>
                  {/* Add more options dynamically */}
                </select>
              </div>

              {/* Salary */}
              <div>
                <label className="form-label">Salary</label>
                <input
                  type="text"
                  name="salary"
                  className="form-input"
                  placeholder="Enter total salary"
                  step="0.01"
                />
              </div>

              {/* Basic Salary */}
              <div>
                <label className="form-label">Basic Salary</label>
                <input
                  type="text"
                  name="basic_salary"
                  className="form-input"
                  placeholder="Enter basic salary"
                  step="0.01"
                />
              </div>

              {/* Bonus */}
              <div>
                <label className="form-label">Bonus</label>
                <input
                  type="text"
                  name="bonus"
                  className="form-input"
                  placeholder="Enter bonus"
                  step="0.01"
                />
              </div>

              {/* Deductions */}
              <div>
                <label className="form-label">Deductions</label>
                <input
                  type="text"
                  name="deductions"
                  className="form-input"
                  placeholder="Enter deductions"
                  step="0.01"
                />
              </div>

              {/* Net Salary */}
              <div>
                <label className="form-label">Net Salary</label>
                <input
                  type="text"
                  name="net_salary"
                  className="form-input"
                  placeholder="Net Salary will be calculated"
                  disabled
                />
              </div>

              {/* Payment Date */}
              <div>
                <label className="form-label">Payment Date</label>
                <input type="date" name="payment_date" className="form-input" />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button type="submit" className="btn-primary">
                <TbUserPlus className="mr-2 text-lg" />
                Create New Performance
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
                    <th>task</th>
                    <th>Task completed</th>
                    <th>Task remined</th>
                    <th>Net Salary</th>
                    <th>Payment Date</th>
                    <th>User Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array(6)
                    .fill("")
                    .map((_, index) => (
                      <tr key={index} className="border-b hover:bg-gray-100">
                        <td className="py-4 flex items-center">
                          <img
                            src="https://c8.alamy.com/comp/2WK9M86/man-profile-illustration-internet-call-avatar-2WK9M86.jpg"
                            alt="Employee Avatar"
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <span>code prophet</span>
                        </td>
                        <td>1000</td>
                        <td>7,893</td>
                        <td>3000</td>
                        <td>12000</td>
                        <td>16 May, 2024</td>
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
                          {/* Edit Button */}
                          <button className="btn-outline border border-green-500 rounded-lg text-black hover:text-white hover:bg-green-500 transition duration-300">
                            <CiEdit size={18} />
                          </button>

                          {/* Delete Button */}
                          <button className="btn-outline border border-red-400 rounded-lg text-red-400 hover:text-white hover:bg-red-400 transition duration-300">
                            <RiDeleteBinLine size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PerformanceTrackingPage;
