/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
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
import { IoInformation } from "react-icons/io5";
import SectionHeader from "@/components/ui/section-header";
import Pagination from "@/utility/Pagination";
import axios from "@/config/axiosConfig";
import PlaceHolder from "@/utility/PlaceHolder";
import useLoadingStore from "@/store/loadingStore";
import { buildQueryParams } from "@/utility/buildQueryParams";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
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
import { BiPlus } from "react-icons/bi";

const ViewAgentsPage = () => {
  const [agents, setAgents] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const { setLoading } = useLoadingStore();
  const [queryParams, setQueryParams] = useState({
    page: 0,
    size: 10,
    nameEn:""
  });
  useEffect(() => {
    getAllAgents();
  }, [queryParams]);

  // get all agents
  const getAllAgents = async () => {
    setLoading(true);
    try {
      const queryData = buildQueryParams(queryParams);
      const res = await axios.get(`/agents?${queryData}`);
      setAgents(res?.data?.agents);
      setTotalPages(res?.data?.totalPages);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  // function por pagination
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
      await axios.delete(`/agents/${id}`);
      toast.success("Agent Deleted Successfully");
      getAllAgents()
    } catch (error) {
      console.log(error)
      toast.error("Delete Process Failed")
    } finally {
      setLoading(false);
    }
  };
  const handleSearchSubmit =(e) => {
    e.preventDefault()
    const searchTerm = e.target.search.value 
    setQueryParams({...queryParams , nameEn : searchTerm})
  }

  return (
    <div className="mb-8 ">
      <div>
        <SectionHeader title={"View agents"} />
      </div>
      <div className="wrapper">
      <div className="w-full mb-6">
          <div className="flex justify-between items-end gap-3 flex-wrap">
            <h2 className="text-base flex justify-between  flex-col font-medium mb-2">
              All Agents List
            </h2>

            <Link
              to="/agent/create-agent"
              type="button"
              className="btn-primary mb-3 text-[14px]"
            >
              <BiPlus className="mr-2 text-lg" />
              New Agent
            </Link>
          </div>
          <div className="h-[2px] bg-gray-200">
            <div className="h-[2px] bg-primary w-[120px]"></div>
          </div>
        </div>
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

        {/* Responsive Table Wrapper */}
        <div>
          <div className="table-responsive">
            <table className="table min-w-full">
              <thead>
                <tr className="text-left text-gray-800 border-b">
                  <th className="py-2">agent Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Phone Number</th>
                  <th>Email ID</th>
                  <th>Commission(%)</th>
                  <th>User Action</th>
                </tr>
              </thead>
              <tbody>
                {agents.length > 0 ? (
                  agents.map((agent, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="py-4 flex items-center">
                        <img
                          src={
                            agent?.photo ||
                            "https://c8.alamy.com/comp/2WK9M86/man-profile-illustration-internet-call-avatar-2WK9M86.jpg"
                          }
                          alt={agent.nameEn}
                          className="w-8 h-8 rounded-full mr-3"
                        />
                        <span>{agent?.nameEn}</span>
                      </td>
                      <td>
                        {new Date().getFullYear() -
                          new Date(agent?.user?.dateOfBirth).getFullYear() ||
                          "----"}
                      </td>
                      <td>{agent?.gender || "----"}</td>
                      <td>{agent?.phone || "----"}</td>
                      <td>{agent?.user?.email || "----"}</td>
                      <td>{agent?.commissionPercentage || "----"}</td>
                      <td className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="btn-outline">
                              <IoInformation size={18} />
                            </button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Agent Details</DialogTitle>
                              <DialogDescription>
                                Here are some individual patient data
                              </DialogDescription>
                            </DialogHeader>
                            <DialogDescription>
                              <div className="grid grid-cols-1 p-4  gap-4">
                                {/* Personal Information Card */}
                                <div className="">
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
                                      {agent?.nameEn || "----"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Phone:
                                      </span>
                                      {agent?.phone || "----"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Email:
                                      </span>
                                      {agent?.user?.email || "----"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        District:
                                      </span>
                                      {agent?.district?.name || "----"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Upazila:
                                      </span>
                                      {agent?.upazila?.name || "----"}
                                    </p>
                                  </div>
                                </div>

                                {/* Professional Information Card */}
                                <div className="">
                                  <div className="w-full  mb-6">
                                    <h2 className="text-base text-black font-medium mr-1 mb-2">
                                      Professional Information
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
                                        Years of Experience:
                                      </span>
                                      {agent?.yearsOfExperience || "----"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Bank Account:
                                      </span>
                                      {agent?.bankAccount || "----"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Bkash Account:
                                      </span>
                                      {agent?.bkashAccount || "----"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Nagad Account:
                                      </span>
                                      {agent?.nagadAccount || "----"}
                                    </p>
                                  </div>
                                </div>

                                {/* Financial Information Card */}
                                <div className="">
                                  <div className="w-full mt-6 mb-6">
                                    <h2 className="text-base text-black font-medium mb-2">
                                      Financial Information
                                    </h2>
                                    <div className={`h-[2px] bg-gray-200`}>
                                      <div
                                        className={`h-[2px] bg-primary w-[210px]`}
                                      ></div>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Initial Balance:
                                      </span>
                                      {agent?.initialBalance || "----"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Commission Percentage:
                                      </span>
                                      {agent?.commissionPercentage || "----"}
                                    </p>
                                  </div>
                                </div>

                                {/* Account Status Card */}
                                <div className="">
                                  <div className="w-full mt-6 mb-6">
                                    <h2 className="text-base text-black font-medium mr-1 mb-2">
                                      Account Status
                                    </h2>
                                    <div className={`h-[2px] bg-gray-200`}>
                                      <div
                                        className={`h-[2px] bg-primary w-[210px]`}
                                      ></div>
                                    </div>
                                  </div>
                                  <p className="text-gray-600">
                                    <span className="font-medium mr-1">
                                      Account Active:
                                    </span>
                                    ----
                                  </p>
                                </div>
                              </div>
                            </DialogDescription>
                            <DialogFooter>
                              {/* <button type="button" className="btn-primary">
                              Close
                            </button> */}
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        {/* Edit Button */}
                        <Link
                          to={`/agent/edit-agent/${agent?.id}`}
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
                                This action cannot be undone. This will
                                permanently delete your data.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="btn-primary bg-gray-200 text-black hover:text-black hover:bg-gray-300">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(agent?.id)}
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

export default ViewAgentsPage;