/* eslint-disable react/no-unescaped-entities */
import SectionHeader from "@/components/ui/section-header";
import { useState } from "react";
import toast from "react-hot-toast";
import { TbUserPlus } from "react-icons/tb";
import axios from "@/config/axiosConfig";
import useLoadingStore from "@/store/loadingStore";
import { useNavigate } from "react-router-dom";
import { DistrictOptions, UpazilaOptions } from "@/utility/SelectOptions";
const initialState = {
  nameEn: null,
  nameBn: null,
  phone: null,
  email: null,
  bankAccount: null,
  bkashAccount: null,
  nagadAccount: null,
  districtId: null,
  upazilaId: null,
  initialBalance: null,
  commissionPercentage: null,
};

const CreateAgentPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const { setLoading } = useLoadingStore();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/agents", formData);
      toast.success("Agent Created Successfully");
      // clearing current data
      setFormData({ ...initialState });
      toast.success("Agent created successfully");
      navigate("/agent/view-agents");
    } catch (error) {
      toast.error(error.message || "something wrong");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handleDistrictChange = (selectedOption) => {
    setFormData({
      ...formData,
      districtId: selectedOption?.value || null,
    });
  };

  const handleUpazilaChange = (selectedOption) => {
    setFormData({
      ...formData,
      upazilaId: selectedOption?.value || null,
    });
  };

  //
  return (
    <div className="mb-8">
      <div>
        <SectionHeader title={"Create Agent Profile"} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="wrapper">
          <div className="max-w-md w-full mb-8">
            <div className="">
              <label className="block pb-3 text-sm font-medium form-label text-gray-700">
                Upload Profile Image
              </label>

              {/* Wrapper label for the entire box to make it clickable */}
              <label
                htmlFor="file-upload"
                className=" flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-primary transition duration-200 ease-in-out"
              >
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleImageChange}
                />
                <div className="space-y-1 text-center">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="h-48 w-auto mx-auto rounded"
                    />
                  ) : (
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H20a4 4 0 00-4 4v1H8a4 4 0 00-4 4v18a4 4 0 004 4h32a4 4 0 004-4V17a4 4 0 00-4-4h-8v-1a4 4 0 00-4-4z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 29l7 7 7-7M14 17v20"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <div className="flex text-sm text-gray-600">
                    <span className="bg-white rounded-md font-medium text-primary hover:text-primary-dark">
                      Upload Profile Image
                    </span>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </label>
            </div>
          </div>
          <div className="lg:grid space-y-6 lg:space-y-0 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Name (English) */}
            <div>
              <label className="form-label">Name (English)</label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    nameEn: e.target.value,
                  });
                }}
                type="text"
                name="name_en"
                placeholder="Enter Name in English"
                className="form-input"
              />
            </div>

            {/* Name (Bangla) */}
            <div>
              <label className="form-label">Name (Bangla)</label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    nameBn: e.target.value,
                  });
                }}
                type="text"
                name="name_bn"
                placeholder="বাংলায় নাম লিখুন"
                className="form-input"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="form-label">Phone</label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  });
                }}
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
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  });
                }}
                type="email"
                name="email"
                placeholder="Enter Phone Number"
                className="form-input"
              />
            </div>

            {/* Bank Account */}
            <div>
              <label className="form-label">Bank Account</label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    bankAccount: e.target.value,
                  });
                }}
                type="text"
                name="bank_account"
                placeholder="Enter Bank Account"
                className="form-input"
              />
            </div>

            {/* BKash Account */}
            <div>
              <label className="form-label">BKash Account</label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    bkashAccount: e.target.value,
                  });
                }}
                type="text"
                name="bkash_account"
                placeholder="Enter BKash Account"
                className="form-input"
              />
            </div>

            {/* Nagad Account */}
            <div>
              <label className="form-label">Nagad Account</label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    nagadAccount: e.target.value,
                  });
                }}
                type="text"
                name="nagad_account"
                placeholder="Enter Nagad Account"
                className="form-input"
              />
            </div>

            {/* District */}
            <div>
              <label className="form-label">District</label>
              <DistrictOptions
                defaultValue={formData.districtId}
                onDistrictChange={handleDistrictChange}
              />
            </div>

            {/* Upazila */}
            <div>
              <label className="form-label">Upazila</label>
              <UpazilaOptions
                defaultValue={formData.upazilaId}
                districtId={formData.districtId}
                onUpazilaChange={handleUpazilaChange}
              />
            </div>

            {/* Initial Balance */}
            <div>
              <label className="form-label">Initial Balance</label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    initialBalance: Number(e.target.value),
                  });
                }}
                type="text"
                name="initial_balance"
                placeholder="Enter Initial Balance"
                className="form-input"
              />
            </div>

            {/* Commission Percentage */}
            <div>
              <label className="form-label">Commission Percentage</label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    commissionPercentage: Number(e.target.value),
                  });
                }}
                type="text"
                name="commission_percentage"
                placeholder="Enter Commission Percentage"
                className="form-input"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-1 mb-3 md:col-span-3">
              <button
                type="submit"
                className="flex items-center px-4 bg-primary text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:outline-2 focus:outline-primary focus:outline-opacity-50 transition duration-200 ease-in-out"
              >
                <TbUserPlus className="mr-2 text-lg" />
                Create Agent Profile
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateAgentPage;
