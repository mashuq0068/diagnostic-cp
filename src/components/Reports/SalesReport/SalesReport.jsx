import SidebarLayout from "@/layout/SidebarLayout";
import SalesReportPage from "@/pages/Reports/SalesReport/SalesReportPage";

const SalesReport = () => {
    return (
        <div>
            <SidebarLayout>
                <SalesReportPage/>
            </SidebarLayout>
        </div>
    );
};

export default SalesReport;