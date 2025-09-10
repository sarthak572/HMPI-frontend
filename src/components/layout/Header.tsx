import { Bell, User, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
const Header = () => {
  return <header className="bg-primary text-primary-foreground shadow-[var(--shadow-government)] sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar with government info */}
        

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo and branding */}
          

          {/* Navigation and user actions */}
          <div className="flex items-center space-x-6">
            {/* Search */}
            <div className="hidden md:flex relative">
              
              <Search className="absolute right-3 top-2.5 h-4 w-4 opacity-60" />
            </div>

            {/* User actions */}
            <div className="flex items-center space-x-2">
              
              <Button variant="government" size="sm" asChild>
                <Link to="/login">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Link>
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
          
          
        </nav>
      </div>
    </header>;
};
export default Header;