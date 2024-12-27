import SectionHeader from "@/components/ui/section-header";
import { EmployeeOptions } from "@/utility/SelectOptions";
import { TbUserPlus } from "react-icons/tb";
import { useState, useEffect } from "react";
import useLoadingStore from "@/store/loadingStore";
import { useNavigate, useParams } from "react-router-dom";
import axios from "@/config/axiosConfig";
import toast from "react-hot-toast";

const EditPayrollPage = () => {
  const { setLoading } = useLoadingStore();
  const [payroll, setPayroll] = useState(null);
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState(null);
  const params = useParams();

  useEffect(() => {
    getPayrollData();
  
  }, []);

  // Fetch Payroll Data
  const getPayrollData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/payroll/${params?.id}`);
      setPayroll(res?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };



  // Handle form submission to edit payroll
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedPayroll = {
      employeeId: employeeId || payroll?.employee?.id,
      salaryType: form.salaryType.value,
      salary: Number(form.paymentAmount.value),
      //   paymentDate: form.paymentDate.value,
    };
    console.log(updatedPayroll);
    console.log("updated payroll", updatedPayroll);

    try {
      setLoading(true);
      await axios.put(`/payroll/${params?.id}`, updatedPayroll);
      navigate("/hr/payroll-management");
      toast.success("Payroll updated successfully!");
    } catch (error) {
      toast.error(error?.message || "Failed to update payroll.");
    } finally {
      setLoading(false);
    }
  };
  const handleEmployeeChange = (selectedOption) => {
    setEmployeeId(selectedOption.value);
  };
  return (
    <div>
      <div>
        <SectionHeader title={"Edit Payroll"} />
      </div>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Employee Dropdown */}
            <div>
              <label className="form-label">Employee</label>
              <EmployeeOptions
                defaultValue={employeeId || payroll?.employee?.id}
                onEmployeeChange={handleEmployeeChange}
              />
            </div>

            {/* Salary Type Dropdown */}
            <div>
              <label className="form-label">Salary Type</label>
              <select
                name="salaryType"
                className="form-input"
                defaultValue={payroll?.salaryType}
              >
                <option value={payroll?.salaryType || ""}>
                  {payroll?.salaryType
                    ? payroll?.salaryType.charAt(0).toUpperCase() +
                      payroll?.salaryType.slice(1).toLowerCase()
                    : "Choose"}
                </option>
                <option value="BASIC_SALARY">Basic Salary</option>
                <option value="BONUS">Bonus</option>
                <option value="DEDUCTIONS">Deductions</option>
              </select>
            </div>

            {/* Payment Amount */}
            <div>
              <label className="form-label">Payment Amount</label>
              <input
                type="number"
                name="paymentAmount"
                placeholder="Enter Payment Amount"
                className="form-input"
                defaultValue={payroll?.salary}
              />
            </div>

            {/* Payment Date */}
            <div>
              <label className="form-label">Payment Date</label>
              <input
                type="date"
                name="paymentDate"
                className="form-input"
                defaultValue={payroll?.paymentDate}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button type="submit" className="btn-primary">
              <TbUserPlus className="mr-2 text-lg" />
              Edit Payroll
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPayrollPage;
