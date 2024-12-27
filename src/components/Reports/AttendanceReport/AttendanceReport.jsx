import SidebarLayout from "@/layout/SidebarLayout";
import AttendanceReportPage from "@/pages/Reports/AttendanceReport/AttendanceReportPage";


const AttendanceReport = () => {
  return (
    <div>
      <SidebarLayout>
        <AttendanceReportPage/>
      </SidebarLayout>
    </div>
  );
};

export default AttendanceReport;