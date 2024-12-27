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
import { TbUserPlus } from "react-icons/tb";
import useLoadingStore from "@/store/loadingStore";
import axios from "@/config/axiosConfig";
import Pagination from "@/utility/Pagination";
import PlaceHolder from "@/utility/PlaceHolder";
import { AiOutlineLeft } from "react-icons/ai";
import { buildQueryParams } from "@/utility/buildQueryParams";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import {
  BloodGroupOptions,
  DepartmentOptions,
  DesignationOptions,
  GenderOptions,
} from "@/utility/SelectOptions";
import toast from "react-hot-toast";

// initial State For Form Data
const initialState = {
  nameBn: "",
  nameEn: "",
  designation: {
    id: "",
  },
  department: {
    id: "",
  },
  dateOfBirth: "",
  nid: "",
  phone: "",
  email: "",
  gender: "",
  bloodGroup: "",
  address: "",
  joiningDate: "",
  salary: "",
};
const EmployeeManagementPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [employees, setEmployees] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const { setLoading } = useLoadingStore();
  const [queryParams, setQueryParams] = useState({
    page: 0,
    size: 10,
    nameEn:""
  });
  // useEffect
  useEffect(() => {
    getAllEmployees();
  }, [queryParams]);

  // function tol fetch employee data
  const getAllEmployees = async () => {
    setLoading(true);
    try {
      const queryData = buildQueryParams(queryParams);
      const res = await axios.get(`/employees?${queryData}`);
      setEmployees(res?.data?.employees);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/employees", formData);
      toast.success("Employee Created Successfully");
      // clearing current data
      setFormData({ ...initialState });
    } catch (error) {
      toast.error(error.message || "something wrong");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  // handleDelete
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/employees/${id}`);
      toast.success("Employee Deleted Successfully");
      getAllEmployees()
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // search
  const handleSearchSubmit =(e) => {
    e.preventDefault()
    const searchTerm = e.target.search.value 
    setQueryParams({...queryParams , nameEn : searchTerm})
  }
  
  return (
    <div className="mb-8 ">
      <div>
        <SectionHeader title={"Employee Management"} />
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
              {showForm ? "New Employee" : "Employee List"}
            </h2>
            {!showForm && (
              <button
                type="button"
                onClick={() => setShowForm(!showForm)}
                className="btn-primary mb-3 text-[14px]"
              >
                <BiPlus className="mr-2 text-lg" />
                New Employee
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
              {/* Name (Bangla) */}
              <div>
                <label className="form-label">Name (Bangla)</label>
                <input
                  required
                  type="text"
                  name="nameBn"
                  value={formData.nameBn}
                  onChange={(e) => {
                    setFormData({ ...formData, nameBn: e.target.value });
                  }}
                  className="form-input"
                  placeholder="Enter name in Bangla"
                />
              </div>

              {/* Name (English) */}
              <div>
                <label className="form-label">Name (English)</label>
                <input
                  required
                  type="text"
                  name="nameEn"
                  value={formData.nameEn}
                  onChange={(e) => {
                    setFormData({ ...formData, nameEn: e.target.value });
                  }}
                  className="form-input"
                  placeholder="Enter name in English"
                />
              </div>

              {/* Designation */}
              <div>
                <label className="form-label">Designation</label>
                <select
                  required
                  name="designation"
                  value={formData.designation.id}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      designation: { id: e.target.value },
                    });
                  }}
                  className="form-input"
                >
                  <option value="" disabled selected>
                    Choose
                  </option>
                  <DesignationOptions />
                </select>
              </div>

              {/* Department */}
              <div>
                <label className="form-label">Department</label>
                <select
                  required
                  name="department"
                  value={formData.department.id}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      department: { id: e.target.value },
                    });
                  }}
                  className="form-input"
                >
                  <option value="" disabled selected>
                    Choose
                  </option>
                  <DepartmentOptions />
                </select>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="form-label">Date of Birth</label>
                <input
                  required
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={(e) => {
                    setFormData({ ...formData, dateOfBirth: e.target.value });
                  }}
                  className="form-input"
                />
              </div>

              {/* NID */}
              <div>
                <label className="form-label">NID</label>
                <input
                  required
                  type="text"
                  name="nid"
                  value={formData.nid}
                  onChange={(e) => {
                    setFormData({ ...formData, nid: e.target.value });
                  }}
                  className="form-input"
                  placeholder="Enter NID"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="form-label">Phone</label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                  }}
                  placeholder="Enter Phone Number"
                  className="form-input"
                />
              </div>

              {/* Email */}
              <div>
                <label className="form-label">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  placeholder="Enter Email"
                  className="form-input"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="form-label">Gender</label>
                <select
                  required
                  name="gender"
                  value={formData.gender}
                  onChange={(e) => {
                    setFormData({ ...formData, gender: e.target.value });
                  }}
                  className="form-input"
                >
                  <option value="" disabled selected>
                    Choose
                  </option>
                  <GenderOptions />
                </select>
              </div>

              {/* Blood Group */}
              <div>
                <label className="form-label">Blood Group</label>
                <select
                  required
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={(e) => {
                    setFormData({ ...formData, bloodGroup: e.target.value });
                  }}
                  className="form-input"
                >
                  <option value="" disabled selected>
                    Choose
                  </option>
                  <BloodGroupOptions />
                </select>
              </div>

              {/* Address */}
              <div>
                <label className="form-label">Address</label>
                <input
                  required
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={(e) => {
                    setFormData({ ...formData, address: e.target.value });
                  }}
                  className="form-input"
                  placeholder="Enter address"
                />
              </div>

              {/* Joining Date */}
              <div>
                <label className="form-label">Joining Date</label>
                <input
                  required
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={(e) => {
                    setFormData({ ...formData, joiningDate: e.target.value });
                  }}
                  className="form-input"
                />
              </div>

              {/* Salary */}
              <div>
                <label className="form-label">Salary</label>
                <input
                  required
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={(e) => {
                    setFormData({ ...formData, salary: e.target.value });
                  }}
                  className="form-input"
                  placeholder="Enter salary"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button type="submit" className="btn-primary">
                <TbUserPlus className="mr-2 text-lg" />
                Create New Employee
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="flex mb-5 md:space-x-6 md:space-y-0 space-y-3 flex-wrap">
              {/* Search Input */}
          <form onSubmit={handleSearchSubmit}>
            <div className="flex py-2 items-center  space-x-2 bg-[#EBF5FF] px-4  rounded-full flex-shrink-0 w-full sm:w-auto mb-5 sm:mb-0">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                name="search"
                placeholder="Search"
                className="bg-transparent outline-none text-gray-600 w-full"
              />
            </div>
          </form>
            </div>
            <div className="table-responsive">
              <table className="table min-w-full">
                <thead>
                  <tr className="text-left text-gray-800 border-b">
                    <th className="py-2">Employee Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Blood Group</th>
                    <th>Phone Number</th>
                    <th>Email ID</th>
                    <th>User Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.length > 0 ? (
                    employees?.map((employee) => (
                      <tr
                        key={employee.id}
                        className="border-b hover:bg-gray-100"
                      >
                        <td className="py-4 flex items-center">
                          <img
                            src={employee?.photo}
                            alt="Profile"
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <span>{employee?.nameEn}</span>
                        </td>
                        <td>
                          {new Date().getFullYear() -
                            new Date(employee?.dateOfBirth).getFullYear()}
                        </td>
                        <td>
                          {employee?.gender === "MALE"
                            ? "Male"
                            : "Female" || "N/A"}
                        </td>
                        <td>{employee?.bloodGroup || "N/A"}</td>
                        <td>{employee?.phone || "N/A"}</td>
                        <td>{employee?.email || "N/A"}</td>
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
                                <DialogTitle>Employee Details</DialogTitle>
                                <DialogDescription>
                                  Here are the detailed information for the
                                  selected employee.
                                </DialogDescription>
                              </DialogHeader>

                              <div className="grid grid-cols-1 gap-4">
                                {/* Personal Information Card */}
                                <div className="wrapper shadow-none p-4">
                                  <div className="w-full mb-6">
                                    <h2 className="text-base font-medium mb-2">
                                      Personal Information
                                    </h2>
                                    <div className="h-[2px] bg-gray-200">
                                      <div className="h-[2px] bg-primary w-[210px]"></div>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Name:
                                      </span>{" "}
                                      {employee?.nameEn || "N/A"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Phone:
                                      </span>{" "}
                                      {employee?.nid || "N/A"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Email:
                                      </span>{" "}
                                      {employee?.user?.email || "N/A"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Gender:
                                      </span>{" "}
                                      {employee?.gender === "MALE"
                                        ? "Male"
                                        : "Female"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Blood Group:
                                      </span>{" "}
                                      {employee?.bloodGroup || "N/A"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Date of Birth:
                                      </span>{" "}
                                      {new Date(
                                        employee?.dateOfBirth
                                      ).toLocaleDateString() || "N/A"}
                                    </p>
                                  </div>
                                </div>

                                {/* Professional Information Card */}
                                <div className="shadow-none p-4">
                                  <div className="w-full mb-6">
                                    <h2 className="text-base font-medium mr-1 mb-2">
                                      Professional Information
                                    </h2>
                                    <div className="h-[2px] bg-gray-200">
                                      <div className="h-[2px] bg-primary w-[210px]"></div>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Joining Date:
                                      </span>{" "}
                                      {new Date(
                                        employee?.joiningDate
                                      ).toLocaleDateString() || "N/A"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Designation:
                                      </span>{" "}
                                      {employee?.designation?.nameEn || "N/A"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Department:
                                      </span>{" "}
                                      {employee?.department?.nameEn || "N/A"}
                                    </p>

                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Created By:
                                      </span>{" "}
                                      {employee?.createdBy || "N/A"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Updated By:
                                      </span>{" "}
                                      {employee?.updatedBy || "N/A"}
                                    </p>
                                  </div>
                                </div>

                                {/* Financial Information Card */}
                                <div className="shadow-none p-4">
                                  <div className="w-full mt-6 mb-6">
                                    <h2 className="text-base font-medium mb-2">
                                      Financial Information
                                    </h2>
                                    <div className="h-[2px] bg-gray-200">
                                      <div className="h-[2px] bg-primary w-[210px]"></div>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Salary:
                                      </span>{" "}
                                      {employee?.salary || "N/A"}
                                    </p>
                                  </div>
                                </div>

                                {/* Account Status Card */}
                                <div className="shadow-none p-4">
                                  <div className="w-full mt-6 mb-6">
                                    <h2 className="text-base font-medium mr-1 mb-2">
                                      Account Status
                                    </h2>
                                    <div className="h-[2px] bg-gray-200">
                                      <div className="h-[2px] bg-primary w-[210px]"></div>
                                    </div>
                                  </div>
                                  <p className="text-gray-600">
                                    <span className="font-medium mr-1">
                                      Account Active:
                                    </span>{" "}
                                    {employee?.accountActive ? "Yes" : "No"}
                                  </p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          {/* Edit Button */}
                          <Link
                            to={`/hr/edit-employee/${employee?.id}`}
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
                                  onClick={() => handleDelete(employee?.id)}
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
      {/* Pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={queryParams.page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default EmployeeManagementPage;
