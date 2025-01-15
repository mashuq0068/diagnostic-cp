import SectionHeader from "@/components/ui/section-header";
import useLoadingStore from "@/store/loadingStore";
import { TbUserPlus } from "react-icons/tb";
import axios from "@/config/axiosConfig";
import { buildQueryParams } from "@/utility/buildQueryParams";
import { useEffect, useState } from "react";
import customStyles from "@/utility/react-select-styles";
import Select from "react-select";
import toast from "react-hot-toast";
import {
  TransactionMethodOptions,
  TransactionTypeOptions,
} from "@/utility/SelectOptions";
import { formatDateForPostgreSQL } from "@/utility/fomatDateForPostgreSQL";

const DoctorTransactionPage = () => {
  const { setLoading } = useLoadingStore();
  const [doctorOptions, setDoctorOptions] = useState();
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [formData, setFormData] = useState({
    transactionDate: "",
    transactionType: "",
    transactionMethod: "",
    paymentAmount: "",
    transactionDetails: "",
    doctorId: null,
  });

  const queryParams = {
    size: 10000,
  };

  const getAllDoctors = async () => {
    setLoading(true);
    try {
      const queryData = buildQueryParams(queryParams);
      const res = await axios.get(`/doctors?${queryData}`);
      const options = res?.data?.doctors?.map((doctor) => ({
        value: doctor.id,
        label: doctor.nameEn,
      }));
      setDoctorOptions(options);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  const handleDoctorChange = async (selectedOption) => {
    setLoading(true);
    const id = selectedOption.value;
    try {
      const res = await axios.get(`/doctors/${id}`);
      setSelectedDoctor(res?.data);
      setFormData((prev) => ({ ...prev, doctorId: id }));
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
    console.log(formData);
    try {
      await axios.post("/doctor-ledgers", formData);
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
        <SectionHeader title={"Create Doctor Transaction"} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="wrapper">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <div>
              <label className="form-label">Transaction Date</label>
              <input
                type="date"
                required
                name="payment_date"
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
              <label className="form-label">Doctor</label>
              <Select
                required
                styles={customStyles}
                options={doctorOptions}
                placeholder="Select a Doctor"
                onChange={handleDoctorChange}
                isSearchable
              />
            </div>

            <div>
              <label className="form-label">Balance</label>
              <input
                required
                type="text"
                name="balance"
                placeholder="Enter Balance"
                className="form-input"
                readOnly
                value={selectedDoctor?.total_balance}
              />
            </div>

            <div>
              <label className="form-label">Transaction Type</label>
              <select
                required
                name="transaction_type"
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
                name="transaction_method"
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
                name="payment_amount"
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
                name="current_amount"
                placeholder="Enter Current Amount"
                className="form-input"
                value={
                  formData.transactionType === "DEBIT"
                    ? (selectedDoctor?.total_balance || 0) - Number(formData.paymentAmount || 0)
                    : formData.transactionType === "CREDIT"
                    ? (selectedDoctor?.total_balance || 0) + Number(formData.paymentAmount || 0)
                    : selectedDoctor?.total_balance || 0
                }
                readOnly
              />
            </div>

            <div>
              <label className="form-label">Transaction Details</label>
              <textarea
                required
                name="transaction_details"
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
              Create Doctor Transaction
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DoctorTransactionPage;
