import SidebarLayout from "@/layout/SidebarLayout";
import PatientTransactionPage from "@/pages/Patient/PatientTransaction/PatientTransactionPage";

const PatientTransaction = () => {
  return (
    <div>
      <SidebarLayout>
        <PatientTransactionPage/>
      </SidebarLayout>
    </div>
  );
};

export default PatientTransaction;