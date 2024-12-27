import SidebarLayout from "@/layout/SidebarLayout";
import PayrollManagementPage from "@/pages/Hr/PayrollManagement/PayrollManagementPage";

const PayrollManagement = () => {
    return (
        <div>
            <SidebarLayout>
                <PayrollManagementPage/>
            </SidebarLayout>
        </div>
    );
};

export default PayrollManagement;