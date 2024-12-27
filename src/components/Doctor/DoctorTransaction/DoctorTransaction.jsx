import SidebarLayout from "@/layout/SidebarLayout";
import DoctorTransactionPage from "@/pages/Doctor/DoctorTransaction/DoctorTransactionPage";

const DoctorTransaction = () => {
    return (
        <div>
            <SidebarLayout>
                <DoctorTransactionPage/>
            </SidebarLayout>
        </div>
    );
};

export default DoctorTransaction;