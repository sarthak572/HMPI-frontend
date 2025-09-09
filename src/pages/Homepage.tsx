import { Calculator, Map, Database, FileText, Upload, BarChart3, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/dashboard/DashboardCard";
const Homepage = () => {
  const dashboardCards = [{
    title: "Calculate Pollution Indices",
    description: "Comprehensive HMPI, HEI, and other heavy metal pollution index calculations with real-time validation and WHO/BIS standard comparisons.",
    icon: Calculator,
    href: "/calculator",
    variant: "primary" as const
  }, {
    title: "View Pollution Maps",
    description: "Interactive geographical visualization of heavy metal pollution data with heat maps, clustering, and temporal analysis across India.",
    icon: Map,
    href: "/maps",
    variant: "secondary" as const
  }, {
    title: "Browse Historical Data",
    description: "Access comprehensive database of historical heavy metal measurements, trends, and comparative analysis across regions and time periods.",
    icon: Database,
    href: "/data",
    variant: "accent" as const
  }, {
    title: "Generate Reports",
    description: "Create professional assessment reports with statistical analysis, compliance verification, and official government formatting.",
    icon: FileText,
    href: "/reports",
    variant: "primary" as const
  }, {
    title: "Data Upload (Admin)",
    description: "Secure administrative interface for bulk data upload, validation, quality control, and database management operations.",
    icon: Upload,
    href: "/admin/upload",
    variant: "secondary" as const
  }, {
    title: "System Analytics",
    description: "Platform usage statistics, data quality metrics, user activity tracking, and system performance monitoring dashboard.",
    icon: BarChart3,
    href: "/analytics",
    variant: "accent" as const
  }];
  const statsCards = [{
    label: "Total Data Points",
    value: "45,832",
    icon: Database
  }, {
    label: "Active Users",
    value: "1,247",
    icon: Users
  }, {
    label: "Reports Generated",
    value: "3,456",
    icon: FileText
  }, {
    label: "System Uptime",
    value: "99.8%",
    icon: Shield
  }];
  return <div className="min-h-screen bg-background">
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
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                <Calculator className="mr-2 h-5 w-5" />
                Start HMPI Calculation
              </Button>
              <Button variant="government" size="lg" className="text-lg px-8 py-4">
                <Map className="mr-2 h-5 w-5" />
                Explore Pollution Maps
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {statsCards.map((stat, index) => <div key={stat.label} className="text-center animate-fade-in" style={{
            animationDelay: `${index * 100}ms`
          }}>
                <div className="government-card p-6">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Platform Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access comprehensive tools for heavy metal pollution assessment, 
              monitoring, and reporting with government-standard accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardCards.map((card, index) => <div key={card.title} className="animate-fade-in" style={{
            animationDelay: `${index * 100}ms`
          }}>
                <DashboardCard title={card.title} description={card.description} icon={card.icon} href={card.href} variant={card.variant} />
              </div>)}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 subtle-gradient">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Scientific Excellence
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Government Standards</h3>
                    <p className="text-sm text-muted-foreground">WHO, BIS, EPA, and CPCB compliance</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Multiple Indices</h3>
                    <p className="text-sm text-muted-foreground">HPI, HEI, PLI, Nemerow, and more</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-secondary/10 p-2 rounded-lg">
                    <Database className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Comprehensive Database</h3>
                    <p className="text-sm text-muted-foreground">45,000+ verified data points</p>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </section>
    </div>;
};
export default Homepage;