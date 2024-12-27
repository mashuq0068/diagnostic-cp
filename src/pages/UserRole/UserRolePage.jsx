import { useState } from "react";
import SectionHeader from "@/components/ui/section-header";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BiPlus } from "react-icons/bi";
import PlaceHolder from "@/utility/PlaceHolder";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const roles = ["Admin", "Doctor", "Lab Technician", "Receptionist"];
const pages = [
  { category: "Dashboard", items: ["View Dashboard"] },
  {
    category: "Doctors",
    items: [
      "Create Doctor",
      "View Doctors",
      "Doctor Transaction",
      "Doctor Ledger",
      "Commission Tracking",
    ],
  },
  {
    category: "Agents",
    items: [
      "Create Agent",
      "View Agents",
      "Agent Transaction",
      "Agent Ledger",
      "Commission Tracking",
    ],
  },
  {
    category: "Patients",
    items: [
      "Create Patient",
      "View Patients",
      "Patient Transaction",
      "Patient Ledger",
      "Appointment Scheduling",
    ],
  },
  {
    category: "Tests",
    items: [
      "Create Test",
      "View Tests",
      "Invoice/Bill",
      "Test Result Input",
      "Test Report Generation",
    ],
  },
  {
    category: "Accounts",
    items: [
      "Income Management",
      "New Expense",
      "Field Expense",
      "View All Expense",
    ],
  },
  {
    category: "Reports",
    items: [
      "Profit/loss Tracking",
      "Sales Report",
      "Expense Report",
      "Commission Tracking",
      "Income Report",
    ],
  },
  {
    category: "Hr",
    items: [
      "Employee Management",
      "Payroll Management",
      "Leave Management",
      "Performance Tracking",
    ],
  },
  {
    category: "User Role",
    items: ["User Role Assign"],
  },
];
const UserRolePage = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [permissions, setPermissions] = useState({});

  // Handle individual item permission toggle
  const handlePermissionChange = (category, item) => {
    setPermissions((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category] || {}),
        [item]: !prev[category]?.[item],
      },
    }));
  };

  // Handle category-level toggle
  const handleCategoryChange = (category, items) => {
    const newPermissions = {};

    const allSelected = items.every((item) => permissions[category]?.[item]);
    items.forEach((item) => {
      newPermissions[item] = !allSelected;
    });

    setPermissions((prev) => ({
      ...prev,
      [category]: newPermissions,
    }));
  };

  return (
    <div className="mb-8">
      <SectionHeader title="User Role Settings" />
      <div className="wrapper">
        <form className="flex flex-wrap items-end gap-5 mb-8">
          <div className="w-[90vw] md:w-[320px]">
            <label className="form-label text-black">Select User Role</label>
            <select
              className="form-input form-select"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="" disabled>
                Choose Role
              </option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <Dialog>
              <DialogTrigger asChild>
                <button className="btn-primary">
                  <BiPlus className="mr-2 text-lg" />
                  Add New Role
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Role</DialogTitle>
                  <DialogDescription>
                    <form>
                      {/* Form Grid */}
                      <div className="grid grid-cols-1 text-[16px] mt-4 gap-4">
                        {/* Name */}
                        <div>
                          <label className="form-label">Name(En)</label>
                          <input
                            type="text"
                            name="nameBn"
                            placeholder="Enter your name"
                            className="form-input"
                          />
                        </div>
                        {/* Name */}
                        <div>
                          <label className="form-label">Name(Bn)</label>
                          <input
                            type="text"
                            name="nameEn"
                            placeholder="Enter your name"
                            className="form-input"
                          />
                        </div>
                      </div>
                    </form>
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4"></div>
                <DialogFooter>
                  <button type="submit" className="btn-primary">
                    Create New Role
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </form>

        {selectedRole ? (
          <div>
            <div className="grid gap-6">
              {pages.map(({ category, items }) => (
                <div key={category} className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    {/* <TableHeader title={category} selectedWidth={"w-[100px]"} /> */}
                    <div className="w-full mb-6">
                      <div className=" flex justify-between">
                        <h2 className="text-base font-medium mb-2">
                          {category}
                        </h2>
                        <div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={items.every(
                                (item) => permissions[category]?.[item]
                              )}
                              onChange={() =>
                                handleCategoryChange(category, items)
                              }
                            />

                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-primary peer-checked:before:translate-x-5 before:content-[''] before:absolute before:top-0.5 before:left-[2px] before:bg-white before:border before:border-gray-300 before:rounded-full before:h-5 before:w-5 before:transition-transform"></div>
                            <span className="ml-2 text-sm">Select All</span>
                          </label>
                        </div>
                      </div>
                      <div className={`h-[2px] bg-gray-200`}>
                        <div className={`h-[2px] bg-primary w-[100px]`}></div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between gap-4 p-3 border rounded-lg bg-gray-50"
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {item}
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={permissions[category]?.[item] || false}
                            onChange={() =>
                              handlePermissionChange(category, item)
                            }
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-primary peer-checked:before:translate-x-5 before:content-[''] before:absolute before:top-0.5 before:left-[2px] before:bg-white before:border before:border-gray-300 before:rounded-full before:h-5 before:w-5 before:transition-transform"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className=" mt-8">
              <button className="btn-primary">Save Permissions</button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <PlaceHolder />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRolePage;
