import { useState } from "react";
import { Calculator as CalculatorIcon, MapPin, Beaker, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "../components/layout/Layout";
import PollutionMeter from "../components/calculator/PollutionMeter";

const Calculator = () => {
  const [location, setLocation] = useState({
    state: "",
    district: ""
  });

  const [metalConcentrations, setMetalConcentrations] = useState({
    calcium: "",
    magnesium: "",
    sodium: "",
    potassium: "",
    iron: "",
    arsenic: "",
    uranium: ""
  });

  const [results, setResults] = useState(null);

  const metals = [
    { key: "calcium", name: "Calcium (Ca)", unit: "mg/L", whoStandard: 200 },
    { key: "magnesium", name: "Magnesium (Mg)", unit: "mg/L", whoStandard: 150 },
    { key: "sodium", name: "Sodium (Na)", unit: "mg/L", whoStandard: 200 },
    { key: "potassium", name: "Potassium (K)", unit: "mg/L", whoStandard: 12 },
    { key: "iron", name: "Iron (Fe)", unit: "ppm", whoStandard: 0.3 },
    { key: "arsenic", name: "Arsenic (As)", unit: "ppb", whoStandard: 10 },
    { key: "uranium", name: "Uranium (U)", unit: "ppb", whoStandard: 15 }
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
                  Choose pollution index to calculate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pollution index" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hpi">Heavy Metal Pollution Index (HPI)</SelectItem>
                    <SelectItem value="hei">Heavy Metal Evaluation Index (HEI)</SelectItem>
                    <SelectItem value="cd">Contamination Degree (Cd)</SelectItem>
                    <SelectItem value="nemerow">Nemerow Pollution Index</SelectItem>
                    <SelectItem value="pli">Pollution Load Index (PLI)</SelectItem>
                    <SelectItem value="mi">Metal Index (MI)</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Results Display */}
            {results && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-primary">Calculation Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <PollutionMeter value={results.hpi} />
                  <Button variant="outline" className="w-full mt-6">
                    <FileDown className="mr-2 h-4 w-4" />
                    Export Report
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calculator;