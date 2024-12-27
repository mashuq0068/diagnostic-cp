/* eslint-disable react/no-unescaped-entities */
import SectionHeader from "@/components/ui/section-header";
import useLoadingStore from "@/store/loadingStore";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import axios from "@/config/axiosConfig";
import toast from "react-hot-toast";
import { DistrictOptions, UpazilaOptions } from "@/utility/SelectOptions";
const EditAgentPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [agent, setAgent] = useState(null);
  const navigate = useNavigate();
  const [location, setLocation] = useState({
    districtId: null,
    upazilaId: null,
  });
  console.log(agent);

  const { setLoading } = useLoadingStore();
  const params = useParams();
  useEffect(() => {
    getSelectedAgent();
  }, []);

  //   handle Image change
  const handleImageChange = (e) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  //   handle get Selected agent
  const getSelectedAgent = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`/agents/${params?.id}`);
      setAgent(res?.data);
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

    const updatedAgent = {
      nameEn: form.nameEn.value,
      nameBn: form.nameBn.value,
      phone: form.phone.value,
      email: form.email.value,
      bankAccount: form.bankAccount.value,
      bkashAccount: form.bkashAccount.value,
      nagadAccount: form.nagadAccount.value,
      districtId: Number(location.districtId) || agent.districtId,
      upazilaId: Number(location.upazilaId) || agent.upazilaId,
      initialBalance: Number(form.initialBalance.value),
      commissionPercentage: Number(form.commissionPercentage.value),
    };
    console.log(updatedAgent);

    try {
      // setLoading(true);
      await axios.put(`/agents/${params?.id}`, updatedAgent);
      navigate("/agent/view-agents");
      toast.success("Agent profile updated successfully!");
      setLoading(false)
    } catch (error) {
      toast.error(error?.message || "Something Wrong");
      setLoading(false)    
    }
  };
  // district change
  const handleDistrictChange = (selectedOption) => {
    setLocation({
      ...location,
      districtId: selectedOption.value,
    });
  };
  // upazila change
  const handleUpazilaChange = (selectedOption) => {
    setLocation({
      ...location,
      upazilaId: selectedOption.value,
    });
  };

  return (
    <div className="mb-8 text-gray-600">
      <div>
        <SectionHeader title={"Edit Agent Profile"} />
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
                type="text"
                name="nameEn"
                placeholder="Enter Name in English"
                className="form-input"
                defaultValue={agent?.nameEn || ""}
              />
            </div>

            {/* Name (Bangla) */}
            <div>
              <label className="form-label">Name (Bangla)</label>
              <input
                type="text"
                name="nameBn"
                placeholder="বাংলায় নাম লিখুন"
                className="form-input"
                defaultValue={agent?.nameBn || ""}
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
                defaultValue={agent?.user?.phone || ""}
              />
            </div>

            {/* Email */}
            <div>
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="form-input"
                defaultValue={agent?.user?.email || ""}
              />
            </div>

            {/* Bank Account */}
            <div>
              <label className="form-label">Bank Account</label>
              <input
                type="text"
                name="bankAccount"
                placeholder="Enter Bank Account"
                className="form-input"
                defaultValue={agent?.bankAccount || ""}
              />
            </div>

            {/* BKash Account */}
            <div>
              <label className="form-label">BKash Account</label>
              <input
                type="text"
                name="bkashAccount"
                placeholder="Enter BKash Account"
                className="form-input"
                defaultValue={agent?.bkashAccount || ""}
              />
            </div>

            {/* Nagad Account */}
            <div>
              <label className="form-label">Nagad Account</label>
              <input
                type="text"
                name="nagadAccount"
                placeholder="Enter Nagad Account"
                className="form-input"
                defaultValue={agent?.nagadAccount || ""}
              />
            </div>

            {/* District */}
            <div>
              <label className="form-label">District</label>
              <DistrictOptions
                defaultValue={location.districtId || agent?.districtId}
                onDistrictChange={handleDistrictChange}
              />
            </div>

            {/* Upazila */}
            <div>
              <label className="form-label">Upazila</label>
              <UpazilaOptions
                defaultValue={location.upazilaId || agent?.upazilaId}
                districtId={agent?.districtId}
                onUpazilaChange={handleUpazilaChange}
              />
            </div>

            {/* Initial Balance */}
            <div>
              <label className="form-label">Initial Balance</label>
              <input
                type="text"
                name="initialBalance"
                placeholder="Enter Initial Balance"
                className="form-input"
                defaultValue={agent?.initialBalance || ""}
              />
            </div>

            {/* Commission Percentage */}
            <div>
              <label className="form-label">Commission Percentage</label>
              <input
                type="text"
                name="commissionPercentage"
                placeholder="Enter Commission Percentage"
                className="form-input"
                defaultValue={agent?.commissionPercentage || ""}
              />
            </div>

            {/* Submit Button */}
            <div className="mt-1 mb-3 md:col-span-3">
              <button
                type="submit"
                className="flex items-center px-4 bg-primary text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:outline-2 focus:outline-primary focus:outline-opacity-50 transition duration-200 ease-in-out"
              >
                <CiEdit className="mr-2 text-lg" />
                Edit Agent Profile
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditAgentPage;
