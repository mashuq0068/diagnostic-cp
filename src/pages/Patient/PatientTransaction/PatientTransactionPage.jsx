import SectionHeader from "@/components/ui/section-header";
import useLoadingStore from "@/store/loadingStore";
import { buildQueryParams } from "@/utility/buildQueryParams";
import { useEffect, useState } from "react";
import { TbUserPlus } from "react-icons/tb";
import axios from "@/config/axiosConfig";
import toast from "react-hot-toast";
import Select from "react-select";
import customStyles from "@/utility/react-select-styles";
import {
  TransactionMethodOptions,
  TransactionTypeOptions,
} from "@/utility/SelectOptions";
import { formatDateForPostgreSQL } from "@/utility/fomatDateForPostgreSQL";

const PatientTransactionPage = () => {
  const { setLoading } = useLoadingStore();
  const [patientOptions, setPatientOptions] = useState();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [formData, setFormData] = useState({
    transactionDate: "",
    transactionType: "",
    transactionMethod: "",
    transactionDetails: "",
    patientId: null,
  });
  console.log(formData);
  const queryParams = {
    size: 10000,
  };
  const getAllPatients = async () => {
    setLoading(true);
    try {
      const queryData = buildQueryParams(queryParams);
      const res = await axios.get(`/patients?${queryData}`);
      const options = res?.data?.patients?.map((patient) => ({
        value: patient.id,
        label: patient.fullName,
      }));
      setPatientOptions(options);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPatients();
  }, []);

  const handlePatientChange = async (selectedOption) => {
    setLoading(true);
    const id = selectedOption.value;
    try {
      const res = await axios.get(`/patients/${id}`);
      setSelectedPatient(res?.data);
      setFormData((prev) => ({ ...prev, patientId: id }));
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/patient-ledgers", formData);
      toast.success("Transaction Created Successfully");
    } catch (error) {
      toast.error("Failed to create Transaction");
    } finally {
      setLoading(false);
    }
  };

 
  
  return (
    <div className="mb-8">
      <div>
        <SectionHeader title={"Create Patient Transaction"} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="wrapper">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <div>
              <label className="form-label">Transaction Date</label>
              <input
                required
                type="date"
                name="transactionDate"
                placeholder="Enter Transaction Date"
                className="form-input"
               
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    transactionDate: formatDateForPostgreSQL(e.target.value), 
                  }))
                }
              />
            </div>

            <div>
              <label className="form-label">Patient</label>
              <Select
                required
                styles={customStyles}
                options={patientOptions}
                placeholder="Select an Patient"
                onChange={handlePatientChange}
                isSearchable
              />
            </div>

            <div>
              <label className="form-label">Balance</label>
              <input
                type="text"
                name="balance"
                placeholder="Enter Balance"
                className="form-input"
                readOnly
                value={selectedPatient?.totalBalance}
              />
            </div>

            <div>
              <label className="form-label">Transaction Type</label>
              <select
                required
                name="transactionType"
                className="form-input form-select"
                value={formData.transactionType}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    transactionType: e.target.value,
                  }))
                }
              >
                <option value="" disabled>
                  Choose
                </option>
                <TransactionTypeOptions />
              </select>
            </div>

            <div>
              <label className="form-label">Transaction Method</label>
              <select
                required
                name="transactionMethod"
                className="form-input form-select"
                value={formData.transactionMethod}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    transactionMethod: e.target.value,
                  }))
                }
              >
                <option value="" disabled>
                  Choose
                </option>
                <TransactionMethodOptions />
              </select>
            </div>

            <div>
              <label className="form-label">Payment Amount</label>
              <input
                required
                type="number"
                name="paymentAmount"
                placeholder="Enter Payment Amount"
                className="form-input"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    paymentAmount: Number(e.target.value),
                  }))
                }
              />
            </div>

            <div>
              <label className="form-label">Current Amount</label>
              <input
                type="text"
                name="currentAmount"
                placeholder="Enter Current Amount"
                className="form-input"
                value={
                  formData.transactionType === "DEBIT"
                    ? (selectedPatient?.totalBalance || 0) -
                      Number(formData.paymentAmount || 0)
                    : formData.transactionType === "CREDIT"
                    ? (selectedPatient?.totalBalance || 0) +
                      Number(formData.paymentAmount || 0)
                    : selectedPatient?.totalBalance || 0
                }
                readOnly
              />
            </div>

            <div>
              <label className="form-label">Transaction Details</label>
              <textarea
                name="transactionDetails"
                placeholder="Enter Transaction Details"
                className="form-input w-full"
                rows="1"
                value={formData.transactionDetails}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    transactionDetails: e.target.value,
                  }))
                }
              ></textarea>
            </div>
          </div>

          <div className="mt-6">
            <button type="submit" className="btn-primary">
              <TbUserPlus className="mr-2 text-lg" />
              Create Patient Transaction
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PatientTransactionPage;
