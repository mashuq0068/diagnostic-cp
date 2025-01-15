/* eslint-disable react/no-unescaped-entities */
import SectionHeader from "@/components/ui/section-header";
import {
  DistrictOptions,
  SpecialityOptions,
  UpazilaOptions,
} from "@/utility/SelectOptions";
import { useState } from "react";
import { TbUserPlus } from "react-icons/tb";
import axios from "@/config/axiosConfig";
import toast from "react-hot-toast";
import useLoadingStore from "@/store/loadingStore";
import { useNavigate } from "react-router-dom";

const CreateDoctorPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { setLoading } = useLoadingStore();
  const navigate = useNavigate();

  // initial State For Form Data
  const initialState = {
    nameEn: null,
    nameBn: null,
    yearsOfExperience: null,
    phone: null,
    email: null,
    bankAccount: null,
    bkashAccount: null,
    nagadAccount: null,
    districtId: null,
    upazilaId: null,
    specialityId: null,
    rateOfVisit: null,
    total_balance: null,
    bmdcNumber: null,
    commissionPercentage: null,
    assistantName: null,
    assistantPhone: null,
  };
  const [formData, setFormData] = useState(initialState);

  console.log(formData);
  const handleImageChange = (e) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/doctors", formData);
      toast.success("Doctor Created Successfully");
      // clearing current data
      setFormData({ ...initialState });
      navigate("/doctor/view-doctors");
      toast.success("Doctor created successfully");
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
        <SectionHeader title={"Create Doctor Profile"} />
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
                required
                type="text"
                name="name_en"
                placeholder="Enter Name in English"
                onChange={(e) => {
                  setFormData({ ...formData, nameEn: e.target.value });
                }}
                className="form-input"
              />
            </div>

            {/* Name (Bangla) */}
            <div>
              <label className="form-label">Name (Bangla)</label>
              <input
                required
                type="text"
                name="name_bn"
                placeholder="বাংলায় নাম লিখুন"
                className="form-input"
                onChange={(e) => {
                  setFormData({ ...formData, nameBn: e.target.value });
                }}
              />
            </div>

            {/* Years of Experience */}
            <div>
              <label className="form-label">Years of Experience</label>
              <input
                required
                type="number"
                name="years_of_experience"
                placeholder="Enter Years of Experience"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    yearsOfExperience: Number(e.target.value),
                  });
                }}
                className="form-input"
              />
            </div>
            {/* Phone */}
            <div>
              <label className="form-label">Phone</label>
              <input
                required
                type="number"
                name="phone"
                placeholder="Enter Phone Number"
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                }}
                className="form-input"
              />
            </div>
            {/* email */}
            <div>
              <label className="form-label">Email</label>
              <input
                required
                type="email"
                name="email"
                placeholder="Enter Email"
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
                className="form-input"
              />
            </div>

            {/* Bank Account */}
            <div>
              <label className="form-label">Bank Account</label>
              <input
                type="number"
                name="bank_account"
                placeholder="Enter Bank Account"
                onChange={(e) => {
                  setFormData({ ...formData, bankAccount: e.target.value });
                }}
                className="form-input"
              />
            </div>

            {/* BKash Account */}
            <div>
              <label className="form-label">BKash Account</label>
              <input
                type="number"
                name="bkash_account"
                placeholder="Enter BKash Account"
                onChange={(e) => {
                  setFormData({ ...formData, bkashAccount: e.target.value });
                }}
                className="form-input"
              />
            </div>

            {/* Nagad Account */}
            <div>
              <label className="form-label">Nagad Account</label>
              <input
                type="number"
                name="nagad_account"
                placeholder="Enter Nagad Account"
                onChange={(e) => {
                  setFormData({ ...formData, nagadAccount: e.target.value });
                }}
                className="form-input"
              />
            </div>

            {/* District */}
            <div>
              <label className="form-label">District</label>
              <DistrictOptions
                defaultValue={formData?.districtId}
                onDistrictChange={handleDistrictChange}
              />
            </div>

            {/* Upazila */}
            <div>
              <label className="form-label">Upazila</label>
              <UpazilaOptions
                defaultValue={formData?.upazilaId}
                districtId={formData?.districtId}
                onUpazilaChange={handleUpazilaChange}
              />
            </div>

            {/* speciality */}
            <div>
              <label className="form-label">Speciality</label>
              <select
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    specialityId: Number(e.target.value),
                  });
                }}
                name="speaciality"
                className="form-input form-select"
              >
                <option disabled selected value="">
                  Choose
                </option>
                <SpecialityOptions />
              </select>
            </div>

            {/* Rate of Visit */}
            <div>
              <label className="form-label">Rate of Visit</label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    rateOfVisit: Number(e.target.value),
                  });
                }}
                type="number"
                name="rate_of_visit"
                placeholder="Enter Rate of Visit"
                className="form-input"
              />
            </div>

            {/* Initial Balance */}
            <div>
              <label className="form-label">Initial Balance</label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    total_balance: Number(e.target.value),
                  });
                }}
                type="number"
                name="initial_balance"
                placeholder="Enter Initial Balance"
                className="form-input"
              />
            </div>

            {/* BMDC No */}
            <div>
              <label className="form-label">BMDC No</label>
              <input
                type="text"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    bmdcNumber: e.target.value,
                  });
                }}
                name="bmdc_text"
                placeholder="Enter BMDC No"
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
                type="number"
                name="commission_percentage"
                placeholder="Enter Commission Percentage"
                className="form-input"
              />
            </div>

            {/* Assistant Name */}
            <div>
              <label className="form-label">Assistant Name</label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    assistantName: e.target.value,
                  });
                }}
                type="text"
                name="assistant_name"
                placeholder="Enter Assistant Name"
                className="form-input"
              />
            </div>

            {/* Assistant Phone */}
            <div>
              <label className="form-label">Assistant Phone</label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    assistantPhone: e.target.value,
                  });
                }}
                type="number"
                name="assistant_phone"
                placeholder="Enter Assistant Phone"
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className=" mb-3 mt-8 md:col-span-3">
          <button
            type="submit"
            className="flex items-center px-4 bg-primary text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:outline-2 focus:outline-primary focus:outline-opacity-50 transition duration-200 ease-in-out"
          >
            <TbUserPlus className="mr-2 text-lg" />
            Create Doctor Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDoctorPage;
