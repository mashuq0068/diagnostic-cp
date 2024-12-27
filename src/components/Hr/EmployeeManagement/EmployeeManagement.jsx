import SidebarLayout from "@/layout/SidebarLayout";
import EmployeeManagementPage from "@/pages/Hr/EmployeeManagement/EmployeeManagementPage";

const EmployeeManagement = () => {
    return (
        <div>
            <SidebarLayout>
                <EmployeeManagementPage/>
            </SidebarLayout>
        </div>
    );
};

export default EmployeeManagement;