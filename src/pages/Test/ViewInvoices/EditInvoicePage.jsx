/* eslint-disable react/no-unescaped-entities */
import SectionHeader from "@/components/ui/section-header";
import useLoadingStore from "@/store/loadingStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "@/config/axiosConfig";
import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";
import { PaymentStatusOptions } from "@/utility/SelectOptions";
import { formatDate, unFormatDate } from "@/utility/formatDate";

const EditInvoicePage = () => {
  const [invoice, setInvoice] = useState(null);
  const { setLoading } = useLoadingStore();
  const params = useParams();

  useEffect(() => {
    getSelectedInvoice();
  }, []);

  // Handle get selected invoice
  const getSelectedInvoice = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/invoices/${params?.id}`);
      setInvoice(res?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedInvoice = {
      invoiceDate: unFormatDate(form.invoiceDate.value),
      //   patientName: form.patientName.value,
      totalPayment: Number(form.totalPayment.value),
      amountPaid: Number(form.amountPaid.value),
      discount: Number(form.discount.value),
      dueAmount: Number(form.dueAmount.value),
      paymentStatus: form.paymentStatus.value,
    };
    try {
      setLoading(true);
      await axios.put(`/invoices/${params?.id}`, updatedInvoice);
      toast.success("Invoice updated successfully!");
    } catch (error) {
      console.error("Error updating invoice:", error);
      toast.error(error?.message || "Failed to update invoice.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 text-gray-600">
      <div>
        <SectionHeader title={"Edit Invoice"} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="wrapper">
          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Invoice Date */}
            <div>
              <label className="form-label">Invoice Date</label>
              <input
                defaultValue={formatDate(invoice?.invoiceDate)}
                type="date"
                name="invoiceDate"
                placeholder="Enter Invoice Date"
                className="form-input"
              />
            </div>

            {/* Patient Name */}
            <div>
              <label className="form-label">Patient Name</label>
              <input
                defaultValue={invoice?.patient?.fullName}
                type="text"
                name="patientName"
                placeholder="Enter Patient Name"
                className="form-input"
              />
            </div>

            {/* Total Payment */}
            <div>
              <label className="form-label">Total Payment</label>
              <input
                defaultValue={invoice?.totalPayment}
                type="text"
                name="totalPayment"
                placeholder="Enter Total Payment"
                className="form-input"
              />
            </div>

            {/* Amount Paid */}
            <div>
              <label className="form-label">Amount Paid</label>
              <input
                defaultValue={invoice?.amountPaid}
                type="text"
                name="amountPaid"
                placeholder="Enter Amount Paid"
                className="form-input"
              />
            </div>

            {/* Discount */}
            <div>
              <label className="form-label">Discount</label>
              <input
                defaultValue={invoice?.discount}
                type="text"
                name="discount"
                placeholder="Enter Discount"
                className="form-input"
              />
            </div>

            {/* Due Amount */}
            <div>
              <label className="form-label">Due Amount</label>
              <input
                defaultValue={invoice?.dueAmount}
                type="text"
                name="dueAmount"
                placeholder="Enter Due Amount"
                className="form-input"
              />
            </div>

            {/* Payment Status */}
            {/* Payment Status */}
            <div>
              <label className="form-label">Payment Status</label>
              <select
                name="paymentStatus"
                defaultValue={invoice?.paymentStatus || ""}
                className="form-input form-select"
              >
                <option value={invoice?.paymentStatus || ""}>
                  {" "}
                  {invoice?.paymentStatus
                    ? invoice?.paymentStatus.charAt(0).toUpperCase() +
                      invoice?.paymentStatus.slice(1).toLowerCase()
                    : "Choose"}
                </option>
                <PaymentStatusOptions />
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button type="submit" className="btn-primary">
              <CiEdit className="mr-2 text-lg" />
              Edit Invoice
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditInvoicePage;
