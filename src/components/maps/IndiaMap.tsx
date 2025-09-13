import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const IndiaMap = () => {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 overflow-hidden">
      {/* India Map SVG Representation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 800 600"
          className="w-full h-full max-w-4xl opacity-20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Simplified India outline */}
          <path
            d="M200 150 Q250 120 300 140 Q350 130 400 150 Q450 160 500 180 Q550 200 580 250 Q590 300 570 350 Q550 400 500 450 Q450 480 400 500 Q350 520 300 510 Q250 500 200 480 Q150 450 130 400 Q110 350 120 300 Q130 250 150 200 Q170 150 200 150 Z"
            fill="hsl(var(--primary))"
            stroke="hsl(var(--primary-foreground))"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Sample location markers */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <MapPin className="h-8 w-8 text-red-500 drop-shadow-lg animate-pulse" />
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
            High Pollution
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <MapPin className="h-6 w-6 text-yellow-500 drop-shadow-lg" />
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
            Moderate
          </div>
        </div>
      </div>

      <div className="absolute bottom-1/3 right-1/3 transform translate-x-1/2 translate-y-1/2">
        <div className="relative">
          <MapPin className="h-6 w-6 text-green-500 drop-shadow-lg" />
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
            Safe
          </div>
        </div>
      </div>

      {/* Interactive overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center space-y-4 p-8 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
          <Navigation className="h-12 w-12 text-primary mx-auto" />
          <div>
            <h3 className="text-xl font-semibold text-primary">India HMPI Map</h3>
            <p className="text-muted-foreground">Heavy Metal Pollution Monitoring</p>
            <p className="text-sm text-muted-foreground mt-2">
              Interactive pollution data visualization across India
            </p>
          </div>
        </div>
      </div>

      {/* Map grid overlay for realism */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
    </div>
  );
};
export default IndiaMap;
