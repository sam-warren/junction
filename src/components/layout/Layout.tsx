import { ReactNode } from "react";
import GridBackground from "../ui/GridBackground";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="fixed inset-0 flex flex-col overflow-x-hidden bg-transparent">
      <Header />
      <GridBackground />
      <main className="relative flex-grow overflow-y-auto pt-16 lg:pt-0">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
