import SidebarLayout from "@/layout/SidebarLayout";
import DoctorAppointmentPage from "@/pages/Patient/DoctorAppointment/DoctorAppointmentPage";


const DoctorAppointment = () => {
    return (
        <div>
            <SidebarLayout>
                <DoctorAppointmentPage/>
            </SidebarLayout>
        </div>
    );
};

export default DoctorAppointment;