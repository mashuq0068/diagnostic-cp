import SidebarLayout from "@/layout/SidebarLayout";
import DoctorLedgerPage from "@/pages/Doctor/DoctorLedger/DoctorLedgerPage";

const DoctorLedger = () => {
    return (
        <div>
            <SidebarLayout>
                <DoctorLedgerPage/>
            </SidebarLayout>
        </div>
    );
};

export default DoctorLedger;