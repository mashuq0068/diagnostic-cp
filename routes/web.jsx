import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "../src/components/Dashboard/Dashboard";
import CreateDoctor from "../src/components/Doctor/CreateDoctor/CreateDoctor";
import ViewDoctors from "../src/components/Doctor/ViewDoctors/ViewDoctors";
import DoctorTransaction from "@/components/Doctor/DoctorTransaction/DoctorTransaction";
import DoctorLedger from "@/components/Doctor/DoctorLedger/DoctorLedger";
import CreatePatient from "@/components/Patient/CreatePatient/CreatePatient";
import ViewPatients from "@/components/Patient/ViewPatients/ViewPatients";
import PatientTransaction from "@/components/Patient/PatientTransaction/PatientTransaction";
import PatientLedger from "@/components/Patient/PatientLedger/PatientLedger";
import AppointmentScheduling from "@/components/Patient/AppointmentScheduling/AppointmentScheduling";
import CommissionTracking from "@/components/Doctor/Commissiontracking/CommissionTracking";
import CreateAgent from "@/components/Agent/CreateAgent/CreateAgent";
import ViewAgents from "@/components/Agent/ViewAgents/ViewAgents";
import AgentTransaction from "@/components/Agent/AgentTransaction/AgentTransaction";
import AgentLedger from "@/components/Agent/AgentLedger/AgentLedger";
import AgentCommissionTracking from "@/components/Agent/CommissionTracking/AgentCommissionTrackingPage";
import CreateTest from "@/components/Test/CreateTest/CreateTest";
import ViewTests from "@/components/Test/ViewTests/ViewTests";
import Invoice from "@/components/Test/Invoice/Invoice";
import TestResultInput from "@/components/Test/TestResultInput/TestResultInput";
import TestReportGeneration from "@/components/Test/TestReportGeneration/TestReportGeneration";
import IncomeManagement from "@/components/Accounts/IncomeManagement/IncomeManagement";
import NewExpense from "@/components/Accounts/NewExpense/NewExpense";
import FieldExpense from "@/components/Accounts/FieldExpense/FieldExpense";
import ViewAllExpenses from "@/components/Accounts/ViewAllExpenses/ViewAllExpenses";
import CreateUser from "@/pages/Authentication/CreateUser";
import ViewProfile from "@/components/Profile/ViewProfile";
import ProfileLossTracking from "@/components/Reports/ProfitLossTracking/ProfileLossTracking";
import ExpenseReport from "@/components/Reports/ExpenseReport/ExpenseReport";
import SalesReport from "@/components/Reports/SalesReport/SalesReport";
import CommissionTrackingReport from "@/components/Reports/CommissionTracking/CommissionTrackingReport";
import IncomeReport from "@/components/Reports/IncomeReport/IncomeReport";
import EmployeeManagement from "@/components/Hr/EmployeeManagement/EmployeeManagement";
import LeaveManagement from "@/components/Hr/LeaveManagement/LeaveManagement";
import PayrollManagement from "@/components/Hr/PayrollManagement/PayrollManagement";
import PerformanceTracking from "@/components/Hr/PerformanceTracking/PerformanceTracking";
import UserRole from "@/components/UserRole/UserRole";
import Login from "@/pages/Authentication/Login";
import EditProfile from "@/components/Profile/EditProfile";
import DoctorAppointment from "@/components/Patient/DoctorAppointment/DoctorAppointment";
import BookAppointment from "@/components/Patient/DoctorAppointment/BookAppointment";
import AttendanceManagement from "@/components/Hr/AttendanceManagement/AttendanceManagement";
import EditDoctor from "@/components/Doctor/ViewDoctors/EditDoctor";
import EditAgent from "@/components/Agent/ViewAgents/EditAgent";
import EditPatient from "@/components/Patient/ViewPatients/EditPatient";
import EditEmployee from "@/components/Hr/EmployeeManagement/EditEmployee";
import EditTest from "@/components/Test/ViewTests/EditTest";
import ViewInvoices from "@/components/Test/ViewInvoices/ViewInvoices";
import EditInvoice from "@/components/Test/ViewInvoices/EditInvoice";
import AttendanceReport from "@/components/Reports/AttendanceReport/AttendanceReport";
import EditPayroll from "@/components/Hr/PayrollManagement/EditPayroll";
import EditLeave from "@/components/Hr/LeaveManagement/EditLeave";
import { useEffect, useState } from "react";
import useLoadingStore from "@/store/loadingStore";


