import SectionHeader from "@/components/ui/section-header";
import { TbUserPlus } from "react-icons/tb";

const NewExpensePage = () => {
  return (
    <div className="mb-8">
      <div>
        <SectionHeader title={"New Expense"} />
      </div>
      <form>
        <div className="wrapper">
          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            
          <div>
            <label className="form-label">Expense Category</label>
            <select className="form-input">
              <option value="">Select Category</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
              <option value="office_supplies">Office Supplies</option>
            </select>
          </div>

          <div>
            <label className="form-label">Commission</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter Commission Amount"
            />
          </div>

          <div>
            <label className="form-label">Vendor</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter Vendor Name"
            />
          </div>

          <div>
            <label className="form-label">Expense Date</label>
            <input type="date" className="form-input" />
          </div>

          <div>
            <label className="form-label">Expense Status</label>
            <select className="form-input">
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          <div>
            <label className="form-label">Payment Method</label>
            <select className="form-input">
              <option value="">Select Payment Method</option>
              <option value="cash">Cash</option>
              <option value="credit_card">Credit Card</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </div>

          <div>
            <label className="form-label">Description</label>
            <textarea
              className="form-input"
              placeholder="Enter Description"
            ></textarea>
          </div>

          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button type="submit" className="btn-primary">
              <TbUserPlus className="mr-2 text-lg" />
              Create New Expense
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewExpensePage;
