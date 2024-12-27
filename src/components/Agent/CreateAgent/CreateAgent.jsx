import SidebarLayout from "@/layout/SidebarLayout";
import CreateAgentPage from "@/pages/Agent/CreateAgent/CreateAgentPage";

const CreateAgent = () => {
    return (
        <div>
            <SidebarLayout>
                <CreateAgentPage/>
            </SidebarLayout>
        </div>
    );
};

export default CreateAgent;