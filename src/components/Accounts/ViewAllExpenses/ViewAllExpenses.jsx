import SidebarLayout from "@/layout/SidebarLayout";
import ViewAllExpensesPage from "@/pages/Accounts/ViewAllExpenses/ViewAllExpensesPage";

const ViewAllExpenses = () => {
    return (
        <div>
            <SidebarLayout>
                <ViewAllExpensesPage/>
            </SidebarLayout>
        </div>
    );
};

export default ViewAllExpenses;