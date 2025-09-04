import { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

const Layout = ({ children, showSidebar = false }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        {showSidebar && <Sidebar />}
        
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Layout;