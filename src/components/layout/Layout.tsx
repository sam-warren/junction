import { ReactNode } from "react";
import GridBackground from "../ui/GridBackground";
import Footer from "./Footer";
import Header from "./Header";
import BloomBackground from "../ui/BloomBackground";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="fixed inset-0 bg-white dark:bg-gray-900">
        <GridBackground />
        <BloomBackground />
      </div>
      <div className="fixed inset-0 flex flex-col">
        <div className="h-16 sm:h-16 lg:h-20" />
        <div className="flex-1 overflow-y-auto">
          <main className="min-h-full px-4 sm:px-6 lg:px-8">{children}</main>
        </div>
        <div className="hidden h-12 md:block" />
      </div>
      <Header />
      <Footer />
    </>
  );
};

export default Layout;
