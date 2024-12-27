/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import SectionHeader from "@/components/ui/section-header";
import TableHeader from "@/components/ui/table-header";
import { TbUserPlus } from "react-icons/tb";
import { BiPlus } from "react-icons/bi";
import PlaceHolder from "@/utility/PlaceHolder";
import { RxCross1 } from "react-icons/rx";
import Select from "react-select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import customStyles from "@/utility/react-select-styles";
import toast from "react-hot-toast";
import useLoadingStore from "@/store/loadingStore";
import axios from "@/config/axiosConfig";
import { calculateMoney } from "@/utility/calculateMoney";
import { buildQueryParams } from "@/utility/buildQueryParams";

const InvoicePage = () => {
  const [currentPatient, setCurrentPatient] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [selectedTest, setSelectedTest] = useState("");
  const [addedTests, setAddedTests] = useState([]);
  const [showTestDropdown, setShowTestDropdown] = useState(false);
  const [totalDiscountPercentage, settotalDiscountPercentage] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [patientNameOptions, setPatientNameOptions] = useState([]);
  const [patientPhoneOptions, setPatientPhoneOptions] = useState([]);
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [agentOptions, setAgentOptions] = useState([]);
  const [testOptions, setTestOptions] = useState([]);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [dueAmount, setDueAmount] = useState(null);
  const { setLoading } = useLoadingStore();
  const [patientData, setPatientData] = useState({
    name: null,
    address: null,
    phoneNumber: null,
  });
  const [patientQueryParams, setPatinetQueryParams] = useState({
    fullName: "",
    phone: "",
    size:1000
  });
  const [doctorQueryParams, setDoctorQueryParams] = useState({
    nameEn: "",
    size: 1000,
  });
  const [testQueryParams, setTestQueryParams] = useState({
    nameEn: "",
    size: 1000,
  });
  const [agentQueryParams, setAgentQueryParams] = useState({
    nameEn: "",
    size: 1000,
  });

  // create patient
  const handleCreatePatient = async () => {
    setLoading(true);
    if (
      !patientData.name ||
      !patientData.address ||
      !patientData.phoneNumber 
      
    ) {
      toast.error("Please fill  all required fields.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("/patients", patientData);
      toast.success("Patient Created Successfully!");
      // Clear the form after successful submission
      setPatientData({ name: "", address: "", phoneNumber: "", email: "" });
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  // get all patients
  const getAllPatients = async () => {
    setLoading(true);
    try {
      const queryData = buildQueryParams(patientQueryParams);
      const res = await axios.get(`/patients?${queryData}`);
      setPatientNameOptions(
        res?.data?.patients?.map((patient) => ({
          value: patient.id,
          label: patient.fullName,
        }))
      );
      setPatientPhoneOptions(
        res?.data?.patients?.map((patient) => ({
          value: patient.id,
          label: patient.phone,
        }))
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  // get all doctors
  const getAllDoctors = async () => {
    setLoading(true);
    try {
      const queryData = buildQueryParams(doctorQueryParams);
      const res = await axios.get(`/doctors?${queryData}`);
      // setDoctors(res?.data?.doctors);
      setDoctorOptions(
        res?.data?.doctors?.map((doctor) => ({
          value: doctor.id,
          label: doctor.nameEn,
        }))
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  // get all tests
  const getAllTests = async () => {
    setLoading(true);
    try {
      const queryData = buildQueryParams(testQueryParams);
      const res = await axios.get(`/tests?${queryData}`);
      // setAllTests(res?.data?.tests);
      setTestOptions(
        res?.data?.tests?.map((test) => ({
          value: test?.id,
          label: test?.nameEn,
        }))
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  // get all agents
  const getAllAgents = async () => {
    setLoading(true);
    try {
      const queryData = buildQueryParams(testQueryParams);
      const res = await axios.get(`/agents?${queryData}`);
      // setAllTests(res?.data?.tests);
      setAgentOptions(
        res?.data?.agents?.map((agent) => ({
          value: agent?.id,
          label: agent?.nameEn,
        }))
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPatients();
  }, [patientQueryParams]); // Triggered when patientQueryParams changes
  useEffect(() => {
    getAllAgents();
  }, [agentQueryParams]); // Triggered when patientQueryParams changes

  useEffect(() => {
    getAllTests();
  }, [testQueryParams]); // Triggered when testQueryParams changes

  useEffect(() => {
    getAllDoctors();
  }, [doctorQueryParams]); // Triggered when doctorQueryParams changes

  useEffect(() => {
    // Initial calculation when tests state changes or component mounts
    calculateAmounts(addedTests);
  }, [addedTests]);
  // calculate amounts
  const calculateAmounts = (tests) => {
    const total = tests.reduce((acc, test) => acc + test.price, 0);
    const current =
      tests.reduce((acc, test) => acc + parseFloat(test.finalPrice || 0), 0) ||
      total;

    setTotalAmount(total);
    setCurrentAmount(selectedDoctor ? current : total);
    // if after giving paid amount anyone add a test, then due amount will change
    if (paidAmount) {
      setDueAmount(current - paidAmount);
    }
  };

  // Handle percentage change for individual tests
  const handleDoctorPercentageChange = (e, testId) => {
    const newPercentage = Number(e.target.value);
    if (newPercentage > selectedDoctor?.commissionPercentage) {
      toast.error(`The doctor's commission percentage exceed.`);

      return;
    }
    setAddedTests((prevTests) =>
      prevTests.map((test) =>
        test.testId === testId
          ? {
              ...test,
              percentage: newPercentage,
              finalPrice: parseFloat(
                test.price - calculateMoney(test.price, newPercentage)
              ).toFixed(2),
            }
          : test
      )
    );
  };
  // Handle percentage change for individual tests
  const handleAgentPercentageChange = (e, testId) => {
    const newPercentage = Number(e.target.value);
    if (newPercentage > selectedAgent?.commissionPercentage) {
      toast.error(`The agent's commission percentage exceed.`);

      return;
    }
    setAddedTests((prevTests) =>
      prevTests.map((test) =>
        test.testId === testId
          ? {
              ...test,
              percentage: newPercentage,
              finalPrice: parseFloat(
                test.price - calculateMoney(test.price, newPercentage)
              ).toFixed(2),
            }
          : test
      )
    );
  };
  // ready for select options

  // handle add test
  const handleAddTest = async (selectedTestId) => {
    setLoading(true);
    let selectedTest;
    try {
      const res = await axios.get(`/tests/${selectedTestId}`);
      selectedTest = res?.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    if (!selectedTest) return; // If the test is not found, exit.

    // Check if the test is already added
    const testExists = addedTests.some((test) => test.id === selectedTest.id);

    if (testExists) {
      toast.error("This test has already been added!");
      return;
    }

    // Calculate the discount for the test
    const defaultDiscount = calculateMoney(
      selectedTest.price,
      selectedDoctor?.commissionPercentage ||
        selectedAgent?.commissionPercentage
    );
    // if anyone don't refer doctor then he will see total amount, because he has no discount now
    const defaultFinalPrice =
      selectedTest.price - defaultDiscount || selectedTest.price;

    // Add the test with its details and discount
    setAddedTests((prevTests) => [
      ...prevTests,
      {
        testId: selectedTest.id,
        name: selectedTest.nameEn,
        price: selectedTest.price,
        discount: defaultDiscount,
        percentage:
          selectedDoctor?.commissionPercentage ||
          selectedAgent?.commissionPercentage,
        finalPrice: defaultFinalPrice,
      },
    ]);

    setShowTestDropdown(false);
  };

  // handle patient change
  const handlePatientChange = async (patientId) => {
    setLoading(true);
    try {
      const res = await axios.get(`/patients/${patientId}`);
      setCurrentPatient(res?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // handle referred doctor change
  const handleDoctorChange = async (doctorId) => {
    setAddedTests([]);
    setSelectedAgent(null);
    setLoading(true);
    try {
      const res = await axios.get(`/doctors/${doctorId}`);
      setSelectedDoctor(res?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // handle referred agent change
  const handleAgentChange = async (agentId) => {
    setAddedTests([]);
    setSelectedDoctor(null);
    setLoading(true);
    try {
      const res = await axios.get(`/agents/${agentId}`);
      setSelectedAgent(res?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  //generate Invoice
  const handleGenerateInvoice = async (e) => {
    e.preventDefault();

    try {
      const invoiceData = {
        patientId: currentPatient?.id,
        ...(selectedDoctor ? { doctorId: selectedDoctor?.id } : {}),
        ...(selectedAgent ? { agentId: selectedAgent?.id } : {}),
        patientTestRequests: addedTests?.map((test) => ({
          testId: test?.testId,
          percentage: totalDiscountPercentage
            ? totalDiscountPercentage
            : test?.percentage,
        })),
        paidAmount: Number(paidAmount),
      };
      await axios.post("/invoices", invoiceData);
      toast.success("Invoice Created Successfully");
    } catch (error) {
      toast.error(error.message || "something wrong");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // handle delete test
  const handleDelete = (testId) => {
    console.log(testId);
    setAddedTests((prevTests) =>
      prevTests.filter((test) => test.testId !== testId)
    );
    console.log(addedTests);
  };
  // handlePaidAMount
  const handlePaidAmount = (e) => {
    const paidAmount = e.target.value;
    setPaidAmount(paidAmount);
    setDueAmount(currentAmount - paidAmount);
  };
  // handle total discount
  const handleTotalDiscount = (e) => {
    const discountPercentage = e.target.value;
    settotalDiscountPercentage(discountPercentage);
    const currentAmount =
      totalAmount - calculateMoney(totalAmount, discountPercentage);
    setCurrentAmount(currentAmount);
  };
  // add test click
  const handleTestClick = () => {
    setShowTestDropdown((prevState) => !prevState);
  };
  return (
    <div className="mb-8">
      <div>
        <SectionHeader title={"Invoice/Bill"} />
      </div>

      {/* Basic Information Form */}
      <div className="wrapper mb-8">
        <form className="flex flex-wrap items-end mb-8 gap-5">
          <div className="w-[90vw] md:w-[320px]">
            <label className="form-label">Patient/By Name</label>
            <Select
              options={patientNameOptions}
              styles={customStyles}
              className="react-select-container rounded-lg"
              classNamePrefix="react-select"
              placeholder="Choose"
              value={currentPatient.nameEn}
              onChange={(selectedOption) =>
                handlePatientChange(selectedOption.value)
              }
            />
          </div>
          <div className="w-[90vw] md:w-[320px]">
            <label className="form-label">Patient/By Phone</label>
            <Select
              options={patientPhoneOptions}
              styles={customStyles}
              className="react-select-container rounded-lg"
              classNamePrefix="react-select"
              placeholder="Choose"
              value={currentPatient.nameEn}
              onChange={(selectedOption) =>
                handlePatientChange(selectedOption.value)
              }
            />
          </div>
          <div className="md:col-span-3">
            <Dialog>
              <DialogTrigger asChild>
                <button className="btn-primary">
                  <TbUserPlus className="mr-2 text-lg" />
                  Create New Patient
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Patient</DialogTitle>
                  <DialogDescription>
                    <form>
                      {/* Form Grid */}
                      <div className="grid grid-cols-1 text-[16px] mt-4 gap-4">
                        {/* Name */}
                        <div>
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="form-input"
                            value={patientData.name}
                            onChange={(e) =>
                              setPatientData((prevData) => ({
                                ...prevData,
                                name: e.target.value,
                              }))
                            }
                          />
                        </div>

                        {/* Address */}
                        <div>
                          <label className="form-label">Address</label>
                          <input
                            type="text"
                            name="address"
                            placeholder="Enter your address"
                            className="form-input"
                            value={patientData.address}
                            onChange={(e) =>
                              setPatientData((prevData) => ({
                                ...prevData,
                                address: e.target.value,
                              }))
                            }
                          />
                        </div>

                        {/* Phone Number */}
                        <div>
                          <label className="form-label">Phone Number</label>
                          <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="Enter your phone number"
                            className="form-input"
                            value={patientData.phoneNumber}
                            onChange={(e) =>
                              setPatientData((prevData) => ({
                                ...prevData,
                                phoneNumber: e.target.value,
                              }))
                            }
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            name="email"
                            placeholder="Enter your email (optional)"
                            className="form-input"
                            value={patientData.email}
                            onChange={(e) =>
                              setPatientData((prevData) => ({
                                ...prevData,
                                email: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                    </form>
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4"></div>
                <DialogFooter>
                  <button
                    onClick={handleCreatePatient}
                    type="submit"
                    className="btn-primary"
                  >
                    Create Patient
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </form>

        {/* Conditional Rendering */}
        {!currentPatient ? (
          <div className="flex justify-center">
            <PlaceHolder />
          </div>
        ) : (
          <>
            {/* Information Summary */}
            <div>
              <TableHeader
                title={"Information Summary"}
                selectedWidth={"w-[200px]"}
              />
            </div>

            {/* Responsive Table Wrapper for Summary */}
            <div className="overflow-x-auto mb-8">
              <table className="table container min-w-full">
                <thead>
                  <tr className="text-left text-gray-800 border-b">
                    <th className="py-2">Patient ID</th>
                    <th>Patient Name</th>
                    <th>Address</th>
                    <th>Phone No</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-100">
                    <td className="py-4">{currentPatient?.id}</td>
                    <td>{currentPatient?.fullName}</td>
                    <td>{currentPatient?.address || "N/A"}</td>
                    <td>{currentPatient?.phone || "N/A"}</td>
                    <td>{currentAmount?.email || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Test List */}
            <div className="wrapper">
              <div className="w-full mb-6">
                <div className="flex justify-between items-end gap-3 flex-wrap">
                  <h2 className="text-base font-medium mb-2">Test List</h2>
                  <div className="flex flex-wrap md:gap-5 gap-2 items-end">
                    <div className="mb-3">
                      <Select
                        styles={customStyles}
                        options={doctorOptions}
                        className="react-select-container lg:w-[300px]"
                        classNamePrefix="react-select"
                        placeholder="Choose a Doctor"
                        // menuIsOpen={true}
                        // value={selectedDoctor?.id || ""}
                        value={
                          selectedDoctor
                            ? {
                                value: selectedDoctor.id,
                                label: selectedDoctor.nameEn,
                              }
                            : null
                        }
                        onChange={(selectedOption) => {
                          handleDoctorChange(selectedOption.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <Select
                        styles={customStyles}
                        options={agentOptions}
                        className="react-select-container lg:w-[300px]"
                        classNamePrefix="react-select"
                        placeholder="Choose an Agent"
                        // menuIsOpen={true}
                        value={
                          selectedAgent
                            ? {
                                value: selectedAgent.id,
                                label: selectedAgent.nameEn,
                              }
                            : null
                        }
                        onChange={(selectedOption) => {
                          handleAgentChange(selectedOption.value);
                        }}
                      />
                    </div>
                    <div className="">
                      {/* Add Test Button */}
                      <div className="relative mb-3">
                        <button
                          type="button"
                          className="btn-primary flex items-center gap-2"
                          onClick={handleTestClick}
                        >
                          <BiPlus className="text-lg" />
                          Add Test
                        </button>

                        {/* Dropdown Menu */}
                        {showTestDropdown && (
                          <div className="absolute  min-h-[50px]  top-full mt-2 w-[200px] bg-white border border-gray-300 rounded shadow-lg z-10">
                            <Select
                              styles={customStyles}
                              options={testOptions}
                              className="react-select-container"
                              classNamePrefix="react-select"
                              placeholder="Choose a test"
                              menuIsOpen={true}
                              value={selectedTest}
                              onChange={(selectedOption) => {
                                setSelectedTest(selectedOption);
                                handleAddTest(selectedOption.value);
                                setShowTestDropdown(false);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`h-[2px] bg-gray-200`}>
                  <div className={`h-[2px] bg-primary w-[80px]`}></div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="table relative min-w-full">
                  <thead>
                    <tr className="text-left border-b text-gray-800">
                      <th className="py-2">Serial No</th>
                      <th>Test Name</th>
                      <th>Test Price</th>
                      <th>Percentage(%)</th>
                      <th>Final price</th>
                      <th>User Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {addedTests.length === 0 ? (
                      <tr>
                        <td colSpan="12" className="py-8 text-center">
                          <PlaceHolder />
                        </td>
                      </tr>
                    ) : (
                      addedTests?.map((test, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-4">{index + 1}</td>
                          <td>{test.name}</td>
                          <td>{test.price}</td>

                          <td>
                            {(() => {
                              if (selectedAgent && !totalDiscountPercentage) {
                                return (
                                  <input
                                    type="text"
                                    onChange={(e) =>
                                      handleAgentPercentageChange(e, test.testId)
                                    }
                                    max={selectedAgent.commissionPercentage}
                                    defaultValue={
                                      selectedAgent?.commissionPercentage
                                    }
                                    className="w-[80px] border-b text-center border-gray-300 placeholder-gray-500 focus:outline-none"
                                  />
                                );
                              } else if (
                                selectedDoctor &&
                                !totalDiscountPercentage
                              ) {
                                return (
                                  <input
                                    type="text"
                                    onChange={(e) =>
                                      handleDoctorPercentageChange(e, test.testId)
                                    }
                                    max={selectedDoctor.commissionPercentage}
                                    defaultValue={
                                      selectedDoctor?.commissionPercentage
                                    }
                                    className="w-[80px] border-b text-center border-gray-300 placeholder-gray-500 focus:outline-none"
                                  />
                                );
                              } else {
                                return "N/A";
                              }
                            })()}
                          </td>

                          <td>
                            {(() => {
                              if (selectedAgent && !totalDiscountPercentage) {
                                return test.finalPrice;
                              } else if (
                                selectedDoctor &&
                                !totalDiscountPercentage
                              ) {
                                return test.finalPrice;
                              } else {
                                return "N/A";
                              }
                            })()}
                          </td>

                          <td>
                            <button
                              onClick={() => handleDelete(test.testId)}
                              className="py-2 rounded-lg px-2 bg-red-400"
                            >
                              <RxCross1 className="text-white" size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <form>
              <div className="wrapper mt-5 text-[14px]">
                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {/* Total Amount */}
                  <div>
                    <label className="form-label">Total Amount</label>
                    <input
                      type="text"
                      value={totalAmount}
                      readOnly
                      className="form-input "
                    />
                  </div>

                  {/* Discount */}
                  <div>
                    <label className="form-label">Discount (%)</label>
                    <input
                      type="text"
                      onChange={handleTotalDiscount}
                      placeholder="Enter Discount Amount"
                      className="form-input"
                    />
                  </div>

                  {/* Current Amount */}
                  <div>
                    <label className="form-label">Current Amount</label>
                    <input
                      type="text"
                      value={currentAmount}
                      readOnly
                      className="form-input "
                    />
                  </div>
                  <div>
                    <label className="form-label">Paid Amount</label>
                    <input
                      type="text"
                      placeholder="Enter Paid Amount"
                      className="form-input"
                      onChange={handlePaidAmount}
                    />
                  </div>

                  {/* Due Amount */}
                  <div>
                    <label className="form-label">Due Amount</label>
                    <input
                      type="text"
                      value={dueAmount}
                      readOnly
                      className="form-input "
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="form-label">Description</label>
                    <textarea
                      placeholder="Enter Description (optional)"
                      className="form-input"
                      rows={1}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    onClick={handleGenerateInvoice}
                    type="submit"
                    className="btn-primary text-[16px]"
                  >
                    <TbUserPlus className="mr-2 text-lg" />
                    Generate Invoice
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default InvoicePage;
