import { useEffect, useState } from "react";
import SectionHeader from "@/components/ui/section-header";
import TableHeader from "@/components/ui/table-header";
import { TbUserPlus } from "react-icons/tb";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "@/config/axiosConfig";
import Select from "react-select";
import PlaceHolder from "@/utility/PlaceHolder";
import useLoadingStore from "@/store/loadingStore";
import customStyles from "@/utility/react-select-styles";
import { capitalizeWords } from "@/utility/capitalizeWords";

const TestReportGenerationPage = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const { setLoading } = useLoadingStore();
  const [invoiceOptions, setInvoiceOptions] = useState([]);

  const fetchInvoices = async () => {
    try {
      const res = await axios.get(`/invoices?size=100000`);
      const withResultInvoices = res?.data?.invoices?.filter(
        (data) => !data?.isResult
      );
      const options = withResultInvoices?.map((data) => ({
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

  const generateInvoiceReport = () => {
    const input = document.createElement("div");
    input.style.position = "absolute";
    input.style.left = "-9999px";
    input.className = "w-[210mm] bg-white";

    input.innerHTML = `
    <div>
      <!-- Header Section: Diagnostic Center Information -->
      <div class="flex bg-gray-200 text-black justify-between items-start border-b-2 pb-6 mb-8 shadow-lg rounded-lg p-8">
        <div class="space-y-4">
          <h1 class="text-2xl font-bold tracking-tight">Diagnostic Center</h1>
          <div class="text-sm">
            <p>Phone: <span class="font-medium">564-555-1234</span></p>
            <p>Email: <span class="font-medium">your@email.com</span></p>
            <p>Address: <span class="font-medium">123 Your Street, City, State, ZIP CODE</span></p>
          </div>
        </div>
        <div class="text-right space-y-3">
          <h2 class="text-3xl font-semibold uppercase tracking-wide">Test Result Report</h2>
          <div class="text-sm">
          
            <p>Patient Name: <span class="font-medium">${
              invoiceData[0]?.fullName || "N/A"
            }</span></p>
            <p>Patient Address: <span class="font-medium">${
              invoiceData[0]?.address || "N/A"
            }</span></p>
            <p>Phone: <span class="font-medium">${
              invoiceData[0]?.phone || "N/A"
            }</span></p>
            <p>Gender: <span class="font-medium">${
              invoiceData[0]?.gender
                ? capitalizeWords(invoiceData[0]?.gender)
                : "N/A"
            }</span></p>
            <p>Report Date: <span class="font-medium">${new Date().toLocaleDateString()}</span></p>
          </div>
        </div>
      </div>

      <!-- Test Results Section -->
      <div class="mb-6 p-8">
        <table class="table  min-w-full">
          <thead class="bg-primary text-left text-white">
            <tr class="text-left border-white border-b">
              <th class="pb-4 border-white border-b align-middle">Serial No</th>
              <th class="border-white pb-4 border-b align-middle">Test Name</th>
              <th class="border-white pb-4 border-b align-middle">Result</th>
              <th class="border-white pb-4 border-b align-middle">Comment</th>
            </tr>
          </thead>
          <tbody>
            ${invoiceData
              ?.map(
                (test, index) => `
                  <tr class="bg-gray-100">
                    <td class="pb-6 border-gray-400 border-b align-middle">${
                      index + 1
                    }</td>
                    <td class="pb-6 border-gray-400 border-b align-middle">${
                      test.testName
                    }</td>
                    <td class="pb-6 border-gray-400 border-b align-middle">${
                      test.testResult || "N/A"
                    }</td>
                    <td class="pb-6 border-gray-400 border-b align-middle">${
                      test.doctorComment || "N/A"
                    }</td>
                  </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>

      <!-- Additional Sections -->
      <!-- Lab Technician Details -->
      <div class="p-8 text-sm">
        <p ><strong>Lab Technician:</strong> <span class="font-medium">John Doe</span></p>
        <p class="mt-2"><strong>Lab Technician:</strong> <span class="font-medium">John Doe</span></p>
        <p class="mt-2"><strong>Technician ID:</strong> <span class="font-medium">LT-10234</span></p>
        <p class="mt-2"><strong>Lab Comments:</strong> <span class="font-medium">All tests have been performed with accuracy following the standard lab protocols.</span></p>
      </div>

      <!-- Report Comments Section -->
      <div class="p-8 text-sm">
        <h3 class="text-lg font-semibold">Comments:</h3>
        <p ><em>This test report is for informational purposes. For any medical concerns, please consult your healthcare provider.</em></p>
      </div>

      <!-- Signature Section -->
      <div class="mt-8 p-8">
        <div class="flex justify-between items-center">
          <div class="text-sm">
            <p c><strong>Signature of Lab Technician:</strong></p>
            <p class="pt-2">(Signature)</p>
          </div>
          <div class="text-right">
            <p class="text-sm"><strong>Authorized By:</strong> Dr. Jane Smith</p>
            <p>(Signature)</p>
            <p class="pt-2">(Date: ${new Date().toLocaleDateString()})</p>
          </div>
        </div>
      </div>
    </div>
  `;

    document.body.appendChild(input);

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
      document.body.removeChild(input);
    });
  };

  const getSingleInvoiceData = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`/patient-tests/${id}/tests`);
      setInvoiceData(res?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInvoiceChange = (selectedOption) => {
    setCurrentInvoice(selectedOption.value);
    getSingleInvoiceData(selectedOption.value);
  };

  return (
    <div className="mb-8">
      <div>
        <SectionHeader title={"Test Report Generation"} />
      </div>

      {/* Basic Information Form */}
      <div className="wrapper mb-8">
        <form className="flex flex-wrap items-end mb-8 gap-5">
          <div className="w-[90vw] md:w-[320px]">
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
          </div>
        </form>

        {/* Conditional Rendering */}
        {!currentInvoice ? (
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
                    <th className="py-2">Patient Name</th>
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
                      <th>Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData?.map((test, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-4">{index + 1}</td>
                        <td>{test?.id}</td>
                        <td>{test?.testName}</td>
                        <td>{test?.testResult || "N/A"}</td>
                        <td className="ellipsis">
                          {test?.doctorComment?.slice(0, 50) || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Submit Button */}
            {/* Generate Report Button */}
            {/* Submit Button */}
            <div className="md:col-span-3 mt-8">
              <button
                onClick={generateInvoiceReport}
                type="submit"
                className="btn-primary"
              >
                <TbUserPlus className="mr-2 text-lg" />
                Generate Test Report
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TestReportGenerationPage;
