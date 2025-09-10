import { Bell, User, Menu, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const Header = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return <header className="bg-primary text-primary-foreground shadow-[var(--shadow-government)] sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar with government info */}
        

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo and branding */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/df879114-28c7-4140-af4d-747c33a63dcc.png" 
              alt="HydroVeda Logo" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Navigation and user actions */}
          <div className="flex items-center space-x-6">
            {/* Search */}
            <div className="hidden md:flex relative">
              
              
            </div>

            {/* User actions */}
            <div className="flex items-center space-x-2">
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="government" size="sm" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{user.email}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="government" size="sm" asChild>
                  <Link to="/login">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                </Button>
              )}
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