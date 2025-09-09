import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
const Footer = () => {
  return <footer className="bg-primary text-primary-foreground mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About HydroVeda</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              Comprehensive Heavy Metal Pollution Index Assessment Platform 
              developed for monitoring water quality across India.
            </p>
            <div className="flex space-x-2">
              <img src="/lovable-uploads/a3d35f26-0eb5-47e0-99fa-a66b95b3f271.png" alt="HydroVeda" className="h-8 w-auto opacity-90" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/calculator" className="hover:text-primary-glow transition-colors">HMPI Calculator</a></li>
              <li><a href="/maps" className="hover:text-primary-glow transition-colors">Interactive Maps</a></li>
              <li><a href="/data" className="hover:text-primary-glow transition-colors">Data Repository</a></li>
              <li><a href="/reports" className="hover:text-primary-glow transition-colors">Reports</a></li>
              <li><a href="/guide" className="hover:text-primary-glow transition-colors">User Guide</a></li>
            </ul>
          </div>

          {/* Government Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Government Portals</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://jalshakti.gov.in" className="hover:text-primary-glow transition-colors flex items-center">
                  Ministry of Jal Shakti <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="https://cgwb.gov.in" className="hover:text-primary-glow transition-colors flex items-center">
                  CGWB <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="https://cpcb.nic.in" className="hover:text-primary-glow transition-colors flex items-center">
                  CPCB <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="https://indiawris.gov.in" className="hover:text-primary-glow transition-colors flex items-center">
                  India-WRIS <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 opacity-70" />
                <span>support@hydroveda.gov.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 opacity-70" />
                <span>+91-11-2436-0000</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 opacity-70" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-primary-glow/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm opacity-90">© 2025 HydroVeda</div>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="hover:text-primary-glow transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-primary-glow transition-colors">Terms of Use</a>
              <a href="/accessibility" className="hover:text-primary-glow transition-colors">Accessibility</a>
              <a href="/sitemap" className="hover:text-primary-glow transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;