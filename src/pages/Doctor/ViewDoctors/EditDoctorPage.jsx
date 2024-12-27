/* eslint-disable react/no-unescaped-entities */
import SectionHeader from "@/components/ui/section-header";
import useLoadingStore from "@/store/loadingStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "@/config/axiosConfig";
import { TbPlus, TbTrash } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";
import {
  DegreeOptions,
  DistrictOptions,
  InstitutionOptions,
  SpecialityOptions,
  UpazilaOptions,
} from "@/utility/SelectOptions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
const EditDoctorPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [speciality, setSpeciality] = useState();
  const { setLoading } = useLoadingStore();
  const [location, setLocation] = useState({
    districtId: null,
    upazilaId: null,
  });
  const params = useParams();
  // State for modal inputs
  const [educationForm, setEducationForm] = useState({
    degreeId: null,
    institutionId: null,
    startDate: null,
    endDate: null,
  });
  const [doctor, setDoctor] = useState(null);
  const [educationList, setEducationList] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  console.log(educationList);

  // useEffect
  useEffect(() => {
    getSelectedDoctor();
    getDoctorEducation();
    getAllTimeSlots();
  }, []);

  // Add a new time slot
  // Add a new time slot at the top
  const addTimeSlot = () => {
    const newTimeSlot = {
      day: "",
      startTime: "",
      endTime: "",
      // doctorId: Number(params?.id),
    };

    // Add the new time slot to the top (index 0)
    setTimeSlots([newTimeSlot, ...timeSlots]);
  };

  // get all time slots
  const getAllTimeSlots = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/doctors/${params.id}/schedules`);
      const formattedTimeSlots = res?.data?.map((slot) => ({
        id: slot.id,
        startTime: slot.startTime,
        endTime: slot.endTime,
        // doctorId: slot.doctorId || Number(params.id),
        day: slot.day,
      }));

      setTimeSlots(formattedTimeSlots);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // Remove a time slot
  const removeTimeSlot = (index) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  // Update a specific time slot field
  //   update time slot
  const updateTimeSlot = (index, field, value) => {
    const updatedList = [...timeSlots];
    updatedList[index][field] = value;
    setTimeSlots(updatedList);
  };

  // Save time slots to the server
  const saveTimeSlots = async () => {
    setLoading(true);
    console.log(timeSlots);
    try {
      await axios.post(`/doctors/${params.id}/schedules`, timeSlots);

      toast.success("Time Slots Saved Successfully");
    } catch (error) {
      console.error("Error saving time slots:", error);
      toast.error("An error occurred while saving time slots.");
    } finally {
      setLoading(false);
    }
  };

  //   handle Image change
  const handleImageChange = (e) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  //   handle get Selected doctor
  const getSelectedDoctor = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/doctors/${params?.id}`);
      setDoctor(res?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  //   handle get Selected doctor
  const getDoctorEducation = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/doctors/${params.id}/degrees`);
      console.log(res);
      setEducationList(res?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Validate modal inputs and add to educationList
  const handleAddEducation = async () => {
    const { degreeId, institutionId, startDate, endDate } = educationForm;
    if (!degreeId || !institutionId || !startDate || !endDate) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`/doctors/${params.id}/degrees`, educationForm);
      toast.success("Education added successfully!");
      setEducationForm({
        degreeId: null,
        institutionId: null,
        startDate: null,
        endDate: null,
      });
      setIsAddModalOpen(false);
      setLoading(false);
    } catch (error) {
      console.error("Error adding education:", error);
      toast.error("An error occurred while adding education.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  // Validate modal inputs and add to educationList
  const handleEditEducation = async (education) => {
    setLoading(true);
    try {
      const educationForm = {
        degreeId: educationForm.degreeId || education?.degreeId,
        institutionId: educationForm.institutionId || education?.institutionId,
        startDate: educationForm.startDate || education?.startDate,
        endDate: educationForm.endDate || education?.endDate,
      };
      await axios.put(`/doctors/${params.id}/degrees`, educationForm);
      toast.success("Education updated successfully!");
      setEducationForm({
        degreeId: null,
        institutionId: null,
        startDate: null,
        endDate: null,
      });
      setIsAddModalOpen(false);
      setLoading(false);
    } catch (error) {
      console.error("Error adding education:", error);
      toast.error("An error occurred while adding education.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // handleDelete
  const handleDeleteEducation = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/doctors/${id}/degrees`);
      toast.success("Doctor Deleted Successfully");
      getDoctorEducation();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // handle edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    const form = e.target;
    const updatedFormData = {
      nameEn: form.nameEn.value,
      nameBn: form.nameBn.value,
      yearsOfExperience: Number(form.yearsOfExperience.value),
      phone: form.phone.value,
      email: form.email.value,
      bankAccount: form.bankAccount.value,
      bkashAccount: form.bkashAccount.value,
      nagadAccount: form.nagadAccount.value,
      districtId: Number(location.dispatchId) || doctor.districtId,
      upazilaId: Number(location.upazilaId) || doctor.upazilaId,
      specialityId: Number(form.speciality.value),
      rateOfVisit: Number(form.rateOfVisit.value),
      initialBalance: Number(form.initialBalance.value),
      bmdcNo: form.bmdcNo.value,
      commissionPercentage: Number(form.commissionPercentage.value),
      assistantName: form.assistantName.value,
      assistantPhone: form.assistantPhone.value,
    };

    try {
      await axios.put(`/doctors/${params.id}`, updatedFormData);
      toast.success("Doctor Updated Successfully");
    } catch (error) {
      toast.error(error.message || "something wrong");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  // institutions
  const handleInstitutionChange = (selectedOption) => {
    setEducationForm({
      ...educationForm,
      institutionId: selectedOption?.value || null,
    });
  };
  // institutions
  const handleDegreeChange = (selectedOption) => {
    setEducationForm({
      ...educationForm,
      degreeId: selectedOption?.value || null,
    });
  };
  const handleSpecialityChange = (selectedOption) => {
    setSpeciality(selectedOption);
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
        <SectionHeader title={"Edit Doctor Profile"} />
      </div>
      {/* doctor profile form */}
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
                defaultValue={doctor?.nameEn || ""}
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
                defaultValue={doctor?.nameBn || ""}
              />
            </div>

            {/* Years of Experience */}
            <div>
              <label className="form-label">Years of Experience</label>
              <input
                type="number"
                name="yearsOfExperience"
                placeholder="Enter Years of Experience"
                className="form-input"
                defaultValue={doctor?.yearsOfExperience || ""}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="form-label">Phone</label>
              <input
                type="number"
                name="phone"
                placeholder="Enter Phone Number"
                className="form-input"
                defaultValue={doctor?.user?.phone || ""}
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
                defaultValue={doctor?.user?.email || ""}
              />
            </div>

            {/* Bank Account */}
            <div>
              <label className="form-label">Bank Account</label>
              <input
                type="number"
                name="bankAccount"
                placeholder="Enter Bank Account"
                className="form-input"
                defaultValue={doctor?.bankAccount || ""}
              />
            </div>

            {/* BKash Account */}
            <div>
              <label className="form-label">BKash Account</label>
              <input
                type="number"
                name="bkashAccount"
                placeholder="Enter BKash Account"
                className="form-input"
                defaultValue={doctor?.bkashAccount || ""}
              />
            </div>

            {/* Nagad Account */}
            <div>
              <label className="form-label">Nagad Account</label>
              <input
                type="number"
                name="nagadAccount"
                placeholder="Enter Nagad Account"
                className="form-input"
                defaultValue={doctor?.nagadAccount || ""}
              />
            </div>

            {/* District */}
            <div>
              <label className="form-label">District</label>
              <DistrictOptions
                defaultValue={location?.districtId || doctor?.districtId}
                onDistrictChange={handleDistrictChange}
              />
            </div>

            {/* Upazila */}
            <div>
              <label className="form-label">Upazila</label>
              <UpazilaOptions
                defaultValue={location?.upazilaId || doctor?.upazilaId}
                districtId={doctor?.districtId}
                onUpazilaChange={handleUpazilaChange}
              />
            </div>

            {/* speciality */}
            <div>
              <label className="form-label">Speciality</label>
              <select name="speciality" className="form-input form-select">
                <option selected value={doctor?.speciality?.nameEn || ""}>
                  {doctor?.speciality?.nameEn
                    ? doctor?.speciality?.nameEn.charAt(0).toUpperCase() +
                      doctor?.speciality?.nameEn.slice(1).toLowerCase()
                    : "Choose"}
                </option>
                <SpecialityOptions />
              </select>
            </div>
            {/* Rate of Visit */}
            <div>
              <label className="form-label">Rate of Visit</label>
              <input
                type="number"
                name="rateOfVisit"
                placeholder="Enter Rate of Visit"
                className="form-input"
                defaultValue={doctor?.rateOfVisit || ""}
              />
            </div>

            {/* Initial Balance */}
            <div>
              <label className="form-label">Initial Balance</label>
              <input
                type="number"
                name="initialBalance"
                placeholder="Enter Initial Balance"
                className="form-input"
                defaultValue={doctor?.initialBalance || ""}
              />
            </div>

            {/* BMDC No */}
            <div>
              <label className="form-label">BMDC No</label>
              <input
                type="text"
                name="bmdcNo"
                placeholder="Enter BMDC No"
                className="form-input"
                defaultValue={doctor?.bmdcNumber || ""}
              />
            </div>

            {/* Commission Percentage */}
            <div>
              <label className="form-label">Commission Percentage</label>
              <input
                type="number"
                name="commissionPercentage"
                placeholder="Enter Commission Percentage"
                className="form-input"
                defaultValue={doctor?.commissionPercentage || ""}
              />
            </div>

            {/* Assistant Name */}
            <div>
              <label className="form-label">Assistant Name</label>
              <input
                type="text"
                name="assistantName"
                placeholder="Enter Assistant Name"
                className="form-input"
                defaultValue={doctor?.assistantName || ""}
              />
            </div>

            {/* Assistant Phone */}
            <div>
              <label className="form-label">Assistant Phone</label>
              <input
                type="number"
                name="assistantPhone"
                placeholder="Enter Assistant Phone"
                className="form-input"
                defaultValue={doctor?.assistantPhone || ""}
              />
            </div>
          </div>
          <div className=" mb-3 mt-8 md:col-span-3">
            <button
              type="submit"
              className="flex items-center px-4 bg-primary text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:outline-2 focus:outline-primary focus:outline-opacity-50 transition duration-200 ease-in-out"
            >
              <CiEdit className="mr-2 text-lg" />
              Edit Doctor Profile
            </button>
          </div>
        </div>
      </form>
      {/* education part */}
      <div className="pt-5">
        <SectionHeader title={"Manage Education"} />
      </div>
      <form>
        <div className="mt-8 wrapper">
          {/* Education Section */}
          <div className="mb-6 ">
            <div className="w-full mb-6">
              <div className="flex justify-between items-end gap-3 flex-wrap">
                <h2 className="text-base flex justify-between  flex-col font-medium mb-2">
                  Education
                </h2>

                <div className="mb-2">
                  <Dialog
                    open={isAddModalOpen}
                    onOpenChange={setIsAddModalOpen}
                  >
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="flex items-center text-primary hover:text-primary-dark"
                      >
                        <TbPlus className="mr-1" /> Add Education
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add Education</DialogTitle>
                      </DialogHeader>
                      <DialogDescription>
                        <form>
                          <div className="grid grid-cols-1 text-[16px] mt-4 gap-4">
                            {/* Degree */}
                            <div>
                              <label className="form-label">Degree</label>
                              <DegreeOptions
                                defaultValue={educationForm.degreeId}
                                onDegreeChange={handleDegreeChange}
                              />
                            </div>
                            {/* Institution */}
                            <div>
                              <label className="form-label">Institution</label>
                              <InstitutionOptions
                                defaultValue={educationForm.institutionId}
                                onInstitutionChange={handleInstitutionChange}
                              />
                            </div>
                            {/* start date */}
                            <div>
                              <label className="form-label">Start Date</label>
                              <input
                                type="date"
                                placeholder="Enter year"
                                className="form-input"
                                onChange={(e) =>
                                  setEducationForm({
                                    ...educationForm,
                                    startDate: e.target.value,
                                  })
                                }
                              />
                            </div>
                            {/* end date */}
                            <div>
                              <label className="form-label">End Date</label>
                              <input
                                type="date"
                                placeholder="Enter year"
                                className="form-input"
                                onChange={(e) =>
                                  setEducationForm({
                                    ...educationForm,
                                    endDate: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </form>
                      </DialogDescription>
                      <DialogFooter>
                        <button
                          type="button"
                          onClick={handleAddEducation}
                          className="btn-primary"
                        >
                          Add Education
                        </button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="h-[2px] bg-gray-200">
                <div className="h-[2px] bg-primary w-[120px]"></div>
              </div>
            </div>

            {/* Display Education List */}
            {educationList.length > 0 ? (
              <div>
                <div className="table-responsive ">
                  <table className="table min-w-full">
                    <thead>
                      <tr className="text-left text-black border-b">
                        <th className="py-2">Degree</th>
                        <th>Institution</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {educationList.length > 0 ? (
                        educationList.map((education, index) => (
                          <tr
                            key={index}
                            className="border-b hover:bg-gray-100"
                          >
                            <td className="py-4">{education?.degreeName}</td>
                            <td>{education?.institutionName}</td>
                            <td>{education?.startDate}</td>
                            <td>{education?.endDate}</td>
                            <td className="flex space-x-2">
                              {/* Edit Button */}
                              <Dialog
                                open={isEditModalOpen}
                                onOpenChange={setIsEditModalOpen}
                              >
                                <DialogTrigger asChild>
                                  <button
                                    type="button"
                                    className="btn-outline border border-green-500 rounded-lg text-green-500 hover:text-white hover:bg-green-500 transition duration-300"
                                  >
                                    <CiEdit size={18} />
                                  </button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>Update Education</DialogTitle>
                                  </DialogHeader>
                                  <DialogDescription>
                                    <form>
                                      <div className="grid grid-cols-1 text-[16px] mt-4 gap-4">
                                        {/* Degree */}
                                        <div>
                                          <label className="form-label">
                                            Degree
                                          </label>
                                          <DegreeOptions
                                            defaultValue={
                                              educationForm.degreeId ||
                                              education?.degreeId
                                            }
                                            onDegreeChange={handleDegreeChange}
                                          />
                                        </div>
                                        {/* Institution */}
                                        <div>
                                          <label className="form-label">
                                            Institution
                                          </label>
                                          <InstitutionOptions
                                            defaultValue={
                                              educationForm.institutionId ||
                                              education?.institutionId
                                            }
                                            onInstitutionChange={
                                              handleInstitutionChange
                                            }
                                          />
                                        </div>
                                        {/* start date */}
                                        <div>
                                          <label className="form-label">
                                            Start Date
                                          </label>
                                          <input
                                            type="date"
                                            placeholder="Enter year"
                                            className="form-input"
                                            defaultValue={
                                              education?.startDate || ""
                                            }
                                            onChange={(e) =>
                                              setEducationForm({
                                                ...educationForm,
                                                startDate: e.target.value,
                                              })
                                            }
                                          />
                                        </div>
                                        {/* end date */}
                                        <div>
                                          <label className="form-label">
                                            End Date
                                          </label>
                                          <input
                                            type="date"
                                            placeholder="Enter year"
                                            className="form-input"
                                            defaultValue={
                                              education?.endDate || ""
                                            }
                                            onChange={(e) =>
                                              setEducationForm({
                                                ...educationForm,
                                                endDate: e.target.value,
                                              })
                                            }
                                          />
                                        </div>
                                      </div>
                                    </form>
                                  </DialogDescription>
                                  <DialogFooter>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleEditEducation(education)
                                      }
                                      className="btn-primary"
                                    >
                                      Add Education
                                    </button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>

                              {/* Delete Button */}
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <button className="btn-outline border border-red-400 rounded-lg text-red-400 hover:text-white hover:bg-red-400 transition duration-300">
                                    <RiDeleteBinLine size={18} />
                                  </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will
                                      permanently delete your data.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="btn-primary bg-gray-200 text-black hover:text-black hover:bg-gray-300">
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleDeleteEducation(education?.id)
                                      }
                                      className="btn-primary bg-red-500 hover:bg-red-600"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="4"
                            className="py-8 text-center text-gray-400"
                          >
                            No Education Records Added
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {/* <button type="button" className="btn-primary mt-5">
                  Save Education
                </button> */}
              </div>
            ) : (
              <div className="text-center text-gray-400 font-medium py-8">
                No Education Records Added
              </div>
            )}
          </div>
        </div>
      </form>
      {/* time slot part */}
      <div className="pt-5">
        <SectionHeader title={"Manage Time Slots"} />
      </div>
      <form>
        <div className="mt-8 wrapper">
          {/* Time Slots Section */}
          <div>
            <div className="w-full mb-6">
              <div className="flex justify-between items-end gap-3 flex-wrap">
                <h2 className="text-base flex justify-between  flex-col font-medium mb-2">
                  Available Time Slots
                </h2>

                <button
                  type="button"
                  onClick={addTimeSlot}
                  className="flex items-center mb-2 text-primary hover:text-primary-dark"
                >
                  <TbPlus className="mr-1" /> Add Time Slot
                </button>
              </div>
              <div className="h-[2px] bg-gray-200">
                <div className="h-[2px] bg-primary w-[180px]"></div>
              </div>
            </div>
            {timeSlots.length > 0 ? (
              <div>
                {timeSlots?.map((slot, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-4"
                  >
                    {/* Day Selection */}
                    <select
                      name="day"
                      required
                      value={slot.day}
                      onChange={(e) =>
                        updateTimeSlot(index, "day", e.target.value)
                      }
                      className="form-input w-full md:w-1/4"
                    >
                      <option value="" disabled>
                        Choose Day
                      </option>
                      <option value="SUNDAY">Sunday</option>
                      <option value="MONDAY">Monday</option>
                      <option value="TUESDAY">Tuesday</option>
                      <option value="WEDNESDAY">Wednesday</option>
                      <option value="THURSDAY">Thursday</option>
                      <option value="FRIDAY">Friday</option>
                      <option value="SATURDAY">Saturday</option>
                    </select>

                    {/* Start Time */}
                    <input
                      type="time"
                      required
                      value={slot?.startTime}
                      onChange={(e) =>
                        updateTimeSlot(index, "startTime", e.target.value)
                      }
                      className="form-input w-full md:w-1/4"
                    />

                    {/* End Time */}
                    <input
                      type="time"
                      value={slot?.endTime}
                      required
                      onChange={(e) =>
                        updateTimeSlot(index, "endTime", e.target.value)
                      }
                      className="form-input w-full md:w-1/4"
                    />

                    {/* Remove Time Slot */}
                    <button
                      type="button"
                      onClick={() => removeTimeSlot(index)}
                      className="text-red-500 md:w-auto self-end md:self-center"
                    >
                      <TbTrash />
                    </button>
                  </div>
                ))}

                {/* Save Button */}
                <button
                  type="button"
                  onClick={saveTimeSlots}
                  className="btn-primary mt-5 w-full md:w-auto"
                >
                  Save Time Slots
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-400 font-medium py-8">
                No Time Slots Added
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditDoctorPage;
