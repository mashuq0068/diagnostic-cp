import SectionHeader from "@/components/ui/section-header";
import TableHeader from "@/components/ui/table-header";
import useLoadingStore from "@/store/loadingStore";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "@/config/axiosConfig";
import { buildQueryParams } from "@/utility/buildQueryParams";

const DoctorAppointmentPage = () => {
  const [specialities, setSpecialities] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [queryParams, setQueryParams] = useState({
    page: 0,
    size: 10,
  });
  const { setLoading } = useLoadingStore();
  // handle get all speciality
  const getAllSpecialities = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/specialities`);
      setSpecialities(res?.data?.specialities);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // function tol fetch doctor data
  const getAllDoctors = async () => {
    setLoading(true);
    try {
      const queryData = buildQueryParams(queryParams);
      const res = await axios.get(`/doctors?${queryData}`);
      setDoctors(res?.data?.doctors);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllSpecialities();
    getAllDoctors();
  }, []);

  return (
    <div className="">
      {/* Header */}
      <div>
        <SectionHeader title={"Doctor Appointment"} />
      </div>

      {/* Search Section */}
      <div className="wrapper mb-12">
        <div className="flex md:flex-row flex-col gap-4 justify-between">
          {/* Search by Specialization */}
          <div className="flex-1">
            <label className="block text-gray-600 mb-2 font-medium">
              Search by Specialization
            </label>
            <select className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Choose Specialization</option>
              {specialities.map((speciality) => (
                <option key={speciality.id} value={speciality.id}>
                  {speciality.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Search by Doctor Name */}
          <div className="flex-1">
            <label className="block text-gray-600 mb-2 font-medium">
              Search by Doctor Name
            </label>
            <select className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Choose Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button className="btn-primary">
              <FaSearch className="mr-2" />
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="wrapper">
        <div>
          <TableHeader title={"Doctor List"} selectedWidth={"w-[180px]"} />
        </div>
        {/* Doctor Table */}
        <div className="table-responsive">
          <table className="table min-w-full">
            <thead>
              <tr className="text-left text-gray-800 border-b">
                <th className="py-2">Doctor Name</th>
                <th>Specialization</th>
                <th>Qualification</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors?.map((doctor) => (
                <tr key={doctor.id} className="border-b hover:bg-gray-100">
                  <td className="py-4 flex items-center">
                    <img
                      src={
                        doctor?.photo ||
                        "https://c8.alamy.com/comp/2WK9M86/man-profile-illustration-internet-call-avatar-2WK9M86.jpg"
                      }
                      alt={doctor?.nameEn}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <span>{doctor?.nameEn}</span>
                  </td>
                  <td>-----</td>
                  <td>-----</td>
                  {/* <td className="text-center">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden">
                      <img
                        className="object-cover object-center w-full h-full"
                        src={doctor.image}
                        alt={doctor.name}
                      />
                    </div>
                  </td> */}
                  <td className="text-center">
                    <Link
                      to={`/patient/book-appointment/${doctor?.id}`}
                      className="block mx-auto w-max text-center rounded-lg bg-primary hover:shadow-lg  text-white px-6 py-2"
                    >
                      Book Appointment
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointmentPage;
