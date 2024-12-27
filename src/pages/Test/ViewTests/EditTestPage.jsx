/* eslint-disable react/no-unescaped-entities */
import SectionHeader from "@/components/ui/section-header";
import useLoadingStore from "@/store/loadingStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "@/config/axiosConfig";
import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";
const EditTestPage = () => {
  const [departments, setDepartments] = useState([]);
  const [test, setTest] = useState(null);
  const { setLoading } = useLoadingStore();
  const params = useParams();
  useEffect(() => {
    getSelectedTest();
    getAllDepartments();
  }, []);

  //   handle get Selected test
  const getSelectedTest = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/tests/${params?.id}`);
      setTest(res?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // fetching data of departments
  const getAllDepartments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/departments`);
      setDepartments(res?.data?.departments);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // handle submit
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedTest = {
      nameEn: form.nameEn.value,
      nameBn: form.nameBn.value,
      price: form.price.value,
      departmentId: form.department.value,
      associatedEquipment: form.associatedEquipment.value,
      descriptionEn: form.descriptionEn.value,
      descriptionBn: form.descriptionBn.value,
    };

    try {
      setLoading(true);
      await axios.put(`/tests/${params?.id}`, updatedTest);
      toast.success("Test  updated successfully!"); // Success toast
    } catch (error) {
      console.error("Error updating test profile:", error);
      toast.error(error?.message || "Failed to update test profile."); // Error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 text-gray-600">
      <div>
        <SectionHeader title={"Edit Test Profile"} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="wrapper">
          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* name(en) */}
            <div>
              <label className="form-label">Name(En)</label>
              <input
                defaultValue={test?.nameEn}
                type="text"
                name="nameEn"
                placeholder="Enter Name(En)"
                className="form-input"
              />
            </div>

            {/* name(bn) */}
            <div>
              <label className="form-label">Name(Bn)</label>
              <input
                defaultValue={test?.nameBn}
                type="text"
                name="nameBn"
                placeholder="Enter Name(Bn)"
                className="form-input"
              />
            </div>

            {/* price */}
            <div>
              <label className="form-label">Price</label>
              <input
                defaultValue={test?.price}
                type="text"
                name="price"
                placeholder="Enter Price"
                className="form-input"
              />
            </div>

            {/* departments */}
            <div>
              <label className="form-label">Departments</label>
              <select name="department" className="form-input form-select">
                <option value={test?.department?.nameEn || ""} selected>
                  {test?.department?.nameEn
                    ? test?.department?.nameEn.charAt(0).toUpperCase() +
                      test?.department?.nameEn.slice(1).toLowerCase()
                    : "Choose"}
                </option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Associated Equipment */}
            <div>
              <label className="form-label">Associated Equipment</label>
              <input
                defaultValue={test?.associatedEquipment}
                type="text"
                name="associatedEquipment"
                placeholder="Enter Associated Equipment"
                className="form-input"
              />
            </div>

            {/* Description (en) */}
            <div>
              <label className="form-label">Description(En)</label>
              <textarea
                defaultValue={test?.descriptionEn}
                name="descriptionEn"
                placeholder="Enter Description(En)"
                className="form-input"
                rows={1}
              />
            </div>

            {/* Description (bn) */}
            <div>
              <label className="form-label">Description(Bn)</label>
              <textarea
                defaultValue={test?.descriptionBn}
                name="descriptionBn"
                placeholder="Enter Description(Bn)"
                className="form-input"
                rows={1}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button type="submit" className="btn-primary">
              <CiEdit className="mr-2 text-lg" />
              Edit Test
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTestPage;
