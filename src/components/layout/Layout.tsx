import { ReactNode } from "react";
import GridBackground from "../ui/GridBackground";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative flex min-h-screen flex-col bg-transparent">
      <Header />
      <GridBackground />
      <main className="relative flex-grow pt-16 lg:pt-0">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
