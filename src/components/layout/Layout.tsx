import { ReactNode } from "react";
import GridBackground from "../ui/GridBackground";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      {/* Fixed background layer */}
      <div className="fixed inset-0 bg-white dark:bg-gray-900">
        <GridBackground />
      </div>

      {/* Scrollable content layer */}
      <div className="fixed inset-0 flex flex-col">
        <Header />
        <div className="relative flex-grow overflow-y-auto pb-[env(safe-area-inset-bottom)]">
          <main className="relative pt-16 lg:pt-0">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
