import { useState, useEffect } from "react";
import axios from "@/config/axiosConfig";
import useLoadingStore from "@/store/loadingStore";
import Select from "react-select";
import customStyles from "./react-select-styles";

export const DesignationOptions = () => {
  const [designations, setDesignations] = useState([]);
  const { setLoading } = useLoadingStore();

  useEffect(() => {
    const fetchDesignations = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/designations`);
        setDesignations(res?.data?.designations || []);
      } catch (error) {
        console.error("Failed to fetch designations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDesignations();
  }, []);

  return (
    <>
      {designations.map((designation) => (
        <option key={designation.id} value={designation.id}>
          {designation.nameEn}
        </option>
      ))}
    </>
  );
};

export const DepartmentOptions = () => {
  const [departments, setDepartments] = useState([]);
  const { setLoading } = useLoadingStore();

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/departments`);
        setDepartments(res?.data?.departments || []);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <>
      {departments.map((department) => (
        <option key={department.id} value={department.id}>
          {department.nameEn}
        </option>
      ))}
    </>
  );
};
// Dropdown component for districts
export const DistrictOptions = ({ onDistrictChange  , defaultValue=""}) => {
  const [districtOptions, setDistrictOptions] = useState([]);
  const { setLoading } = useLoadingStore();
  const defaultOption = districtOptions.find(
    (option) => option.value === defaultValue
  );
  console.log(defaultOption);
console.log(defaultValue);
  useEffect(() => {
    const fetchDistricts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/districts`);
        const options = res?.data.map((district) => ({
          value: district.id,
          label: district.nameEn,
        }));
        setDistrictOptions(options || []);
      } catch (error) {
        console.error("Failed to fetch districts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDistricts();
  }, [setLoading]);

  return (
    <Select
      styles={customStyles}
      value={defaultOption || ""}
      options={districtOptions}
      placeholder="Select a district"
      onChange={onDistrictChange}
      isSearchable
    />
  );
};

// Dropdown component for upazilas
export const UpazilaOptions = ({ onUpazilaChange, districtId , defaultValue="" }) => {
  const [upazilaOptions, setUpazilaOptions] = useState([]);
  const { setLoading } = useLoadingStore();
  const defaultOption = upazilaOptions.find(
    (option) => option.value === defaultValue
  );


  useEffect(() => {
    if (!districtId) return; // Prevent API call if no districtId
    console.log(districtId);

    const fetchUpazilas = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/districts/${districtId}/upazilas`);
        const options = res?.data.map((upazila) => ({
          value: upazila.id,
          label: upazila.nameEn,
        }));
        setUpazilaOptions(options || []);
      } catch (error) {
        console.error("Failed to fetch upazilas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpazilas();
  }, [districtId, setLoading]);

  return (
    <div className="relative cursor-not-allowed">
      <Select
        options={upazilaOptions}
        value={defaultOption || ""}
        styles={customStyles}
        placeholder="Select an upazila"
        onChange={onUpazilaChange}
        isSearchable
        isDisabled={!districtId} // Disable if districtId is not provided
      />
     
    </div>
  );
};
// Institutions Options Component
export const InstitutionOptions = ({
  onInstitutionChange,
  defaultValue = "",
}) => {
  const [institutionOptions, setInstitutionOptions] = useState([]);
  const { setLoading } = useLoadingStore();
  const defaultOption = institutionOptions.find(
    (option) => option.value === defaultValue
  );

  useEffect(() => {
    const fetchInstitutions = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/institutions`);
        const options = res?.data?.institutions?.map((institution) => ({
          value: institution.id,
          label: institution.name,
        }));
        setInstitutionOptions(options || []);
      } catch (error) {
        console.error("Failed to fetch institutions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutions();
  }, [setLoading]);

  return (
    <Select
      styles={customStyles}
      value={defaultOption || ""}
      options={institutionOptions}
      name="institution"
      placeholder="Select an institution"
      onChange={onInstitutionChange}
      isSearchable
    />
  );
};
export const EmployeeOptions = ({
  onEmployeeChange,
  defaultValue = "",
}) => {
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const { setLoading } = useLoadingStore();
  const defaultOption = employeeOptions.find(
    (option) => option.value === defaultValue
  );

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/employees`);
        const options = res?.data?.employees?.map((employee) => ({
          value: employee.id,
          label: employee.nameEn,
        }));
        setEmployeeOptions(options || []);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [setLoading]);

  return (
    <Select
      styles={customStyles}
      value={defaultOption || ""}
      options={employeeOptions}
      name="employee"
      placeholder="Select an Employee"
      onChange={onEmployeeChange}
      isSearchable
    />
  );
};

