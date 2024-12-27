import SidebarLayout from "@/layout/SidebarLayout";
import BookAppointmentPage from "@/pages/Patient/DoctorAppointment/BookAppointmentPage";


const BookAppointment = () => {
    return (
        <div>
            <SidebarLayout>
                <BookAppointmentPage/>
            </SidebarLayout>
        </div>
    );
};

export default BookAppointment;