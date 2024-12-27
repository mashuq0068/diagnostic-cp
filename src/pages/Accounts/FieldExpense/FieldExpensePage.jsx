import { useState } from "react";

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
import { BiPlus } from "react-icons/bi";
import { TbUserPlus } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineLeft } from "react-icons/ai";
const FieldExpensePage = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="mb-8">
      <div>
        <SectionHeader title={"Field Expense"} />
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
              {showForm ? "New Category" : "Category List"}
            </h2>
            {!showForm && (
              <button
                type="button"
                onClick={() => setShowForm(!showForm)}
                className="btn-primary mb-3 text-[14px]"
              >
                <BiPlus className="mr-2 text-lg" />
                New Category
              </button>
            )}
          </div>
          <div className="h-[2px] bg-gray-200">
            <div className="h-[2px] bg-primary w-[120px]"></div>
          </div>
        </div>

        {showForm ? (
          // Form Section

          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Category Name */}
              <div>
                <label className="form-label">Category Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter Category Name"
                />
              </div>

              {/* Category Type */}
              <div>
                <label className="form-label">Category Type</label>
                <select className="form-input">
                  <option value="" disabled selected>
                    Select Category Type
                  </option>
                  <option value="type1">Type 1</option>
                  <option value="type2">Type 2</option>
                  <option value="type3">Type 3</option>
                </select>
              </div>

              {/* Category Status */}
              <div>
                <label className="form-label">Category Status</label>
                <select className="form-input">
                  <option value="" disabled selected>
                    Select Category Status
                  </option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              {/* Description */}
              <div>
                <label className="form-label">Description</label>
                <textarea
                  className="form-input"
                  placeholder="Enter description"
                  rows="1"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button type="submit" className="btn-primary flex items-center">
                <TbUserPlus className="mr-2 text-lg" />
                Create New Category
              </button>
            </div>
          </form>
        ) : (
          // Table Section
          <div className="transition-all ease-in-out duration-300">
            {/* Responsive Table Wrapper */}
            <div className="table-responsive">
              <table className="table min-w-full">
                <thead>
                  <tr className="text-left text-gray-800 border-b">
                    <th className="py-2">Category Name</th>
                    <th>Description</th>
                    <th>Category Type</th>
                    <th>Category Status </th>
                    <th>User Action </th>
                  </tr>
                </thead>
                <tbody>
                  {Array(6)
                    .fill("")
                    .map((_, index) => (
                      <tr key={index} className="border-b hover:bg-gray-100">
                        <td className="py-4">Category</td>
                        <td>--------------------------------</td>
                        <td>Sample</td>
                        <td>Active</td>

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
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldExpensePage;
