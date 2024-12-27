/* eslint-disable react/no-unescaped-entities */
import { FaSearch } from "react-icons/fa";
import SectionHeader from "@/components/ui/section-header";
import TableHeader from "@/components/ui/table-header";
import { useState } from "react";

const AttendanceReportPage = () => {
  const [attendanceData, setAttendanceData] = useState(
    Array(6).fill({ attended: false, from: "", to: "" })
  );

//   const handleToggleAttendance = (index) => {
//     const updatedData = attendanceData.map((entry, i) =>
//       i === index ? { ...entry, attended: !entry.attended } : entry
//     );
//     setAttendanceData(updatedData);
//   };

//   const handleTimeChange = (index, field, value) => {};

  return (
    <div className="mb-8">
      <div>
        <SectionHeader title={"Attendance Report"} />
      </div>

      <div className="wrapper">
        <TableHeader title={"Employee List"} selectedWidth={"w-[150px]"} />
        <div className="flex mb-5 md:space-x-6 md:space-y-0 space-y-3 flex-wrap">
          {/* Search Input */}
          <div className="flex py-2 items-center space-x-2 bg-[#EBF5FF] px-4 rounded-full flex-shrink-0 w-full sm:w-auto mb-5 sm:mb-0">
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
                <th className="py-2">Employee ID</th>
                <th>From</th>
                <th>To</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((entry, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="py-4 flex items-center">
                    <img
                      src={
                        "https://c8.alamy.com/comp/2WK9M86/man-profile-illustration-internet-call-avatar-2WK9M86.jpg"
                      }
                      alt="Profile"
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <span>Employee {index + 1}</span>
                  </td>
                  <td>102893</td>

                  <td>10:40 AM</td>
                  <td>6:30PM</td>

                  <td className="">
                    <p className=" bg-green-200 px-3 py-1 rounded-lg w-max">Yes</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReportPage;
