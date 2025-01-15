import { useEffect, useState } from "react";
import SectionHeader from "@/components/ui/section-header";
import TableHeader from "@/components/ui/table-header";
import PlaceHolder from "@/utility/PlaceHolder";
import axios from "@/config/axiosConfig";
import useLoadingStore from "@/store/loadingStore";
import Select from "react-select";
import customStyles from "@/utility/react-select-styles";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CiEdit } from "react-icons/ci";
import { TbUserPlus } from "react-icons/tb";
import toast from "react-hot-toast";
import { capitalizeWords } from "@/utility/capitalizeWords";

const TestResultInputPage = () => {
  const [setIsSubmitted] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [invoiceData, setInvoiceData] = useState([]);
  const { setLoading } = useLoadingStore();
  const [invoiceOptions, setInvoiceOptions] = useState([]);
  const [testResultData, setResultData] = useState({
    patientId: null,
    invoiceId: currentInvoice,
    patientTestInput: [],
  });
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const fetchInvoices = async () => {
    try {
 
      const res = await axios.get(`/invoices?size=100000`);      // 10000 is 
      const withoutResultInvoices = res?.data?.invoices?.filter(
        (data) => data?.isResult
      );
      console.log("without result =>", withoutResultInvoices);
      const options = withoutResultInvoices?.map((data) => ({
        value: data?.id,
        label: data?.patient?.fullName,
      }));
      setInvoiceOptions(options || []);
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const getSingleInvoiceData = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`/patient-tests/${id}/tests`);
      setInvoiceData(res?.data);
      const updatedTestInput = res?.data?.map((test) => ({
        testId: test.testId,
        test_result: test.test_result || "",
        doctor_comment: test.doctor_comment || "",
      }));
      setResultData((prevState) => ({
        ...prevState,
        patientTestInput: updatedTestInput,
        patientId : res?.data[0]?.patientId
      }));
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInvoiceChange = (selectedOption) => {
    setResultData({ ...testResultData, invoiceId: selectedOption.value });
    setCurrentInvoice(selectedOption.value);
    getSingleInvoiceData(selectedOption.value);
  };

  const handleTestResult = (testId, result, comments) => {
    setResultData((prevState) => {
      const updatedTestInput = prevState.patientTestInput.map((test) =>
        test.testId === testId
          ? { ...test, test_result: result, doctor_comment: comments }
          : test
      );
      return { ...prevState, patientTestInput: updatedTestInput };
    });
    toast.success("result added");
    setIsResultModalOpen(false);
  };

  const handleFinalizeReport = async () => {
    setLoading(true);
    const id = currentInvoice;
    console.log(testResultData);
    try {
      await axios.put(`/patient-tests/${id}`, testResultData);
      toast.success("Result Finalized Successfully");
      fetchInvoices()
    } catch (error) {
      toast.error("Failed to finalize result");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mb-8">
      <SectionHeader title={"Test Result Input"} />

      <div className="wrapper mb-8">
        <form
          className="flex flex-wrap items-end mb-8 gap-5"
          onSubmit={handleSubmit}
        >
          <div className="w-[90vw] md:w-[320px]">
            <label className="form-label">Invoices</label>
            <Select
              required
              styles={customStyles}
              options={invoiceOptions}
              name="invoice"
              placeholder="Select an Invoice"
              onChange={handleInvoiceChange}
              isSearchable
            />
          </div>
        </form>

        {!currentInvoice ? (
          <div className="flex justify-center">
            <PlaceHolder />
          </div>
        ) : (
          <>
            <div>
              <TableHeader
                title={"Information Summary"}
                selectedWidth={"w-[200px]"}
              />
            </div>

            <div className="overflow-x-auto mb-8">
              <table className="table container min-w-full">
                <thead>
                  <tr className="text-left text-gray-800 border-b">
                    <th>Patient Name</th>
                    <th>Address</th>
                    <th>Phone No</th>
                    <th>Gender</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-100">
                    <td className="py-4">
                      {invoiceData[0]?.fullName || "N/A"}
                    </td>
                    <td>{invoiceData[0]?.address || "N/A"}</td>
                    <td>{invoiceData[0]?.phone || "N/A"}</td>
                    <td>
                      {invoiceData[0]?.gender
                        ? capitalizeWords(invoiceData[0]?.gender)
                        : "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="wrapper">
              <TableHeader title={"Test Lists"} selectedWidth={"w-[80px]"} />

              <div className="overflow-x-auto">
                <table className="table min-w-full">
                  <thead>
                    <tr className="text-left border-b text-gray-800 ">
                      <th className="py-2">Serial No</th>
                      <th>Test ID</th>
                      <th>Test Name</th>
                      <th>Test Result</th>
                      <th>Comment</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData?.map((test, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-4">{index + 1}</td>
                        <td>{test?.testId}</td>
                        <td>{test?.testName}</td>
                        <td>
                          {testResultData?.patientTestInput[index]
                            ?.test_result || "N/A"}
                        </td>
                        <td className="ellipsis">
                          {testResultData?.patientTestInput[
                            index
                          ]?.doctor_comment?.slice(0, 50) || "N/A"}
                        </td>
                        <td>
                          <Dialog
                            open={isResultModalOpen}
                            onOpenChange={setIsResultModalOpen}
                          >
                            <DialogTrigger asChild>
                              <button
                                onClick={() => {
                                  setSelectedTest(test); // Storing the selected test data
                                  setIsResultModalOpen(true);
                                }}
                                className="btn-primary"
                              >
                                <CiEdit className="mr-2 text-lg" /> Result
                              </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Input Test Result</DialogTitle>
                                <DialogDescription>
                                  <form
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                      handleTestResult(
                                        selectedTest.testId,
                                        e.target.result.value,
                                        e.target.comments.value
                                      );
                                    }}
                                  >
                                    <div className="grid text-black grid-cols-1 text-[16px] mt-4 gap-4">
                                      <div>
                                        <label className="form-label">
                                          Test Result
                                        </label>
                                        <input
                                          required
                                          defaultValue={
                                            testResultData?.patientTestInput[
                                              index
                                            ]?.test_result || ""
                                          }
                                          type="text"
                                          name="result"
                                          placeholder="Enter the test result"
                                          className="form-input"
                                        />
                                      </div>

                                      <div>
                                        <label className="form-label">
                                          Comments
                                        </label>
                                        <textarea
                                          required
                                          defaultValue={
                                            testResultData?.patientTestInput[
                                              index
                                            ]?.doctor_comment || ""
                                          }
                                          name="comments"
                                          className="form-input"
                                          placeholder="Enter comments"
                                          rows={3}
                                        />
                                      </div>
                                    </div>
                                    <div className=" flex justify-end mt-8">
                                      <button
                                        type="submit"
                                        className="btn-primary text-base "
                                      >
                                        Save Result
                                      </button>
                                    </div>
                                  </form>
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter></DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

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
                  <div className="flex items-center w-full  h-10 rounded-lg overflow-hidden">
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer text-nowrap w-max h-full bg-primary text-white py-2 px-4 text-center "
                    >
                      Choose File
                    </label>
                    <input id="file-upload" type="file" className="hidden" />
                    <span className="text-gray-400 px-4 py-2 flex-1 whitespace-nowrap overflow-hidden overflow-ellipsis"></span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  onClick={handleFinalizeReport}
                  className="btn-primary text-[16px]"
                >
                  <TbUserPlus className="mr-2 text-lg" />
                  Finalize Test Result
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TestResultInputPage;
