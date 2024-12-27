import { useState } from "react";
import SectionHeader from "@/components/ui/section-header";
import TableHeader from "@/components/ui/table-header";
import { TbUserPlus } from "react-icons/tb";

import PlaceHolder from "@/utility/PlaceHolder";

const TestResultInputPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file ? file.name : null);
  };

  return (
    <div className="mb-8">
      <div>
        <SectionHeader title={"Test Result Input"} />
      </div>

      {/* Basic Information Form */}
      <div className="wrapper mb-8">
        <form
          className="flex flex-wrap items-end mb-8 gap-5"
          onSubmit={handleSubmit}
        >
          <div className="w-[90vw] md:w-[320px]">
            <label className="form-label">Invoice ID</label>
            <select
              name="Invoice"
              className="form-input form-select"
              defaultValue=""
            >
              <option value="" disabled>
                Choose
              </option>
              <option value="Invoice 1" className="text-black">
                Invoice 1
              </option>
              <option value="Invoice 2" className="text-black">
                Invoice 2
              </option>
              <option value="Invoice 3" className="text-black">
                Invoice 3
              </option>
            </select>
          </div>
          {/* Submit Button */}
          <div className="md:col-span-3">
            <button type="submit" className="btn-primary">
              <TbUserPlus className="mr-2 text-lg" />
              Input Test Result
            </button>
          </div>
        </form>

        {/* Conditional Rendering */}
        {!isSubmitted ? (
          <div className="flex justify-center">
            {/* Placeholder Image */}
            <PlaceHolder />
          </div>
        ) : (
          <>
            {/* Information Summary */}
            <div>
              <TableHeader
                title={"Information Summary"}
                selectedWidth={"w-[200px]"}
              />
            </div>

            {/* Responsive Table Wrapper for Summary */}
            <div className="overflow-x-auto mb-8">
              <table className="table container min-w-full">
                <thead>
                  <tr className="text-left text-gray-800 border-b">
                    <th className="py-2">Patient ID</th>
                    <th>Patient Name</th>
                    <th>Address</th>
                    <th>Phone No</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-100">
                    <td className="py-4">11872</td>
                    <td>Patient 1</td>{" "}
                    {/* Replace with dynamic patient name if needed */}
                    <td>acb road, Khulna</td>
                    <td>0292020222</td>
                    <td>ciakd@gail.com</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* test input*/}
            <div className="wrapper">
              <TableHeader title={"Test Lists"} selectedWidth={"w-[80px]"} />

              {/* Responsive Table Wrapper */}
              <div className="overflow-x-auto">
                <table className="table min-w-full">
                  <thead>
                    <tr className="text-left input-table text-gray-800 border-b">
                      <th className="py-2">Serial No</th>
                      <th>Test ID</th>
                      <th>Test Name</th>
                      <th>Test Result</th>
                      <th>Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array(6)
                      .fill("")
                      .map((_, index) => (
                        <tr key={index} className="input-table">
                          <td className="py-4">{index + 1}</td>
                          <td>12932</td>
                          <td>Blood test</td>
                          <td className="relative">
                            <input
                              type="text"
                              name="testResult"
                              className="w-full p-4 absolute top-0 focus:outline-primary left-0 h-full"
                            />
                          </td>
                          <td>1000ml -2000ml</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <form>
              <div className="wrapper mt-5 text-[14px]">
                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {/* Test Result Date */}
                  <div>
                    <label className="form-label">Test Result Date</label>
                    <input
                      type="date"
                      name="testResultDate"
                      className="form-input"
                    />
                  </div>

                  {/* Lab Technician */}
                  <div>
                    <label className="form-label">Lab Technician</label>
                    <select
                      name="labTechnician"
                      className="form-input form-select"
                    >
                      <option value="" disabled selected>
                        Choose
                      </option>
                      <option value="Technician 1">Technician 1</option>
                      <option value="Technician 2">Technician 2</option>
                      <option value="Technician 3">Technician 3</option>
                    </select>
                  </div>

                  {/* Authorized By */}
                  <div>
                    <label className="form-label">Authorized By</label>
                    <select
                      name="authorizedBy"
                      className="form-input form-select"
                    >
                      <option value="" disabled selected>
                        Choose
                      </option>
                      <option value="Doctor 1">Doctor 1</option>
                      <option value="Doctor 2">Doctor 2</option>
                    </select>
                  </div>

                  {/* Doctor Comments */}
                  <div>
                    <label className="form-label">Doctor Comments</label>
                    <textarea
                      name="doctorComments"
                      placeholder="Enter Doctor Comments"
                      className="form-input"
                      rows={1}
                    />
                  </div>

                  <div>
                    <label className="form-label block mb-2 text-lg font-medium text-gray-700">
                      Attachment
                    </label>
                    <div className="flex items-center w-full border border-[#D9D9D9] h-10 rounded-lg overflow-hidden">
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer text-nowrap w-max h-full bg-primary text-white py-2 px-4 text-center "
                      >
                        Choose File
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <span className="text-gray-400 px-4 py-2 flex-1 whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {selectedFile ? selectedFile : "No file chosen"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                  <button type="submit" className="btn-primary text-[16px]">
                    <TbUserPlus className="mr-2 text-lg" />
                    Finalize Test Result
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default TestResultInputPage;
