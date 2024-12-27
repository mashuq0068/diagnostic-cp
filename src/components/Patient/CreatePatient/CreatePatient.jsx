import SidebarLayout from "@/layout/SidebarLayout";
import CreatePatientPage from "@/pages/Patient/CreatePatient/CreatePatientPage";

const CreatePatient= () => {
    return (
        <div>
            <SidebarLayout>
                <CreatePatientPage/>
            </SidebarLayout>
        </div>
    );
};

export default CreatePatient;