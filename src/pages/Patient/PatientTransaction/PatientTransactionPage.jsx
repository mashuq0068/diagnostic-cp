import SectionHeader from "@/components/ui/section-header";
import { TbUserPlus } from "react-icons/tb";
const PatientTransactionPage = () => {
  return (
    <div className="mb-8">
      <div>
        <SectionHeader title={"Create Patient Transaction"} />
      </div>
      <form>
        <div className="wrapper">
          {/* Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Payment Date */}
            <div className="">
              <label className="form-label">Payment Date</label>
              <input
                type="date"
                name="payment_date"
                placeholder="Enter Payment Date"
                className="form-input text-gray-400 "
              />
            </div>

            {/* Agent */}
            <div>
              <label className="form-label">Patient</label>
              <select name="Patient" className="form-input  form-select">
                <option value="" disabled selected>
                  Choose
                </option>
                <option value="Patient 1"  className="text-black">Patient 1</option>
                <option value="Patient 2"  className="text-black">Patient 2</option>
                <option value="Patient 3"  className="text-black">Patient 3</option>
              </select>
            </div>

            {/* Balance */}
            <div>
              <label className="form-label">Balance</label>
              <input
                type="text"
                name="balance"
                placeholder="Enter Balance"
                className="form-input"
              
              />
            </div>

            {/* Transaction Type */}
            <div>
              <label className="form-label">Transaction Type</label>
              <select
                name="transaction_type"
                className="form-input  form-select"
              >
                <option value="" disabled selected>
                  Choose
                </option>
                <option value="Type 1"  className="text-black">Type 1</option>
                <option value="Type 2"  className="text-black">Type 2</option>
              </select>
            </div>

            {/* Transaction Method */}
            <div>
              <label className="form-label">Transaction Method</label>
              <select
                name="transaction_method"
                className="form-input  form-select"
              >
                <option value="" disabled selected>
                  Choose
                </option>
                <option value="Method 1" className="text-black">Method 1</option>
                <option value="Method 2" className="text-black">Method 2</option>
              </select>
            </div>

            {/* Payment Amount */}
            <div>
              <label className="form-label">Payment Amount</label>
              <input
                type="text"
                name="payment_amount"
                placeholder="Enter Payment Amount"
                className="form-input"
              />
            </div>

            {/* Current Amount */}
            <div>
              <label className="form-label">Current Amount</label>
              <input
                type="text"
                name="current_amount"
                placeholder="Enter Current Amount"
                className="form-input"
              />
            </div>

            {/* Transaction Details */}
            <div>
              <label className="form-label">Transaction Details</label>
              <textarea
                name="transaction_details"
                placeholder="Enter Transaction Details"
                className="form-input w-full"
                rows="1"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
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
