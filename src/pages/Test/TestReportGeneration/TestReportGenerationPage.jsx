import { useState } from "react";
import SectionHeader from "@/components/ui/section-header";
import TableHeader from "@/components/ui/table-header";
import { TbUserPlus } from "react-icons/tb";

import PlaceHolder from "@/utility/PlaceHolder";

const TestReportGenerationPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };


  return (
    <div className="mb-8">
      <div>
        <SectionHeader title={"Test Report Generation"} />
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
              Access Test Report
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
                    <tr className="text-left border-b text-gray-800 ">
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
                        <tr key={index} className="border-b">
                          <td className="py-4">{index + 1}</td>
                          <td>12932</td>
                          <td>Blood test</td>
                          <td >
                           300ml-200ml
                          </td>
                          <td>1000ml -2000ml</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
               {/* Submit Button */}
               <div className="mt-6">
                  <button type="submit" className="btn-primary text-[16px]">
                    <TbUserPlus className="mr-2 text-lg" />
                    Generate Test report
                  </button>
                </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TestReportGenerationPage;
