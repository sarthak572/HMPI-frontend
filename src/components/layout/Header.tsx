import { User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import LoginModal from "../auth/LoginModal";

const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <header className="bg-primary text-primary-foreground shadow-[var(--shadow-government)] sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Main header */}
          <div className="flex items-center justify-between py-4">
            {/* Logo and branding */}
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/a3d35f26-0eb5-47e0-99fa-a66b95b3f271.png" 
                alt="HMPI Calculator Logo" 
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold">HMPI Calculator Platform</h1>
                <p className="text-sm opacity-90">Heavy Metal Pollution Index Assessment</p>
              </div>
            </div>

            {/* User actions */}
            <div className="flex items-center space-x-2">
              <Button 
                variant="government" 
                size="sm"
                onClick={() => setShowLoginModal(true)}
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
              <Button variant="ghost" size="sm" className="md:hidden text-primary-foreground">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Main navigation */}
          <nav className="hidden md:flex space-x-8 py-3 border-t border-primary-glow/20">
            <Link to="/" className="text-sm font-medium hover:text-primary-glow transition-colors">Home</Link>
            <Link to="/calculate-hmpi" className="text-sm font-medium hover:text-primary-glow transition-colors">Calculate HMPI</Link>
            <Link to="/interactive-maps" className="text-sm font-medium hover:text-primary-glow transition-colors">Interactive Maps</Link>
            <Link to="/data-repository" className="text-sm font-medium hover:text-primary-glow transition-colors">Data Repository</Link>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-sm font-medium hover:text-primary-glow transition-colors p-0 h-auto"
              onClick={() => setShowLoginModal(true)}
            >
              Login
            </Button>
          </nav>
        </div>
      </header>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
};

export default Header;