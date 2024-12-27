/* eslint-disable react/no-unescaped-entities */
import SectionHeader from "@/components/ui/section-header";
import useLoadingStore from "@/store/loadingStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "@/config/axiosConfig";
import { CiEdit } from "react-icons/ci";
import { DepartmentOptions } from "@/utility/SelectOptions";
import toast from "react-hot-toast";
const EditEmployeePage = () => {
  const [designations, setDesignations] = useState([]);
  const [employee, setEmployee] = useState(null);
  const { setLoading } = useLoadingStore();
  const params = useParams();
  useEffect(() => {
    getSelectedEmployee();
    getAllDesignations();
  }, []);
console.log(employee);
  //   handle get Selected employee
  const getSelectedEmployee = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/employees/${params?.id}`);
      setEmployee(res?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // fetching data of designations
  const getAllDesignations = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/designations`);
      setDesignations(res?.data?.designations);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission to edit employee
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedEmployee = {
      nameEn: form.nameEn.value,
      nameBn: form.nameBn.value,
      designationId: form.designation.value,
      departmentId: form.department.value,
      dateOfBirth: form.dateOfBirth.value,
      nid: form.nid.value,
      phone: form.phone.value,
      email: form.email.value,
      gender: form.gender.value,
      bloodGroup: form.bloodGroup.value,
      address: form.address.value,
      joiningDate: form.joiningDate.value,
      salary: form.salary.value,
    };

    try {
      setLoading(true);
      await axios.put(`/employees/${params?.id}`, updatedEmployee);
      toast.success("Employee profile updated successfully!"); // Success toast
    } catch (error) {
      toast.error(error?.message || "Failed to update employee profile."); // Error toast
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mb-8 text-gray-600">
      <div>
        <SectionHeader title={"Edit Employee Profile"} />
      </div>
      <div>
        <form onSubmit={handleSubmit} className="wrapper">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Name (Bangla) */}
            <div>
              <label className="form-label">Name (Bangla)</label>
              <input
                defaultValue={employee?.nameBn}
                type="text"
                name="nameBn"
                className="form-input"
                placeholder="Enter name in Bangla"
              />
            </div>

            {/* Name (English) */}
            <div>
              <label className="form-label">Name (English)</label>
              <input
                defaultValue={employee?.nameEn}
                type="text"
                name="nameEn"
                className="form-input"
                placeholder="Enter name in English"
              />
            </div>

            {/* Designation */}
            {/* Designation */}
            <div>
              <label className="form-label">Designation</label>
              <select
                defaultValue={employee?.designation}
                name="designation"
                className="form-input"
              >
                <option value={employee?.designation?.nameEn || ""}>
                  {employee?.designation?.nameEn
                    ? employee?.designation?.nameEn.charAt(0).toUpperCase() +
                      employee?.designation?.nameEn.slice(1).toLowerCase()
                    : "Choose"}
                </option>
                {designations.map((designation) => (
                  <option key={designation.id} value={designation.id}>
                    {designation.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Department */}
            <div>
              <label className="form-label">Department</label>
              <select
                defaultValue={employee?.department?.nameEn}
                name="department"
                className="form-input"
              >
                <option value={employee?.department?.id || ""}>
                  {employee?.department?.nameEn
                    ? employee?.department?.nameEn.charAt(0).toUpperCase() +
                      employee?.department?.nameEn.slice(1).toLowerCase()
                    : "Choose"}
                </option>
                <DepartmentOptions />
                {/* Add more options as necessary */}
              </select>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="form-label">Date of Birth</label>
              <input
                defaultValue={employee?.dateOfBirth}
                type="date"
                name="dateOfBirth"
                className="form-input"
              />
            </div>

            {/* NID */}
            <div>
              <label className="form-label">NID</label>
              <input
                defaultValue={employee?.nid}
                type="text"
                name="nid"
                className="form-input"
                placeholder="Enter NID"
              />
            </div>
            {/* Phone */}
            <div>
              <label className="form-label">Phone</label>
              <input
                defaultValue={employee?.phone}
                type="tel"
                name="phone"
                placeholder="Enter Phone Number"
                className="form-input"
              />
            </div>
            {/* email */}
            <div>
              <label className="form-label">Email</label>
              <input
                defaultValue={employee?.email}
                type="email"
                name="email"
                placeholder="Enter Phone Number"
                className="form-input"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="form-label">Gender</label>
              <select
                defaultValue={employee?.gender || ""}
                name="gender"
                className="form-input"
              >
                <option value={employee?.gender || "Choose"}>
                  {employee?.gender
                    ? employee?.gender.charAt(0).toUpperCase() +
                      employee?.gender.slice(1).toLowerCase()
                    : "Choose"}
                </option>
                <option value="MALE">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Blood Group */}
            <div>
              <label className="form-label">Blood Group</label>
              <select
                defaultValue={employee?.bloodGroup}
                name="bloodGroup"
                className="form-input"
              >
                <option value={employee?.bloodGroup || "Choose"}>
                  {employee?.bloodGroup
                    ? employee?.bloodGroup.charAt(0).toUpperCase() +
                      employee?.bloodGroup.slice(1).toLowerCase()
                    : "Choose"}
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            {/* Address */}
            <div>
              <label className="form-label">Address</label>
              <input
                defaultValue={employee?.address}
                type="text"
                name="address"
                className="form-input"
                placeholder="Enter address"
              />
            </div>

            {/* Joining Date */}
            <div>
              <label className="form-label">Joining Date</label>
              <input
                defaultValue={employee?.joiningDate}
                type="date"
                name="joiningDate"
                className="form-input"
              />
            </div>

            {/* Salary */}
            <div>
              <label className="form-label">Salary</label>
              <input
                defaultValue={employee?.salary}
                type="text"
                name="salary"
                className="form-input"
                placeholder="Enter salary"
                step="0.01"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button type="submit" className="btn-primary">
              <CiEdit className="mr-2 text-lg" />
              Edit New Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeePage;
