import SectionHeader from "@/components/ui/section-header";
import { EmployeeOptions, LeaveTypeOptions, StatusOptions } from "@/utility/SelectOptions";
import { TbUserPlus } from "react-icons/tb";
import { useState, useEffect } from "react";
import useLoadingStore from "@/store/loadingStore";
import { useNavigate, useParams } from "react-router-dom";
import axios from "@/config/axiosConfig";
import toast from "react-hot-toast";
import { capitalizeWords } from "@/utility/capitalizeWords";

const EditLeavePage = () => {
  const { setLoading } = useLoadingStore();
  const [leave, setLeave] = useState(null); 
  const [employeeId, setEmployeeId] = useState(null); 
  const navigate = useNavigate();
  const params = useParams(); 

  useEffect(() => {
    getLeaveData();
  }, []);

  const getLeaveData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/leaves/${params?.id}`);
      setLeave(res?.data); 
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission to edit leave
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Prepare updated leave data
    const updatedLeave = {
      employeeId: employeeId || leave?.employee?.id,
      leaveType: form.leave_type.value,
      fromDate: form.from_date.value,
      toDate: form.to_date.value,
      reason: form.reason.value,
      status: form.status.value,
      remarks: form.remarks.value,
    };
    console.log(updatedLeave);

    try {
      setLoading(true);
      await axios.put(`/leaves/${params?.id}`, updatedLeave); // PUT request to update leave
      navigate("/hr/leave-management"); // Navigate to leave management page
      toast.success("Leave updated successfully!"); // Success notification
    } catch (error) {
      toast.error(error?.message || "Failed to update leave."); // Error notification
    } finally {
      setLoading(false);
    }
  };

  // Handle employee change
  const handleEmployeeChange = (selectedOption) => {
    setEmployeeId(selectedOption.value); // Update employeeId when employee is selected
  };

  return (
    <div>
      <SectionHeader title={"Edit Leave"} />
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Employee Dropdown */}
            <div>
              <label className="form-label">Employee</label>
              <EmployeeOptions
                defaultValue={employeeId || leave?.employee?.id} 
                onEmployeeChange={handleEmployeeChange} 
              />
            </div>

            {/* Leave Type Dropdown */}
            <div>
              <label className="form-label">Leave Type</label>
              <select name="leave_type" className="form-input" defaultValue={leave?.leaveType}>
                <option value={ leave?.leaveType || ""} selected>{leave?.leaveType ? capitalizeWords(leave?.leaveType) : "Choose Leave Type"}</option>
                <LeaveTypeOptions /> {/* Options for leave types */}
              </select>
            </div>

            {/* From Date */}
            <div>
              <label className="form-label">From Date</label>
              <input
                type="date"
                name="from_date"
                className="form-input"
                defaultValue={leave?.fromDate} // Set default value to from date from the leave data
              />
            </div>

            {/* To Date */}
            <div>
              <label className="form-label">To Date</label>
              <input
                type="date"
                name="to_date"
                className="form-input"
                defaultValue={leave?.toDate} // Set default value to to date from the leave data
              />
            </div>

            {/* Reason */}
            <div>
              <label className="form-label">Reason</label>
              <input
                type="text"
                name="reason"
                className="form-input"
                defaultValue={leave?.reason} // Set default value to reason from the leave data
                placeholder="Enter reason"
              />
            </div>

            {/* Status Dropdown */}
            <div>
              <label className="form-label">Status</label>
              <select
                name="status"
                className="form-input"
                defaultValue={leave?.status} // Set default value to status from the leave data
              >
                <option value="" disabled>
                  Choose Status
                </option>
                <StatusOptions /> {/* Options for leave status */}
              </select>
            </div>

            {/* Remarks */}
            <div>
              <label className="form-label">Remarks</label>
              <textarea
                name="remarks"
                className="form-input"
                defaultValue={leave?.remarks} // Set default value to remarks from the leave data
                placeholder="Enter remarks"
                rows="1"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button type="submit" className="btn-primary">
              <TbUserPlus className="mr-2 text-lg" />
              Edit Leave
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLeavePage;