// Degrees Options Component
export const DegreeOptions = ({ onDegreeChange, defaultValue = "" }) => {
  const [degreeOptions, setDegreeOptions] = useState([]);
  const { setLoading } = useLoadingStore();
  const defaultOption = degreeOptions.find(
    (option) => option.value === defaultValue
  );

  useEffect(() => {
    const fetchDegrees = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/degrees`);
        const options = res?.data?.map((degree) => ({
          value: degree.id,
          label: degree.name,
        }));
        setDegreeOptions(options || []);
      } catch (error) {
        console.error("Failed to fetch degrees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDegrees();
  }, [setLoading]);

  return (
    <Select
      styles={customStyles}
      value={defaultOption || ""}
      options={degreeOptions}
      name="degree"
      placeholder="Select a degree"
      onChange={onDegreeChange}
      isSearchable
    />
  );
};

// export const SpecialityOptions = ({
//   onSpecialityChange,
//   defaultValue = "",
// }) => {
//   const [SpecialityOptions, setSpecialityOptions] = useState([]);
//   const { setLoading } = useLoadingStore();

//   useEffect(() => {
//     const fetchSpecialities = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(`/specialities`);
//         const options = res?.data?.specialities?.map((degree) => ({
//           value: degree.id,
//           label: degree.name,
//         }));
//         setSpecialityOptions(options);
//       } catch (error) {
//         console.error("Failed to fetch specialities:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSpecialities();
//   }, []);

//   return (
//     <Select
//       styles={customStyles}
//       defaultValue={defaultValue}
//       name="speciality"
//       options={SpecialityOptions}
//       placeholder="Select an Speciality"
//       onChange={onSpecialityChange}
//       isSearchable
//     />
//   );
// };

export const SpecialityOptions = () => {
  const [specialities, setSpecialities] = useState([]);
  const { setLoading } = useLoadingStore();

  useEffect(() => {
    const fetchSpecialities = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/specialities`);
        setSpecialities(res?.data?.specialities || []);
      } catch (error) {
        console.error("Failed to fetch specialities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialities();
  }, []);

  return (
    <>
      {specialities.map((speciality) => (
        <option key={speciality.id} value={speciality.id}>
          {speciality.nameEn}
        </option>
      ))}
    </>
  );
};
export const BloodGroupOptions = () => {
  const bloodGroups = [
    { value: "A_POSITIVE", display: "A+" },
    { value: "A_NEGATIVE", display: "A-" },
    { value: "B_POSITIVE", display: "B+" },
    { value: "B_NEGATIVE", display: "B-" },
    { value: "O_POSITIVE", display: "O+" },
    { value: "O_NEGATIVE", display: "O-" },
    { value: "AB_POSITIVE", display: "AB+" },
    { value: "AB_NEGATIVE", display: "AB-" },
  ];
  return (
    <>
      {bloodGroups.map((group) => (
        <option key={group.value} value={group.value}>
          {group.display}
        </option>
      ))}
    </>
  );
};

export const GenderOptions = () => {
  const genders = [
    { value: "MALE", display: "Male" },
    { value: "FEMALE", display: "Female" },
    { value: "OTHER", display: "Other" },
  ];

  return (
    <>
      {genders.map((gender) => (
        <option key={gender.value} value={gender.value}>
          {gender.display}
        </option>
      ))}
    </>
  );
};

export const PaymentStatusOptions = () => {
  const paymentStatus = [
    { value: "PAID", display: "Paid" },
    { value: "UNPAID", display: "Unpaid" },
    { value: "PARTIALLY_PAID", display: "Partially Paid" },
    { value: "REFUNDED", display: "Refunded" },
    { value: "PARTIALLY_REFUNDED", display: "Partially Refunded" },
    { value: "CANCELLED", display: "Cancelled" },
    { value: "PENDING", display: "Pending" },
    { value: "PROCESSING", display: "Processing" },
    { value: "FAILED", display: "Failed" },
    { value: "ABANDONED", display: "Abandoned" },
  ];

  return (
    <>
      {paymentStatus.map((status) => (
        <option key={status.value} value={status.value}>
          {status.display}
        </option>
      ))}
    </>
  );
};

