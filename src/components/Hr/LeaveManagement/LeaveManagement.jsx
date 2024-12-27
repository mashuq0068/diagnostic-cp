import SidebarLayout from "@/layout/SidebarLayout";
import LeaveManagementPage from "@/pages/Hr/LeaveManagement/LeaveManagementPage";

const LeaveManagement = () => {
    return (
        <div>
            <SidebarLayout>
                <LeaveManagementPage/>
            </SidebarLayout>
        </div>
    );
};

export default LeaveManagement;