import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-full min-h-screen flex flex-col bg-white dark:bg-gray-900 pb-16">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;