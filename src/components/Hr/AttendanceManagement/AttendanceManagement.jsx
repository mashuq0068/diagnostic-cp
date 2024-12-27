import SidebarLayout from "@/layout/SidebarLayout";
import AttendanceManagementPage from "@/pages/Hr/AttendanceManagement/AttendanceManagementPage";


const AttendanceManagement = () => {
  return (
    <div>
      <SidebarLayout>
        <AttendanceManagementPage/>
      </SidebarLayout>
    </div>
  );
};

export default AttendanceManagement;