/* eslint-disable react/no-unescaped-entities */
import { FaSearch } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
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
import { MdContentCut } from "react-icons/md";
import SectionHeader from "@/components/ui/section-header";
import { BiCoin, BiPlus } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "@/config/axiosConfig";
import Pagination from "@/utility/Pagination";
import PlaceHolder from "@/utility/PlaceHolder";
import useLoadingStore from "@/store/loadingStore";
import { buildQueryParams } from "@/utility/buildQueryParams";
import { AiOutlineLeft } from "react-icons/ai";
import { TbUserPlus } from "react-icons/tb";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { DepartmentOptions } from "@/utility/SelectOptions";
const filterPriceRanges = [
  {
    id: 1,
    name: "1000-2000",
  },
  {
    id: 2,
    name: "2000-3000",
  },
  {
    id: 3,
    name: "3000-5000",
  },
];

const initialTestState = {
  nameEn: "",
  nameBn: "",
  price: "",
  department: {
    id: "",
  },
  associatedEquipment: "",
  descriptionEn: "",
  descriptionBn: "",
};
const initialDepartmentState = {
  nameBn: null,
  nameEn: null,
  headName: null,
  phone: null,
  location: null,
  code: null,
  parentId:null,
  createdBy: "system",
  updatedBy: "system",
};

