import SidebarLayout from "@/layout/SidebarLayout";
import NewExpensePage from "@/pages/Accounts/NewExpense/NewExpensePage";


const NewExpense = () => {
    return (
        <div>
            <SidebarLayout>
                <NewExpensePage/>
            </SidebarLayout>
        </div>
    );
};

export default NewExpense;