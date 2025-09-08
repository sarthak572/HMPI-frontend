import { Bell, User, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-[var(--shadow-government)] sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar with government info */}
        <div className="flex items-center justify-between py-2 border-b border-primary-glow/20">
          <div className="text-xs opacity-90">
            Government of India | Ministry of Jal Shakti | Department of Water Resources
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <span>हिन्दी</span>
            <span>Screen Reader</span>
            <span>A+</span>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo and branding */}
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/a3d35f26-0eb5-47e0-99fa-a66b95b3f271.png" 
              alt="HydroVeda Logo" 
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold">HydroVeda</h1>
              <p className="text-sm opacity-90">Heavy Metal Pollution Index Assessment Platform</p>
            </div>
          </div>

          {/* Navigation and user actions */}
          <div className="flex items-center space-x-6">
            {/* Search */}
            <div className="hidden md:flex relative">
              <Input 
                placeholder="Search locations, data..." 
                className="w-80 bg-primary-foreground/10 border-primary-glow/30 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 opacity-60" />
            </div>

            {/* User actions */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-glow/20">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="government" size="sm">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
              <Button variant="ghost" size="sm" className="md:hidden text-primary-foreground">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="hidden md:flex space-x-8 py-3 border-t border-primary-glow/20">
          <Link to="/" className="text-sm font-medium hover:text-primary-glow transition-colors">Home</Link>
          <Link to="/calculator" className="text-sm font-medium hover:text-primary-glow transition-colors">Calculate HMPI</Link>
          <Link to="/maps" className="text-sm font-medium hover:text-primary-glow transition-colors">Interactive Maps</Link>
          <a href="/data" className="text-sm font-medium hover:text-primary-glow transition-colors">Data Repository</a>
          <a href="/reports" className="text-sm font-medium hover:text-primary-glow transition-colors">Reports</a>
          <a href="/guide" className="text-sm font-medium hover:text-primary-glow transition-colors">User Guide</a>
          <a href="/admin" className="text-sm font-medium hover:text-primary-glow transition-colors">Admin</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;