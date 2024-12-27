/* eslint-disable react/no-unescaped-entities */

import SectionHeader from "@/components/ui/section-header";
import { useState } from "react";
import { TbUserPlus } from "react-icons/tb";
const EditProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="mb-8">
      <div>
        <SectionHeader title={"Edit Profile"} />
      </div>
      <form>
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
                type="text"
                name="name_bn"
                placeholder="বাংলায় নাম লিখুন"
                className="form-input"
              />
            </div>

            {/* Years of Experience */}
            <div>
              <label className="form-label">Years of Experience</label>
              <input
                type="text"
                name="years_of_experience"
                required
                placeholder="Enter Years of Experience"
                className="form-input"
              />
            </div>
             {/* Phone */}
             <div>
              <label className="form-label">Phone</label>
              <input
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
                type="text"
                name="nagad_account"
                placeholder="Enter Nagad Account"
                className="form-input"
              />
            </div>

            {/* District ID */}
            <div>
              <label className="form-label">District</label>
              <select name="district_id" className="form-input form-select">
                <option value="" disabled selected className="text-gray-300">
                  Choose
                </option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Khulna">Khulna</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Barisal">Barisal</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Mymensingh">Mymensingh</option>
              </select>
            </div>

            {/* Upazila ID */}
            <div>
              <label className="form-label">Upazila</label>
              <select name="upazila_id" className="form-input form-select">
                <option disabled selected value="">
                  Choose
                </option>
                <option value="Sadar">Sadar</option>
                <option value="Mirpur">Mirpur</option>
                <option value="Cox's Bazar">Cox's Bazar</option>
                <option value="Upojela">Upojela</option>
                <option value="Kaliganj">Kaliganj</option>
                <option value="Bogra">Bogra</option>
                <option value="Chandpur">Chandpur</option>
                <option value="Madhabkunda">Madhabkunda</option>
              </select>
            </div>

            {/* Rate of Visit */}
            <div>
              <label className="form-label">Rate of Visit</label>
              <input
                type="text"
                name="rate_of_visit"
                placeholder="Enter Rate of Visit"
                className="form-input"
              />
            </div>

            {/* Initial Balance */}
            <div>
              <label className="form-label">Initial Balance</label>
              <input
                type="text"
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
                name="bmdc_text"
                required
                placeholder="Enter BMDC No"
                className="form-input"
              />
            </div>

            {/* Commission Percentage */}
            <div>
              <label className="form-label">Commission Percentage</label>
              <input
                type="text"
                name="commission_percentage"
                placeholder="Enter Commission Percentage"
                className="form-input"
              />
            </div>

            {/* Assistant Name */}
            <div>
              <label className="form-label">Assistant Name</label>
              <input
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
                type="tel"
                name="assistant_phone"
                placeholder="Enter Assistant Phone"
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
                Edit Your Profile
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
