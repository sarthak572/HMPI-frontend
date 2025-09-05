import { useState } from "react";
import { Map as MapIcon, Layers, Filter, BarChart3, MapPin, Satellite } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Layout from "../components/layout/Layout";

const Maps = () => {
  const [selectedLayer, setSelectedLayer] = useState("pollution");
  const [timeRange, setTimeRange] = useState("2024");

  return (
    <Layout showSidebar={true}>
      <div className="h-full flex">
        {/* Map Container */}
        <div className="flex-1 relative bg-muted/20">
          {/* Map Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="bg-primary/10 p-6 rounded-full inline-block">
                <MapIcon className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Interactive Map</h3>
                <p className="text-muted-foreground">Heavy Metal Pollution Visualization</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Map integration will display pollution data with interactive layers
                </p>
              </div>
            </div>
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

        {/* Right Panel - Input Controls Only */}
        <div className="w-80 border-l border-border bg-card">
          <div className="p-6 space-y-6">
            {/* Location Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Location Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">State</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="punjab">Punjab</SelectItem>
                      <SelectItem value="haryana">Haryana</SelectItem>
                      <SelectItem value="up">Uttar Pradesh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">District</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ludhiana">Ludhiana</SelectItem>
                      <SelectItem value="amritsar">Amritsar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Temporal Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Temporal Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Date Range</label>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="all">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Pollution Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Pollution Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Index Type</label>
                  <Select value={selectedLayer} onValueChange={setSelectedLayer}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pollution">Pollution Index</SelectItem>
                      <SelectItem value="arsenic">Arsenic Levels</SelectItem>
                      <SelectItem value="iron">Iron Levels</SelectItem>
                      <SelectItem value="uranium">Uranium Levels</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Pollution Level</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="safe">Safe (0-25)</SelectItem>
                      <SelectItem value="moderate">Moderate (25-50)</SelectItem>
                      <SelectItem value="high">High (50-100)</SelectItem>
                      <SelectItem value="critical">Critical (100+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Map Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Map Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Layer Opacity</label>
                  <Slider defaultValue={[80]} max={100} step={1} className="w-full" />
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="clustering" className="rounded" />
                  <label htmlFor="clustering" className="text-sm">Enable Marker Clustering</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="legend" className="rounded" defaultChecked />
                  <label htmlFor="legend" className="text-sm">Show Legend</label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Maps;