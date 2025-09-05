import { Calculator, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Heavy Metal Pollution Index
              <br />
              <span className="text-primary-glow">Assessment Platform</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto leading-relaxed">
              Comprehensive Heavy Metal Pollution Monitoring & Assessment System for India
              <br />
              <span className="text-lg">Empowering scientific water quality analysis with precision and authority</span>
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
              <Button 
                variant="hero" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => navigate('/calculate-hmpi')}
              >
                <Calculator className="mr-2 h-5 w-5" />
                Start HMPI Calculation
              </Button>
              <Button 
                variant="government" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => navigate('/interactive-maps')}
              >
                <Map className="mr-2 h-5 w-5" />
                Explore Pollution Maps
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Homepage;