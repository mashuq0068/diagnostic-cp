/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
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
import Pagination from "@/utility/Pagination";
import axios from "@/config/axiosConfig";
import PlaceHolder from "@/utility/PlaceHolder";
import useLoadingStore from "@/store/loadingStore";
import { buildQueryParams } from "@/utility/buildQueryParams";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link} from "react-router-dom";
import toast from "react-hot-toast";
import { BiPlus } from "react-icons/bi";

const ViewPatientPage = () => {
  const [patients, setPatients] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  console.log(patients);
  const { setLoading } = useLoadingStore();
  const [queryParams, setQueryParams] = useState({
    page: 0,
    size: 10,
    fullName : ""
  });
  useEffect(() => {
    getAllPatients();
  }, [queryParams]);

  // get all patients
  const getAllPatients = async () => {
    setLoading(true);
    try {
      const queryData = buildQueryParams(queryParams);
      const res = await axios.get(`/patients?${queryData}`);
      setPatients(res?.data?.patients);
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
  // handleDelete
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/patients?${id}`);
      toast.success("Patient Deleted Successfully");
      getAllPatients()
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit =(e) => {
    e.preventDefault()
    const searchTerm = e.target.search.value 
    setQueryParams({...queryParams , fullName: searchTerm})
  }
  return (
    <div className="mb-8 ">
      <div>
        <SectionHeader title={"View patients"} />
      </div>
      <div className="wrapper">
      <div className="w-full mb-6">
          <div className="flex justify-between items-end gap-3 flex-wrap">
            <h2 className="text-base flex justify-between  flex-col font-medium mb-2">
              All Patients List
            </h2>

            <Link
              to="/patient/create-patient"
              type="button"
              className="btn-primary mb-3 text-[14px]"
            >
              <BiPlus className="mr-2 text-lg" />
              New Patient
            </Link>
          </div>
          <div className="h-[2px] bg-gray-200">
            <div className="h-[2px] bg-primary w-[120px]"></div>
          </div>
        </div>
        <div className="flex mb-5 md:space-x-6 md:space-y-0 space-y-3 flex-wrap">
          {/* Search Input */}
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

        {/* Responsive Table Wrapper */}
        <div>
          <div className="table-responsive">
            <table className="table min-w-full">
              <thead>
                <tr className="text-left text-gray-800 border-b">
                  <th className="py-2">patient Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                  <th>Email ID</th>
                  <th>User Action</th>
                </tr>
              </thead>
              <tbody>
                {patients.length > 0 ? (
                  patients.map((patient, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="py-4 flex items-center">
                        <span>{patient?.fullName || "----"}</span>
                      </td>
                      <td>
                        {new Date().getFullYear() -
                          new Date(patient?.user?.dateOfBirth).getFullYear() ||
                          "----"}
                      </td>
                      <td>{patient?.gender || "----"}</td>
                      <td>{patient?.address || "----"}</td>
                      <td>{patient?.phone || "----"}</td>
                      <td>{patient?.email || "----"}</td>
                      <td className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="btn-outline">
                              <IoInformation size={18} />
                            </button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Patient Details</DialogTitle>
                              <DialogDescription>
                                Here are some individual patient data
                              </DialogDescription>
                            </DialogHeader>
                            <DialogDescription>
                              <div className="grid grid-cols-1 gap-4">
                                {/* Personal Information Section */}
                                <div className="p-4">
                                  <div className="w-full mb-6">
                                    <h2 className="text-base text-black font-medium mb-2">
                                      Personal Information
                                    </h2>
                                    <div className={`h-[2px] bg-gray-200`}>
                                      <div
                                        className={`h-[2px] bg-primary w-[210px]`}
                                      ></div>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Name:
                                      </span>
                                      {patient?.fullName || "----"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Date of Birth:
                                      </span>
                                      {patient?.dateOfBirth || "----"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Gender:
                                      </span>
                                      {patient?.gender || "----"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Address:
                                      </span>
                                      {patient?.address || "----"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Phone:
                                      </span>
                                      {patient?.phone || "----"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Email:
                                      </span>
                                      {patient?.email || "----"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        District:
                                      </span>
                                      {patient?.districtId?.nameEn || "----"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Upazila:
                                      </span>
                                      {patient?.upazilaId?.nameEn || "----"}
                                    </p>

                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Emergency Contact:
                                      </span>
                                      {patient?.emergencyContact || "----"}
                                    </p>
                                  </div>
                                </div>

                                {/* Medical Information Section */}
                                <div className="p-4">
                                  <div className="w-full mb-6">
                                    <h2 className="text-base text-black font-medium mb-2">
                                      Medical Information
                                    </h2>
                                    <div className={`h-[2px] bg-gray-200`}>
                                      <div
                                        className={`h-[2px] bg-primary w-[210px]`}
                                      ></div>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Blood Group:
                                      </span>
                                      {patient?.bloodGroup || "----"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Height:
                                      </span>
                                      {patient?.height
                                        ? `${patient.height} cm`
                                        : "----"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Weight:
                                      </span>
                                      {patient?.weight
                                        ? `${patient.weight} kg`
                                        : "----"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Diabetic Status:
                                      </span>
                                      {patient?.isDiabetic ? "Yes" : "No"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Medical History:
                                      </span>
                                      {patient?.medicalHistory || "----"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </DialogDescription>
                            {/* <DialogFooter>
                            <button type="button" className="btn-primary">
                              Close
                            </button>
                          </DialogFooter> */}
                          </DialogContent>
                        </Dialog>
                        {/* Edit Button */}
                        <Link to={`/patient/edit-patient/${patient?.id}`} className="btn-outline border border-green-500 rounded-lg text-black hover:text-white hover:bg-green-500 transition duration-300">
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
                                This action cannot be undone. This will
                                permanently delete your data.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="btn-primary bg-gray-200 text-black hover:text-black hover:bg-gray-300">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(patient?.id)}
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

export default ViewPatientPage;
