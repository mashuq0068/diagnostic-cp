import SidebarLayout from "@/layout/SidebarLayout";
import EditPatientPage from "@/pages/Patient/ViewPatients/EditPatientPage";

const EditPatient = () => {
    return (
        <div>
            <SidebarLayout>
                <EditPatientPage/>
            </SidebarLayout>
        </div>
    );
};

export default EditPatient;