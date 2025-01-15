/* eslint-disable react/no-unescaped-entities */
import SectionHeader from "@/components/ui/section-header";
import useLoadingStore from "@/store/loadingStore";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import axios from "@/config/axiosConfig";
import toast from "react-hot-toast";
import { BloodGroupOptions, GenderOptions } from "@/utility/SelectOptions";
const EditPatientPage = () => {
  const [diabetics, setDiabetics] = useState(false);
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();
  const { setLoading } = useLoadingStore();
  const params = useParams();
  useEffect(() => {
    getSelectedPatient();
  }, []);

  //   handle get Selected patient
  const getSelectedPatient = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/patients/${params?.id}`);
      setPatient(res?.data);
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

    const updatedPatient = {
      fullName: form.fullName.value,
      fathersName: form.fathersName.value,
      address: form.address.value,
      dateOfBirth: form.dateOfBirth.value,
      phone: form.phone.value,
      email: form.email.value,
      gender: form.gender.value || null,
      // districtId: form.district.value,
      // upazilaId: form.upazila.value,
      emergencyContact: form.emergencyContact.value,
      weight: Number(form.weight.value),
      height: Number(form.height.value),
      bloodGroup: form.bloodGroup.value || null,
      medicalHistory: form.medicalHistory.value,
      isDiabetic: diabetics,
    };
    console.log(updatedPatient);
    setLoading(true);

    try {
      await axios.put(`/patients/${params?.id}`, updatedPatient);
      toast.success("Patient profile updated successfully!");
      navigate("/patient/view-patients");
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mb-8 text-gray-600">
      <div>
        <SectionHeader title={"Edit Patient Profile"} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="wrapper">
          <div className="lg:grid space-y-6 lg:space-y-0 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Full Name */}
            <div>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                defaultValue={patient?.fullName}
                placeholder="Enter Full Name"
                className="form-input"
              />
            </div>

            {/* Father's Name */}
            <div>
              <label className="form-label">Father's Name</label>
              <input
                defaultValue={patient?.fathersName}
                type="text"
                name="fathersName"
                placeholder="Enter Father's Name"
                className="form-input"
              />
            </div>

            {/* Address */}
            <div>
              <label className="form-label">Address</label>
              <input
                defaultValue={patient?.address}
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
                defaultValue={patient?.dateOfBirth}
                type="date"
                name="dateOfBirth"
                className="form-input"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="form-label">Phone</label>
              <input
                type="tel"
                defaultValue={patient?.phone}
                name="phone"
                placeholder="Enter Phone Number"
                className="form-input"
              />
            </div>

            {/* Email */}
            <div>
              <label className="form-label">Email</label>
              <input
                defaultValue={patient?.email}
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
                defaultValue={patient?.gender || null}
                name="gender"
                className="form-input"
              >
                {patient?.gender ? (
                  <option value={patient?.gender} selected>
                    {patient?.gender?.charAt(0).toUpperCase() +
                      patient?.gender?.slice(1).toLowerCase()}
                  </option>
                ) : (
                  <option value={""} disabled selected>
                    Choose
                  </option>
                )}
                <GenderOptions />
              </select>
            </div>

            {/* District ID */}
            {/* <div>
              <label className="form-label">District</label>
              <select
                name="district"
                className="form-input form-select"
                defaultValue={patient?.districtId?.nameEn || null}
              >
                <option
                  value={patient?.districtId?.nameEn || null}
                  disabled
                  className="text-gray-300"
                >
                  {patient?.districtId?.nameEn
                    ? patient?.districtId?.nameEn.charAt(0).toUpperCase() +
                      patient?.districtId?.nameEn.slice(1).toLowerCase()
                    : "Choose"}
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
            </div> */}

            {/* Upazila ID */}
            {/* <div>
              <label className="form-label">Upazila</label>
              <select
                name="upazila"
                className="form-input form-select"
                defaultValue={patient?.upazillaId?.nameEn || null}
              >
                <option value={patient?.upazillaId?.nameEn || null} disabled>
                  {patient?.upazillaId?.nameEn
                    ? patient?.upazillaId?.nameEn.charAt(0).toUpperCase() +
                      patient?.upazillaId?.nameEn.slice(1).toLowerCase()
                    : "Choose"}
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
            </div> */}

            {/* Emergency Contact */}
            <div>
              <label className="form-label">Emergency Contact</label>
              <input
                defaultValue={patient?.emergencyContact}
                type="tel"
                name="emergencyContact"
                placeholder="Enter Emergency Contact"
                className="form-input"
              />
            </div>

            {/* Weight */}
            <div>
              <label className="form-label">Weight</label>
              <input
                defaultValue={patient?.height}
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
                defaultValue={patient?.weight}
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
                defaultValue={patient?.bloodGroup || null}
                name="bloodGroup"
                className="form-input"
              >
                {patient?.bloodGroup ? (
                  <option value={patient?.bloodGroup} selected>
                    {patient?.bloodGroup?.charAt(0).toUpperCase() +
                      patient?.bloodGroup?.slice(1).toLowerCase()}
                  </option>
                ) : (
                  <option value={""} disabled selected>
                    Choose
                  </option>
                )}
                <BloodGroupOptions />
              </select>
            </div>
            {/* Medical History */}
            <div>
              <label className="form-label">Medical History</label>
              <textarea
                defaultValue={patient?.medicalHistory}
                name="medicalHistory"
                placeholder="Enter Medical History"
                className="form-input"
                rows={1}
              ></textarea>
            </div>

            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer mr-3">
                <input
                  type="checkbox"
                  name="isDiabetic"
                 
                  checked={patient?.isDiabetic}
                  onChange={() => setDiabetics(!diabetics)}
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
                <CiEdit className="mr-2 text-lg" />
                Edit Patient Profile
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPatientPage;
