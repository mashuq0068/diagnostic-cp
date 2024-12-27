import SidebarLayout from '@/layout/SidebarLayout';
import PatientLedgerPage from '@/pages/Patient/PatientLedger/PatientLedgerPage';

const PatientLedger = () => {
  return (
    <div>
      <SidebarLayout>
        <PatientLedgerPage/>
      </SidebarLayout>
    </div>
  );
};

export default PatientLedger;