export const LeaveTypeOptions = () => {
  const leaveTypes = [
    { value: "SICK_LEAVE", display: "Sick Leave" },
    { value: "CASUAL_LEAVE", display: "Casual Leave" },
    { value: "EARNED_LEAVE", display: "Earned Leave" },
    { value: "MATERNITY_LEAVE", display: "Maternity Leave" },
    { value: "PATERNITY_LEAVE", display: "Paternity Leave" },
    { value: "HALF_PAY_LEAVE", display: "Half Pay Leave" },
    { value: "EXTRAORDINARY_LEAVE", display: "Extraordinary Leave" },
    { value: "STUDY_LEAVE", display: "Study Leave" },
    { value: "QUARANTINE_LEAVE", display: "Quarantine Leave" },
    { value: "SPECIAL_LEAVE", display: "Special Leave" },
    { value: "COMPENSATORY_LEAVE", display: "Compensatory Leave" },
    { value: "UNPAID_LEAVE", display: "Unpaid Leave" },
    { value: "LEAVE_WITHOUT_PAY", display: "Leave Without Pay" },
    { value: "LEAVE_WITH_PAY", display: "Leave With Pay" },
    { value: "LEAVE_WITHOUT_ALLOWANCE", display: "Leave Without Allowance" },
    { value: "LEAVE_WITH_ALLOWANCE", display: "Leave With Allowance" },
    { value: "LEAVE_WITHOUT_SALARY", display: "Leave Without Salary" },
    { value: "LEAVE_WITH_SALARY", display: "Leave With Salary" },
    { value: "LEAVE_WITHOUT_BENEFIT", display: "Leave Without Benefit" },
    { value: "LEAVE_WITH_BENEFIT", display: "Leave With Benefit" },
    { value: "LEAVE_WITHOUT_ALLOWANCE_AND_BENEFIT", display: "Leave Without Allowance and Benefit" },
    { value: "LEAVE_WITH_ALLOWANCE_AND_BENEFIT", display: "Leave With Allowance and Benefit" },
    { value: "LEAVE_WITHOUT_SALARY_AND_BENEFIT", display: "Leave Without Salary and Benefit" },
    { value: "LEAVE_WITH_SALARY_AND_BENEFIT", display: "Leave With Salary and Benefit" },
    { value: "LEAVE_WITHOUT_ALLOWANCE_AND_SALARY", display: "Leave Without Allowance and Salary" },
    { value: "LEAVE_WITH_ALLOWANCE_AND_SALARY", display: "Leave With Allowance and Salary" },
    { value: "LEAVE_WITHOUT_BENEFIT_AND_SALARY", display: "Leave Without Benefit and Salary" },
    { value: "LEAVE_WITH_BENEFIT_AND_SALARY", display: "Leave With Benefit and Salary" },
    { value: "LEAVE_WITHOUT_ALLOWANCE_AND_BENEFIT_AND_SALARY", display: "Leave Without Allowance, Benefit, and Salary" },
    { value: "LEAVE_WITH_ALLOWANCE_AND_BENEFIT_AND_SALARY", display: "Leave With Allowance, Benefit, and Salary" },
  ];

  return (
    <>
      {leaveTypes.map((leave) => (
        <option key={leave.value} value={leave.value}>
          {leave.display}
        </option>
      ))}
    </>
  );
};

export const StatusOptions = () => {
  const statuses = [
    { value: "ACTIVE", display: "Active" },
    { value: "INACTIVE", display: "Inactive" },
    { value: "PENDING", display: "Pending" },
    { value: "PROCESSING", display: "Processing" },
    { value: "COMPLETED", display: "Completed" },
    { value: "CANCELLED", display: "Cancelled" },
    { value: "FAILED", display: "Failed" },
    { value: "ABANDONED", display: "Abandoned" },
  ];

  return (
    <>
      {statuses.map((status) => (
        <option key={status.value} value={status.value}>
          {status.display}
        </option>
      ))}
    </>
  );
};