const ViewTestsPage = () => {
  const [currentPriceRange, setCurrentPriceRange] = useState("");
  const [showCreateTest, setShowCreateTest] = useState(false);
  const [showCreateDepartment, setShowCreateDepartment] = useState(false);
  const [tests, setTests] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const { setLoading } = useLoadingStore();
  const [testFormData, setTestFormData] = useState(initialTestState);
  const [departmentFormData, setDepartmentFormData] = useState(
    initialDepartmentState
  );
  const [queryParams, setQueryParams] = useState({
    page: 0,
    size: 10,
    department_id: "",
    nameEn: "",
  });
  useEffect(() => {
    getAllTests();
    getDepartments();
  }, [queryParams]);

  // function to fetch test data
  const getAllTests = async () => {
    setLoading(true);
    try {
      const queryData = buildQueryParams(queryParams);
      const res = await axios.get(`/tests?${queryData}`);
      setTests(res?.data?.tests);
      setTotalPages(res?.data?.totalPages);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  // Function to fetch department data
  const getDepartments = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/departments?size=200");
      setDepartments(res?.data?.departments);
    } catch (error) {
      console.error(error);
      setLoading(false);
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

  // handle department change
  const handleDepartmentChange = (id) => {
    setQueryParams((prev) => ({
      ...prev,
      department_id: id,
    }));
  };

  const handlePriceRange = (priceRange) => {
    setCurrentPriceRange(priceRange);
  };
  // handle back button
  const handleBackButton = () => {
    setShowCreateTest(false);
    setShowCreateDepartment(false);
  };
  // handle submit
  const handleTestSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/tests", testFormData);
      toast.success("Test Created Successfully");
      // clearing current data
      setTestFormData({ ...testFormData });
    } catch (error) {
      toast.error(error.message || "something wrong");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  // handle submit
  const handleDepartmentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(departmentFormData);
    try {
      await axios.post("/departments", departmentFormData);
      toast.success("Department Created Successfully");
      // clearing current data
      setTestFormData({ ...departmentFormData });
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
      await axios.delete(`/tests/${id}`);
      toast.success("Test Deleted Successfully");
      getAllTests();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    setQueryParams({ ...queryParams, nameEn: searchTerm });
  };
  return (
    <div className="mb-8 ">
      <div>
        <SectionHeader title={"View Tests"} />
      </div>
      <div className="wrapper">
        <div className="w-full mb-6">
          <div className="flex justify-between items-end gap-3 flex-wrap">
            <h2 className="text-base flex justify-between  flex-col font-medium mb-2">
              {(showCreateDepartment || showCreateTest) && (
                <button
                  className=" text-gray-700 mb-5 text-lg"
                  onClick={handleBackButton}
                >
                  <AiOutlineLeft />
                </button>
              )}
              {showCreateDepartment || showCreateTest
                ? showCreateDepartment
                  ? "Create Department"
                  : "Create  Test"
                : "All Test List"}
            </h2>
            <div className="flex justify-center  gap-3 flex-wrap">
              <button type="button" className="btn-primary mb-3 text-[14px]">
                <FiUploadCloud className="mr-2" />
                Upload CSV
              </button>
              {!showCreateTest && (
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateTest(!showCreateTest);
                    setShowCreateDepartment(false);
                  }}
                  className="btn-primary mb-3 text-[14px]"
                >
                  <BiPlus className="mr-2 text-lg" />
                  New Test
                </button>
              )}
              {!showCreateDepartment && (
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateDepartment(!showCreateDepartment);
                    setShowCreateTest(false);
                  }}
                  className="btn-primary mb-3 text-[14px]"
                >
                  <BiPlus className="mr-2 text-lg" />
                  New Department
                </button>
              )}
            </div>
          </div>
          <div className={`h-[2px] bg-gray-200`}>
            <div className={`h-[2px] bg-primary w-[100%]  md:w-[150px]`}></div>
          </div>
        </div>
        {!showCreateDepartment && !showCreateTest && (
          <div>
            <div className="xl:flex gap-5 mb-6">
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

              <div className="flex md:flex-row flex-col gap-6 flex-wrap">
                {/* Filter by Department */}
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger>
                      <button className="flex max-w-[350px] md:max-w-none items-center md:justify-normal justify-between space-x-5 border text-sm border-primary px-8 py-2 rounded-full text-gray-400 flex-shrink-0 w-full sm:w-auto">
                        <span>
                          {queryParams?.department_id ? (
                            <span className="text-gray-700">
                              {
                                departments.find(
                                  (dept) =>
                                    dept.id === queryParams.department_id
                                )?.nameEn
                              }
                            </span>
                          ) : (
                            "Filter By Department"
                          )}
                        </span>
                        <MdContentCut className="text-primary" />
                      </button>
                    </MenubarTrigger>
                    <MenubarContent>
                      {departments?.map((dept) => (
                        <>
                          <MenubarItem
                            key={dept?.id}
                            onClick={() => handleDepartmentChange(dept?.id)}
                            className="cursor-pointer border-0 hover:border-0"
                          >
                            {dept.nameEn}
                          </MenubarItem>
                          <MenubarSeparator />
                        </>
                      ))}
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
                {/* filter by price range */}
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger>
                      <button className="flex max-w-[350px]  md:max-w-none items-center md:justify-normal justify-between space-x-5 border text-sm border-primary px-8 py-2 rounded-full text-gray-400 flex-shrink-0 w-full sm:w-auto">
                        <span>
                          {currentPriceRange ? (
                            <span className="text-gray-800">
                              {currentPriceRange.name}
                            </span>
                          ) : (
                            "Filter By Price Range"
                          )}
                        </span>
                        <BiCoin className="text-primary text-lg" />
                      </button>
                    </MenubarTrigger>
                    <MenubarContent>
                      {filterPriceRanges.map((item) => (
                        <>
                          <MenubarItem
                            key={item.id}
                            onClick={() => handlePriceRange(item)}
                            className="cursor-pointer border-0 hover:border-0"
                          >
                            {item.name}
                          </MenubarItem>
                          <MenubarSeparator />
                        </>
                      ))}
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>
            </div>
            {/* Responsive Table Wrapper */}
            <div>
              <div className="table-responsive">
                <table className="table min-w-full">
                  <thead>
                    <tr className="text-left text-gray-800 border-b">
                      <th className="py-2">Test Name</th>
                      <th>Description</th>
                      <th>Sample Type</th>
                      <th>Price</th>
                      <th>Department</th>
                      <th> Equipment </th>
                      <th> Status </th>
                      <th> User Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tests?.length > 0 ? (
                      tests?.map((test, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100">
                          <td className="py-4">{test?.nameEn || "----"}</td>
                          <td className="ellipsis">
                            {test?.descriptionEn || "----"}
                          </td>
                          <td>{test?.sampleType || "----"}</td>
                          <td>{test?.price || "----"}</td>
                          <td>{test?.department?.nameEn || "----"}</td>
                          <td>{test?.associatedEquipment || "----"}</td>
                          <td>{test?.isActive ? "Yes" : "No"}</td>
                          <td className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <button className="btn-outline">
                                  <IoInformation size={18} />
                                </button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Test Details</DialogTitle>
                                </DialogHeader>
                                <DialogDescription>
                                <div className="p-4">
                                <div className="w-full mb-6">
                                    <h2 className="text-base text-black font-medium mb-2">
                                      Test Information
                                    </h2>
                                    <div className="h-[2px] bg-gray-200">
                                      <div className="h-[2px] bg-primary w-[210px]"></div>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Name:
                                      </span>
                                      {test?.nameEn || "----"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Description:
                                      </span>
                                      {test?.descriptionEn || "----"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Sample Type:
                                      </span>
                                      {test?.sampleType || "----"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Price:
                                      </span>
                                      {test?.price || "----"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Department:
                                      </span>
                                      {test?.department?.nameEn || "----"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Associated Equipment:
                                      </span>
                                      {test?.associatedEquipment || "----"}
                                    </p>
                                    <p className="text-gray-600">
                                      <span className="font-medium mr-1">
                                        Is Active:
                                      </span>
                                      {test?.isActive ? "Yes" : "No"}
                                    </p>
                                  </div>
                                </div>
                                </DialogDescription>
                              </DialogContent>
                            </Dialog>
                            {/* Edit Button */}
                            <Link
                              to={`/test/edit-test/${test?.id}`}
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
                                    onClick={() => handleDelete(test?.id)}
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
        )}
        {showCreateTest && (
          <form onSubmit={handleTestSubmit}>
            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* name(en) */}
              <div>
                <label className="form-label">Name(En)</label>
                <input
                  onChange={(e) => {
                    setTestFormData((prevState) => ({
                      ...prevState,
                      nameEn: e.target.value,
                    }));
                  }}
                  type="text"
                  name="nameEn"
                  placeholder="Enter Name(En)"
                  className="form-input"
                />
              </div>

              {/* name(bn) */}
              <div>
                <label className="form-label">Name(Bn)</label>
                <input
                  onChange={(e) => {
                    setTestFormData((prevState) => ({
                      ...prevState,
                      nameEn: e.target.value,
                    }));
                  }}
                  type="text"
                  name="nameBn"
                  placeholder="Enter Name(Bn)"
                  className="form-input"
                />
              </div>

              {/* price */}
              <div>
                <label className="form-label">Price</label>
                <input
                  onChange={(e) => {
                    setTestFormData((prevState) => ({
                      ...prevState,
                      price: e.target.value,
                    }));
                  }}
                  type="text"
                  name="price"
                  placeholder="Enter Price"
                  className="form-input"
                />
              </div>

              {/* departments */}
              <div>
                <label className="form-label">Departments</label>
                <select
                  onChange={(e) => {
                    setTestFormData((prevState) => ({
                      ...prevState,
                      department: { id: e.target.value },
                    }));
                  }}
                  name="department"
                  className="form-input form-select"
                >
                  <option value={""} disabled selected>
                    Choose
                  </option>
                  <DepartmentOptions />
                </select>
              </div>

              {/* Associated Equipment */}
              <div>
                <label className="form-label">Associated Equipment</label>
                <input
                  onChange={(e) => {
                    setTestFormData((prevState) => ({
                      ...prevState,
                      associatedEquipment: e.target.value,
                    }));
                  }}
                  type="text"
                  name="associatedEquipment"
                  placeholder="Enter Associated Equipment"
                  className="form-input"
                />
              </div>

              {/* Description (en) */}
              <div>
                <label className="form-label">Description(En)</label>
                <textarea
                  onChange={(e) => {
                    setTestFormData((prevState) => ({
                      ...prevState,
                      descriptionEn: e.target.value,
                    }));
                  }}
                  name="descriptionEn"
                  placeholder="Enter Description(En)"
                  className="form-input"
                  rows={1}
                />
              </div>

              {/* Description (bn) */}
              <div>
                <label className="form-label">Description(Bn)</label>
                <textarea
                  onChange={(e) => {
                    setTestFormData((prevState) => ({
                      ...prevState,
                      descriptionBn: e.target.value,
                    }));
                  }}
                  name="descriptionBn"
                  placeholder="Enter Description(Bn)"
                  className="form-input"
                  rows={1}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button type="submit" className="btn-primary">
                <TbUserPlus className="mr-2 text-lg" />
                Create Test
              </button>
            </div>
          </form>
        )}
        {showCreateDepartment && (
          <form onSubmit={handleDepartmentSubmit}>
            <div>
              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Name (Bangla) */}
                <div>
                  <label className="form-label">Name (Bangla)</label>
                  <input
                    type="text"
                    placeholder="Enter name in Bangla"
                    className="form-input"
                    onChange={(e) =>
                      setDepartmentFormData({
                        ...departmentFormData,
                        nameBn: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Name (English) */}
                <div>
                  <label className="form-label">Name (English)</label>
                  <input
                    type="text"
                    placeholder="Enter name in English"
                    className="form-input"
                    onChange={(e) =>
                      setDepartmentFormData({
                        ...departmentFormData,
                        nameEn: e.target.value,
                      })
                    }
                  />
                </div>
                {/* Name (English) */}
                <div>
                  <label className="form-label">Code</label>
                  <input
                    type="text"
                    placeholder="Enter Code"
                    className="form-input"
                    onChange={(e) =>
                      setDepartmentFormData({
                        ...departmentFormData,
                        code: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Head Name */}
                <div>
                  <label className="form-label">Head Name</label>
                  <input
                    type="text"
                    placeholder="Enter head name"
                    className="form-input"
                    onChange={(e) =>
                      setDepartmentFormData({
                        ...departmentFormData,
                        headName: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    className="form-input"
                    onChange={(e) =>
                      setDepartmentFormData({
                        ...departmentFormData,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="form-input"
                    onChange={(e) =>
                      setDepartmentFormData({
                        ...departmentFormData,
                        location: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              {/* Submit Button */}
              <div className="mt-6">
                <button type="submit" className="btn-primary">
                  <TbUserPlus className="mr-2 text-lg" />
                  Create Department
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={queryParams.page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ViewTestsPage;
