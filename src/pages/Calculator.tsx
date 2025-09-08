import { useState } from "react";
import { Calculator as CalculatorIcon, MapPin, Beaker, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "../components/layout/Layout";

const Calculator = () => {
  const [location, setLocation] = useState({
    state: "",
    district: "",
    coordinates: { lat: "", lng: "" }
  });

  const [metalConcentrations, setMetalConcentrations] = useState({
    arsenic: "",
    cadmium: "",
    chromium: "",
    copper: "",
    iron: "",
    lead: "",
    manganese: "",
    mercury: "",
    nickel: "",
    zinc: ""
  });

  const [results, setResults] = useState(null);

  const metals = [
    { key: "arsenic", name: "Arsenic (As)", unit: "mg/L", whoStandard: 0.01 },
    { key: "cadmium", name: "Cadmium (Cd)", unit: "mg/L", whoStandard: 0.003 },
    { key: "chromium", name: "Chromium (Cr)", unit: "mg/L", whoStandard: 0.05 },
    { key: "copper", name: "Copper (Cu)", unit: "mg/L", whoStandard: 2.0 },
    { key: "iron", name: "Iron (Fe)", unit: "mg/L", whoStandard: 0.3 },
    { key: "lead", name: "Lead (Pb)", unit: "mg/L", whoStandard: 0.01 },
    { key: "manganese", name: "Manganese (Mn)", unit: "mg/L", whoStandard: 0.4 },
    { key: "mercury", name: "Mercury (Hg)", unit: "mg/L", whoStandard: 0.006 },
    { key: "nickel", name: "Nickel (Ni)", unit: "mg/L", whoStandard: 0.07 },
    { key: "zinc", name: "Zinc (Zn)", unit: "mg/L", whoStandard: 3.0 }
  ];

  const calculateHMPI = () => {
    // Mock calculation - in real app, this would be comprehensive
    const mockResults = {
      hpi: 42.5,
      hei: 38.2,
      pli: 1.8,
      nemerow: 45.3,
      category: "Moderate Pollution",
      riskLevel: "Medium Risk"
    };
    setResults(mockResults);
  };

  return (
    <Layout showSidebar={true}>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="government-card p-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <CalculatorIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">HMPI Calculator</h1>
              <p className="text-muted-foreground">Heavy Metal Pollution Index Assessment Tool</p>
            </div>
          </div>
          
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <span>Standards: WHO, BIS, EPA</span>
            <span>•</span>
            <span>Real-time Validation</span>
            <span>•</span>
            <span>Government Compliance</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Location Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Location Information</span>
                </CardTitle>
                <CardDescription>
                  Select sampling location and coordinates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="punjab">Punjab</SelectItem>
                        <SelectItem value="haryana">Haryana</SelectItem>
                        <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                        <SelectItem value="rajasthan">Rajasthan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="district">District</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ludhiana">Ludhiana</SelectItem>
                        <SelectItem value="amritsar">Amritsar</SelectItem>
                        <SelectItem value="jalandhar">Jalandhar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input placeholder="e.g., 30.7046" />
                  </div>
                  <div>
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input placeholder="e.g., 75.8412" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Metal Concentrations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Beaker className="h-5 w-5 text-primary" />
                  <span>Heavy Metal Concentrations</span>
                </CardTitle>
                <CardDescription>
                  Enter measured concentrations for each heavy metal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {metals.map((metal) => (
                    <div key={metal.key} className="space-y-2">
                      <Label htmlFor={metal.key} className="text-sm font-medium">
                        {metal.name}
                      </Label>
                      <div className="relative">
                        <Input
                          id={metal.key}
                          type="number"
                          step="0.001"
                          placeholder="0.000"
                          className="pr-16"
                        />
                        <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">
                          {metal.unit}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        WHO Standard: {metal.whoStandard} {metal.unit}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <Button onClick={calculateHMPI} className="w-full" size="lg">
                    <CalculatorIcon className="mr-2 h-5 w-5" />
                    Calculate Pollution Indices
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* Index Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Index Selection</CardTitle>
                <CardDescription>
                  Choose pollution indices to calculate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="all">All Indices</TabsTrigger>
                    <TabsTrigger value="custom">Custom</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="mt-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Heavy Metal Pollution Index (HPI)</span>
                        <span className="text-primary">✓</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Heavy Metal Evaluation Index (HEI)</span>
                        <span className="text-primary">✓</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pollution Load Index (PLI)</span>
                        <span className="text-primary">✓</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Nemerow Index</span>
                        <span className="text-primary">✓</span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Results Display */}
            {results && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-primary">Calculation Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                      <span className="font-medium">HPI Value:</span>
                      <span className="text-lg font-bold text-primary">{results.hpi}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-accent/5 rounded-lg">
                      <span className="font-medium">HEI Value:</span>
                      <span className="text-lg font-bold text-accent">{results.hei}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-secondary/5 rounded-lg">
                      <span className="font-medium">PLI Value:</span>
                      <span className="text-lg font-bold text-secondary">{results.pli}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-center space-y-2">
                      <div className="status-moderate px-3 py-1 rounded-full text-sm font-medium inline-block">
                        {results.category}
                      </div>
                      <p className="text-sm text-muted-foreground">{results.riskLevel}</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-4">
                    <FileDown className="mr-2 h-4 w-4" />
                    Export Report
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Quick Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pollution Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="text-sm">
                    <div className="font-medium">Safe (&lt; 25)</div>
                    <div className="text-muted-foreground text-xs">Low pollution risk</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="text-sm">
                    <div className="font-medium">Moderate (25-50)</div>
                    <div className="text-muted-foreground text-xs">Requires monitoring</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div className="text-sm">
                    <div className="font-medium">High (50-100)</div>
                    <div className="text-muted-foreground text-xs">Treatment needed</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="text-sm">
                    <div className="font-medium">Critical (&gt; 100)</div>
                    <div className="text-muted-foreground text-xs">Immediate action</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calculator;