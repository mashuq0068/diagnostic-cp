/* eslint-disable react/no-unescaped-entities */
import SectionHeader from "@/components/ui/section-header";
import { useState } from "react";
import { TbUserPlus } from "react-icons/tb";
import axios from "@/config/axiosConfig";
import toast from "react-hot-toast";
import useLoadingStore from "@/store/loadingStore";
import { BloodGroupOptions, GenderOptions } from "@/utility/SelectOptions";
import { useNavigate } from "react-router-dom";

const initialState = {
  fullName: null,
  fathersName: null,
  address: null,
  dateOfBirth: null,
  phone: null,
  email: null,
  gender: null,
  // districtId: null,
  // upazilId: null,
  emergencyContact: null,
  weight: null,
  height: null,
  bloodGroup: null,
  medicalHistory: null,
  isDiabetic: false,
};
const CreatePatientPage = () => {
  const [formData, setFormData] = useState(initialState);
  const { setLoading } = useLoadingStore();
  const navigate = useNavigate();

  // create patient
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/patients", formData);
      toast.success("Patient Created Successfully");
      // clearing current data

      setFormData({ ...initialState });
      navigate("/patient/view-patients");
      toast.success("patient created successfully");
    } catch (error) {
      toast.error(error.message || "something wrong");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <div>
        <SectionHeader title={"Create Patient Profile"} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="wrapper">
          <div className="lg:grid space-y-6 lg:space-y-0 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Full Name */}
            <div>
              <label className="form-label">Full Name</label>
              <input
                required
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    fullName: e.target.value,
                  });
                }}
                type="text"
                name="full_name"
                placeholder="Enter Full Name"
                className="form-input"
              />
            </div>

            {/* Father's Name */}
            <div>
              <label className="form-label">Father's Name</label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    fathersName: e.target.value,
                  });
                }}
                required
                type="text"
                name="father_name"
                placeholder="Enter Father's Name"
                className="form-input"
              />
            </div>

            {/* Address */}
            <div>
              <label className="form-label">Address</label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  });
                }}
                type="text"
                name="address"
                placeholder="Enter Address"
                className="form-input"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="form-label text-gray-400 focus:text-black">
                Date of Birth
              </label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    dateOfBirth: e.target.value,
                  });
                }}
                type="date"
                name="date_of_birth"
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
                required
                type="number"
                name="phone"
                placeholder="Enter Phone Number"
                className="form-input"
              />
            </div>

            {/* Email */}
            <div>
              <label className="form-label">Email</label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  });
                }}
                required
                type="email"
                name="email"
                placeholder="Enter Email"
                className="form-input"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="form-label">Gender</label>
              <select
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    gender: e.target.value,
                  });
                }}
                required
                name="gender"
                className="form-input"
              >
                <option value="">Choose</option>
                <GenderOptions />
              </select>
            </div>

            {/* District */}
            {/* <div>
              <label className="form-label">District</label>
              <select
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    districtId: Number(e.target.value),
                  });
                }}
                name="district"
                className="form-input form-select"
              >
                <option value="" disabled selected>
                  Choose
                </option>
                <option value="1">Dhaka</option>
                <option value="1">Chittagong</option>
                <option value="1">Khulna</option>
              
              </select>
            </div> */}

            {/* Upazilla */}
            {/* <div>
              <label className="form-label">Upazilla</label>
              <select
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    upazilaId:Number(e.target.value)
                  });
                }}
                name="upazilla"
                className="form-input form-select"
              >
                <option value="" disabled selected>
                  Choose
                </option>
                <option value="1">Sadar</option>
                <option value="1">Mirpur</option>
                
              </select>
            </div> */}

            {/* Emergency Contact */}
            <div>
              <label className="form-label">Emergency Contact</label>
              <input
                required
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    emergencyContact: e.target.value,
                  });
                }}
                type="tel"
                name="emergency_contact"
                placeholder="Enter Emergency Contact"
                className="form-input"
              />
            </div>

            {/* Weight */}
            <div>
              <label className="form-label">Weight</label>
              <input
                required
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    weight: Number(e.target.value),
                  });
                }}
                type="text"
                name="weight"
                placeholder="Enter Weight (e.g., 70 kg)"
                className="form-input"
              />
            </div>

            {/* Height */}
            <div>
              <label className="form-label">Height</label>
              <input
                required
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    height: Number(e.target.value),
                  });
                }}
                type="text"
                name="height"
                placeholder="Enter Height (e.g., 5'8\)"
                className="form-input"
              />
            </div>

            {/* Blood Group */}
            <div>
              <label className="form-label">Blood Group</label>
              <select
                required
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    bloodGroup: e.target.value,
                  });
                }}
                name="blood_group"
                className="form-input form-select"
              >
                <option value="" disabled selected>
                  Choose
                </option>
                <BloodGroupOptions />
              </select>
            </div>

            {/* Medical History */}
            <div>
              <label className="form-label">Medical History</label>
              <textarea
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    medicalHistory: e.target.value,
                  });
                }}
                name="medical_history"
                placeholder="Enter Medical History"
                className="form-input"
                rows={1}
              ></textarea>
            </div>

            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer mr-3">
                <input
                  onChange={() => {
                    setFormData((prevState) => ({
                      ...prevState,
                      isDiabetic: !prevState.isDiabetic,
                    }));
                  }}
                  type="checkbox"
                  name="diabetics"
                  checked={formData.isDiabetic}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-primary peer-checked:before:translate-x-5 before:content-[''] before:absolute before:top-0.5 before:left-[2px] before:bg-white before:border before:border-gray-300 before:rounded-full before:h-5 before:w-5 before:transition-transform"></div>
              </label>
              <label className="form-label">Diabetics</label>
            </div>

            {/* Submit Button */}
            <div className="mt-4 md:col-span-3">
              <button
                type="submit"
                className="flex items-center px-4 bg-primary text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:outline-2 focus:outline-primary focus:outline-opacity-50 transition duration-200 ease-in-out"
              >
                <TbUserPlus className="mr-2 text-lg" />
                Create Patient Profile
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePatientPage;
