import { useState } from "react";
import { Map as MapIcon, Layers, Filter, BarChart3, MapPin, Satellite } from "lucide-react";
import IndiaMap from "../components/maps/IndiaMap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "../components/layout/Layout";

const Maps = () => {
  console.log("Maps component rendering");
  const [selectedLayer, setSelectedLayer] = useState("pollution");
  const [timeRange, setTimeRange] = useState("2024");

  return (
    <Layout showSidebar={true}>
      <div className="h-full flex">
        {/* Map Container */}
        <div className="flex-1 relative bg-muted/20">
          {/* Interactive Map */}
          <div className="absolute inset-0">
            <IndiaMap />
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 space-y-2">
            <Button variant="outline" size="sm" className="bg-background/90 backdrop-blur">
              <Layers className="h-4 w-4 mr-2" />
              Layers
            </Button>
            <Button variant="outline" size="sm" className="bg-background/90 backdrop-blur">
              <Satellite className="h-4 w-4 mr-2" />
              Satellite
            </Button>
          </div>

          {/* Legend */}
          <Card className="absolute bottom-4 left-4 w-64 bg-background/90 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Pollution Levels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm">Safe (&lt; 25)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-sm">Moderate (25-50)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-sm">High (50-100)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm">Critical (&gt; 100)</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Simplified without Select components for now */}
        <div className="w-80 border-l border-border bg-card">
          <div className="p-6 space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-primary" />
                  <span>Map Filters</span>
                </CardTitle>
                <CardDescription>
                  Customize map display options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Data Layer: {selectedLayer}</label>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedLayer(selectedLayer === "pollution" ? "arsenic" : "pollution")}
                    className="w-full"
                  >
                    Toggle Layer
                  </Button>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Time Period: {timeRange}</label>
                  <Button 
                    variant="outline" 
                    onClick={() => setTimeRange(timeRange === "2024" ? "2023" : "2024")}
                    className="w-full"
                  >
                    Toggle Year
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Location Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Selected Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Click on map to view location details</p>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span>Regional Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Total Samples:</span>
                  <span className="font-medium">2,847</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Safe Locations:</span>
                  <span className="font-medium text-green-600">1,203 (42%)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Moderate Risk:</span>
                  <span className="font-medium text-yellow-600">892 (31%)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>High Risk:</span>
                  <span className="font-medium text-orange-600">534 (19%)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Critical Risk:</span>
                  <span className="font-medium text-red-600">218 (8%)</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <MapIcon className="mr-2 h-4 w-4" />
                Export Map
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Maps;