const Web = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const { setLoading } = useLoadingStore();
  const navigate = useNavigate();
  const isToken = localStorage.getItem("token");
  useEffect(() => {
    setLoading(true);
    if (isToken) {
      setIsUserLoggedIn(true);
      setLoading(false);
    } else {
      navigate("/login");
      setIsUserLoggedIn(false);
      setLoading(false);
    }
  }, [isToken]);
  return (
    <Routes>
      {!isUserLoggedIn ? (
        <>
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/login" element={<Login />} />
        </>
      ) : (
        <>
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          {/* profile */}
          <Route path="/view-profile" element={<ViewProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          {/* doctor */}
          <Route path="/doctor/create-doctor" element={<CreateDoctor />} />
          <Route path="/doctor/view-doctors" element={<ViewDoctors />} />
          <Route
            path="/doctor/doctor-transaction"
            element={<DoctorTransaction />}
          />
          <Route path="/doctor/doctor-ledger" element={<DoctorLedger />} />
          <Route
            path="/doctor/commission-tracking"
            element={<CommissionTracking />}
          />
          <Route path="/doctor/edit-doctor/:id" element={<EditDoctor />} />

          {/* patient */}
          <Route path="/patient/create-patient" element={<CreatePatient />} />
          <Route path="/patient/view-patients" element={<ViewPatients />} />
          <Route
            path="/patient/patient-transaction"
            element={<PatientTransaction />}
          />
          <Route path="/patient/patient-ledger" element={<PatientLedger />} />
          <Route
            path="/patient/appointment-scheduling"
            element={<AppointmentScheduling />}
          />
          <Route
            path="/patient/doctor-appointment"
            element={<DoctorAppointment />}
          />
          <Route
            path="/patient/book-appointment/:id"
            element={<BookAppointment />}
          />
          <Route path="/patient/edit-patient/:id" element={<EditPatient />} />

          {/* agent */}
          <Route path="/agent/create-agent" element={<CreateAgent />} />
          <Route path="/agent/view-agents" element={<ViewAgents />} />
          <Route
            path="/agent/agent-transaction"
            element={<AgentTransaction />}
          />
          <Route path="/agent/agent-ledger" element={<AgentLedger />} />
          <Route
            path="/agent/commission-tracking"
            element={<AgentCommissionTracking />}
          />
          <Route path="/agent/edit-agent/:id" element={<EditAgent />} />

          {/* test */}
          <Route path="/test/create-test" element={<CreateTest />} />
          <Route path="/test/view-tests" element={<ViewTests />} />
          <Route path="/test/invoice" element={<Invoice />} />
          <Route path="/test/test-result-input" element={<TestResultInput />} />
          <Route
            path="/test/test-report-generation"
            element={<TestReportGeneration />}
          />
          <Route path="/test/edit-test/:id" element={<EditTest />} />
          <Route path="/test/view-invoices" element={<ViewInvoices />} />
          <Route path="/test/edit-invoice/:id" element={<EditInvoice />} />

          {/* accounts */}
          <Route
            path="/accounts/income-management"
            element={<IncomeManagement />}
          />
          <Route path="/accounts/new-expense" element={<NewExpense />} />
          <Route path="/accounts/field-expense" element={<FieldExpense />} />
          <Route
            path="/accounts/view-all-expenses"
            element={<ViewAllExpenses />}
          />

          {/*reports */}
          <Route
            path="/reports/profit-loss-tracking"
            element={<ProfileLossTracking />}
          />
          <Route path="/reports/expense-report" element={<ExpenseReport />} />
          <Route path="/reports/sales-report" element={<SalesReport />} />
          <Route
            path="/reports/commission-tracking-report"
            element={<CommissionTrackingReport />}
          />
          <Route path="/reports/income-report" element={<IncomeReport />} />
          <Route
            path="/reports/attendance-report"
            element={<AttendanceReport />}
          />

          {/*hr */}
          <Route
            path="/hr/employee-management"
            element={<EmployeeManagement />}
          />
          <Route path="/hr/leave-management" element={<LeaveManagement />} />
          <Route
            path="/hr/payroll-management"
            element={<PayrollManagement />}
          />
          <Route
            path="/hr/performance-tracking"
            element={<PerformanceTracking />}
          />
          <Route
            path="/hr/attendance-management"
            element={<AttendanceManagement />}
          />
          <Route path="/hr/edit-employee/:id" element={<EditEmployee />} />
          <Route path="/hr/edit-payroll/:id" element={<EditPayroll />} />
          <Route path="/hr/edit-leave/:id" element={<EditLeave />} />

          {/*user role */}
          <Route path="/user-role" element={<UserRole />} />
        </>
      )}
    </Routes>
  );
};

export default Web;
