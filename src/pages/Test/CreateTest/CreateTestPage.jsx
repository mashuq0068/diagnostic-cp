import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SectionHeader from "@/components/ui/section-header";
import useLoadingStore from "@/store/loadingStore";
import { TbUserPlus } from "react-icons/tb";
import axios from "@/config/axiosConfig";
import { DepartmentOptions } from "@/utility/SelectOptions";
import { useState } from "react";
import toast from "react-hot-toast";

const initialState = {
  nameEn: "",
  nameBn: "",
  price: "",
  department: {
    id: "",
  },
  associatedEquipment: "",
  descriptionEn: "",
  descriptionBn: "",
};

const CreateTestPage = () => {
  const { setLoading } = useLoadingStore();
  const [formData, setFormData] = useState(initialState);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/tests", formData);
      toast.success("Test Created Successfully");
      // clearing current data
      setFormData({ ...initialState });
    } catch (error) {
      toast.error(error.message || "something wrong");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mb-8">
      <div className=" flex md:flex-row flex-col md:mb-0 mb-5 md:items-center justify-between lg:gap-10">
        <SectionHeader title={"Create Test"} />
        <div className="md:col-span-3">
          <Dialog>
            <DialogTrigger asChild>
              <button className="btn-primary">
                <TbUserPlus className="mr-2 text-lg" />
                Create New Department
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Department</DialogTitle>
                <DialogDescription>
                  <form>
                    {/* Form Grid */}
                    <div className="grid grid-cols-1 text-[16px] mt-4 gap-4">
                      {/* Name (Bangla) */}
                      <div>
                        <label className="form-label">Name (Bangla)</label>
                        <input
                          type="text"
                          placeholder="Enter name in Bangla"
                          className="form-input"
                        />
                      </div>

                      {/* Name (English) */}
                      <div>
                        <label className="form-label">Name (English)</label>
                        <input
                          type="text"
                          placeholder="Enter name in English"
                          className="form-input"
                        />
                      </div>

                      {/* Head Name */}
                      <div>
                        <label className="form-label">Head Name</label>
                        <input
                          type="text"
                          placeholder="Enter head name"
                          className="form-input"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="form-label">Phone</label>
                        <input
                          type="tel"
                          placeholder="Enter phone number"
                          className="form-input"
                        />
                      </div>

                      {/* Location */}
                      <div>
                        <label className="form-label">Location</label>
                        <input
                          type="text"
                          placeholder="Enter location"
                          className="form-input"
                        />
                      </div>
                    </div>
                  </form>
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4"></div>
              <DialogFooter>
                <button type="submit" className="btn-primary">
                  Create Department
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="wrapper">
          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* name(en) */}
            <div>
              <label className="form-label">Name(En)</label>
              <input
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    nameEn: e.target.value,
                  }));
                }}
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
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    nameEn: e.target.value,
                  }));
                }}
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
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    price: e.target.value,
                  }));
                }}
                type="text"
                name="price"
                placeholder="Enter Price"
                className="form-input"
              />
            </div>

            {/* departments */}
            <div>
              <label className="form-label">Departments</label>
              <select
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    department: { id: e.target.value },
                  }));
                }}
                name="department"
                className="form-input form-select"
              >
                <option value={""} selected></option>
                <DepartmentOptions />
              </select>
            </div>

            {/* Associated Equipment */}
            <div>
              <label className="form-label">Associated Equipment</label>
              <input
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    associatedEquipment: e.target.value,
                  }));
                }}
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
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    descriptionEn: e.target.value,
                  }));
                }}
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
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    descriptionBn: e.target.value,
                  }));
                }}
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
              <TbUserPlus className="mr-2 text-lg" />
              Create Test
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTestPage;
