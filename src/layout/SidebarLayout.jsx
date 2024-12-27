import PropTypes from "prop-types";
import { SidebarProvider } from "@/components/ui/sidebar";
import TopBar from "./TopBar";
import AppSidebar from "./AppSidebar";
import useLoadingStore from "@/store/loadingStore";

function SidebarLayout({ children }) {
  const { loading } = useLoadingStore();
  return (
    <SidebarProvider className=" min-h-[100vh]">
     
      <AppSidebar />
      <main className="w-full max-w-full  overflow-x-hidden  bg-[#F1F8FF] ">
        <TopBar />
        <div
          aria-live="polite"
          aria-busy={loading}
          className={`animated ${
            loading ? "flex" : "hidden"
          } LoadingOverlay text-center center-full-screen`}
        >
          <img
            alt="Loading spinner"
            className="progressCustom-logo"
            src={"/images/spin.svg"}
          />
        </div>

        <div className="p-4 lg:px-12 lg:py-0">{children}</div>
      </main>
    </SidebarProvider>
  );
}

SidebarLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SidebarLayout;
