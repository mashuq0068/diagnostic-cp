import SidebarLayout from "@/layout/SidebarLayout";
import ExpenseReportPage from "@/pages/Reports/ExpenseReport/ExpenseReportPage";

const ExpenseReport = () => {
    return (
        <div>
            <SidebarLayout>
                <ExpenseReportPage/>
            </SidebarLayout>
        </div>
    );
};

export default ExpenseReport;