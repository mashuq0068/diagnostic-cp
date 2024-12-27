import SidebarLayout from "@/layout/SidebarLayout";
import ViewPatientPage from "@/pages/Patient/ViewPatients/ViewPatientPage";

const ViewPatients = () => {
    return (
        <div>
            <SidebarLayout>
                <ViewPatientPage/>
            </SidebarLayout>
        </div>
    );
};

export default ViewPatients;