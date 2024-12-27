import SidebarLayout from "@/layout/SidebarLayout";
import AgentTransactionPage from "@/pages/Agent/AgentTransaction/AgentTransactionPage";


const AgentTransaction = () => {
  return (
    <div>
      <SidebarLayout>
        <AgentTransactionPage/>
      </SidebarLayout>
    </div>
  );
};

export default AgentTransaction;