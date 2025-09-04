import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="space-y-4">
          <div className="bg-destructive/10 p-4 rounded-full inline-block">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
            <h2 className="text-xl font-semibold text-foreground mb-2">Page Not Found</h2>
            <p className="text-muted-foreground">
              The page you are looking for might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link to="/calculator">
              Go to HMPI Calculator
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
