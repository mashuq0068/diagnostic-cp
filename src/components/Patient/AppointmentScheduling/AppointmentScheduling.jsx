import SidebarLayout from "@/layout/SidebarLayout";
import AppointmentSchedulingPage from "@/pages/Patient/AppointmentScheduling/AppointmentSchedulingPage";

const AppointmentScheduling = () => {
    return (
        <div>
           <SidebarLayout>
            <AppointmentSchedulingPage/>
            </SidebarLayout> 
        </div>
    );
};

export default AppointmentScheduling;