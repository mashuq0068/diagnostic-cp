import SidebarLayout from "@/layout/SidebarLayout";
import IncomeManagementPage from "@/pages/Accounts/IncomeManagement/IncomeManagementPage";

const IncomeManagement = () => {
    return (
        <div>
            <SidebarLayout>
                <IncomeManagementPage/>
            </SidebarLayout>
        </div>
    );
};

export default IncomeManagement;