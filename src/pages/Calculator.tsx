import { useState } from "react";
import { Calculator as CalculatorIcon, MapPin, Beaker } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Layout from "../components/layout/Layout";
import Speedometer from "@/components/ui/speedometer";

interface CalcResults {
	hpi?: number;
	hei?: number;
	pli?: number;
	nemerow?: number;
	category?: string;
	riskLevel?: string;
}

const Calculator = () => {
	const [location, setLocation] = useState({
		state: "",
		district: ""
	});

	const [waterParameters, setWaterParameters] = useState<Record<string, string>>({
		calcium: "",
		magnesium: "",
		sodium: "",
		potassium: "",
		iron: "",
		arsenic: "",
		uranium: ""
	});

	const [selectedIndices, setSelectedIndices] = useState({
		hpi: true,
		hei: true,
		pli: true,
		nemerow: false
	});

	const [dropdownIndex, setDropdownIndex] = useState("");
	const [pollutionLevel, setPollutionLevel] = useState(0);
	const [results, setResults] = useState<CalcResults | null>(null);

	const waterParams = [
		{ key: "calcium", name: "Calcium (Ca)", unit: "mg/L" },
		{ key: "magnesium", name: "Magnesium (Mg)", unit: "mg/L" },
		{ key: "sodium", name: "Sodium (Na)", unit: "mg/L" },
		{ key: "potassium", name: "Potassium (K)", unit: "mg/L" },
		{ key: "iron", name: "Iron (Fe)", unit: "ppm" },
		{ key: "arsenic", name: "Arsenic (As)", unit: "ppb" },
		{ key: "uranium", name: "Uranium (U)", unit: "ppb" }
	];

	const indices = [
		{ key: "hpi", name: "Heavy Metal Pollution Index (HPI)" },
		{ key: "hei", name: "Heavy Metal Evaluation Index (HEI)" },
		{ key: "pli", name: "Pollution Load Index (PLI)" },
		{ key: "nemerow", name: "Nemerow Index" }
	];

	// Standards (Si) in mg/L and ideal values (Ii = 0 for metals)
	const STANDARDS_MG_L: Record<string, number> = {
		fe: 0.3, // BIS/WHO guideline for iron
		as: 0.01, // arsenic
		u: 0.03 // uranium (example guideline)
	};

	function parseNumber(value: string): number | null {
		if (value === undefined || value === null || value === "") return null;
		const n = Number(value);
		return Number.isFinite(n) ? n : null;
	}

	function computeIndices(): CalcResults | null {
		// Convert inputs to mg/L for selected metals
		const fePpm = parseNumber(waterParameters.iron); // ppm ~ mg/L
		const asPpb = parseNumber(waterParameters.arsenic); // ppb -> mg/L
		const uPpb = parseNumber(waterParameters.uranium); // ppb -> mg/L

		const metals: { code: "fe" | "as" | "u"; Mi: number; Si: number }[] = [];
		if (fePpm !== null) metals.push({ code: "fe", Mi: fePpm, Si: STANDARDS_MG_L.fe });
		if (asPpb !== null) metals.push({ code: "as", Mi: asPpb / 1000, Si: STANDARDS_MG_L.as });
		if (uPpb !== null) metals.push({ code: "u", Mi: uPpb / 1000, Si: STANDARDS_MG_L.u });

		if (metals.length === 0) return null;

		// Common ratios Pi = Mi/Si
		const Pi = metals.map(m => m.Mi / m.Si);
		const n = Pi.length;

		// HPI components: Qi = 100 * (Mi - Ii)/(Si - Ii), with Ii=0 → 100*Mi/Si
		// Weights Wi = 1/Si (relative), normalized by ΣWi in the formula
		let Wi_sum = 0;
		let WiQi_sum = 0;
		for (const m of metals) {
			const Wi = 1 / m.Si;
			const Qi = 100 * (m.Mi / m.Si);
			Wi_sum += Wi;
			WiQi_sum += Wi * Qi;
		}
		const hpi = Wi_sum > 0 ? WiQi_sum / Wi_sum : undefined;

		// HEI = Σ (Mi/Si)
		const hei = Pi.reduce((s, v) => s + v, 0);

		// PLI = (Π Cf_i)^(1/n), Cf_i = Mi/Si
		const productPi = Pi.reduce((p, v) => p * v, 1);
		const pli = Math.pow(productPi, 1 / n);

		// Nemerow = sqrt((Pi_max^2 + Pi_avg^2)/2)
		const piMax = Math.max(...Pi);
		const piAvg = hei / n;
		const nemerow = Math.sqrt((piMax * piMax + piAvg * piAvg) / 2);

		// Simple categorization based on HPI (example thresholds)
		const level = hpi !== undefined ? hpi : piAvg * 100;
		const category = level < 25 ? "Low Pollution" : level < 50 ? "Moderate Pollution" : level < 75 ? "High Pollution" : "Very High Pollution";
		const riskLevel = level < 25 ? "Low Risk" : level < 50 ? "Medium Risk" : level < 75 ? "High Risk" : "Severe Risk";

		return {
			hpi: selectedIndices.hpi ? hpi : undefined,
			hei: selectedIndices.hei ? hei : undefined,
			pli: selectedIndices.pli ? pli : undefined,
			nemerow: selectedIndices.nemerow ? nemerow : undefined,
			category,
			riskLevel
		};
	}

	const calculateHMPI = () => {
		const calc = computeIndices();
		if (!calc) {
			setResults(null);
			setPollutionLevel(0);
			return;
		}
		setResults(calc);
		const gauge = calc.hpi !== undefined ? calc.hpi : (calc.nemerow !== undefined ? calc.nemerow * 100 : 0);
		setPollutionLevel(Math.max(0, Math.min(100, gauge)));
	};

	const handleIndexToggle = (indexKey: string) => {
		setSelectedIndices(prev => ({
			...prev,
			[indexKey]: !prev[indexKey]
		}));
	};

	function formatNumber(n?: number) {
		if (n === undefined || n === null || Number.isNaN(n)) return "-";
		return n.toFixed(3);
	}

	return (
		<Layout showSidebar={false}>
			<div className="min-h-screen bg-background">
				{/* Header */}
				<div className="bg-primary text-primary-foreground py-8">
					<div className="max-w-6xl mx-auto px-6">
						<div className="flex items-center space-x-3">
							<div className="bg-primary-foreground/10 p-2 rounded-lg">
								<CalculatorIcon className="h-6 w-6" />
							</div>
							<div>
								<h1 className="text-3xl font-bold">Calculate HMPI</h1>
								<p className="text-primary-foreground/80">Heavy Metal Pollution Index Assessment Tool</p>
							</div>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className="max-w-6xl mx-auto p-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{/* Left Column - Input Forms */}
						<div className="space-y-6">
							{/* Location Information */}
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center space-x-2">
										<MapPin className="h-5 w-5 text-primary" />
										<span>Location Information</span>
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<Label htmlFor="state">State</Label>
											<Select value={location.state} onValueChange={(value) => setLocation(prev => ({ ...prev, state: value }))}>
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
											<Select value={location.district} onValueChange={(value) => setLocation(prev => ({ ...prev, district: value }))}>
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

							{/* Water Quality Parameters */}
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center space-x-2">
										<Beaker className="h-5 w-5 text-primary" />
										<span>Water Quality Parameters</span>
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{waterParams.map((param) => (
											<div key={param.key} className="space-y-2">
												<Label htmlFor={param.key} className="text-sm font-medium">
													{param.name}
												</Label>
												<div className="relative">
													<Input
														id={param.key}
														type="number"
														step="0.001"
														placeholder="0.000"
														className="pr-16"
														value={waterParameters[param.key]}
														onChange={(e) => setWaterParameters(prev => ({ ...prev, [param.key]: e.target.value }))}
													/>
													<span className="absolute right-3 top-2.5 text-xs text-muted-foreground">
														{param.unit}
													</span>
												</div>
											</div>
										))}
									</div>

									<div className="mt-6">
										<Button onClick={calculateHMPI} className="w-full" size="lg">
											<CalculatorIcon className="mr-2 h-5 w-5" />
											Calculate HMPI
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Right Column - Selection and Results */}
						<div className="space-y-6">
							{/* Index Selection Box 1 - Multi-select with checkboxes */}
							<Card className="border-2 shadow-md">
								<CardHeader>
									<CardTitle className="text-lg">Index Selection (Multi-select)</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										{indices.map((index) => (
											<div key={index.key} className="flex items-center justify-between">
												<div className="flex items-center space-x-2">
													<Checkbox
														id={index.key}
														checked={selectedIndices[index.key]}
														onCheckedChange={() => handleIndexToggle(index.key)}
													/>
													<Label htmlFor={index.key} className="text-sm font-medium cursor-pointer">
														{index.name}
													</Label>
												</div>
												{selectedIndices[index.key] && (
													<span className="text-green-500 text-lg">✓</span>
												)}
											</div>
										))}
									</div>
								</CardContent>
							</Card>

							{/* Index Selection Box 2 - Dropdown select */}
							<Card className="border-2 shadow-md">
								<CardHeader>
									<CardTitle className="text-lg">Index Selection (Dropdown)</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<Select value={dropdownIndex} onValueChange={setDropdownIndex}>
										<SelectTrigger>
											<SelectValue placeholder="Select an index" />
										</SelectTrigger>
										<SelectContent>
											{indices.map((index) => (
												<SelectItem key={index.key} value={index.key}>
													{index.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									{dropdownIndex && (
										<div className="p-3 bg-muted/50 rounded-md">
											<p className="text-sm font-medium">Selected:</p>
											<p className="text-sm text-muted-foreground">
												{indices.find(i => i.key === dropdownIndex)?.name}
											</p>
										</div>
									)}
								</CardContent>
							</Card>

							{/* Pollution Level Meter */}
							<Card className="border-2 shadow-md">
								<CardHeader>
									<CardTitle className="text-lg text-center">Pollution Level Meter</CardTitle>
								</CardHeader>
								<CardContent className="flex justify-center">
									<Speedometer value={pollutionLevel} />
								</CardContent>
							</Card>

							{/* Results */}
							<Card className="border-2 shadow-md">
								<CardHeader>
									<CardTitle className="text-lg">Results</CardTitle>
									<CardDescription>Calculated indices based on your inputs</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
										<div className="flex justify-between"><span>HPI</span><span>{formatNumber(results?.hpi)}</span></div>
										<div className="flex justify-between"><span>HEI</span><span>{formatNumber(results?.hei)}</span></div>
										<div className="flex justify-between"><span>PLI</span><span>{formatNumber(results?.pli)}</span></div>
										<div className="flex justify-between"><span>Nemerow</span><span>{formatNumber(results?.nemerow)}</span></div>
									</div>
									{results && (
										<div className="mt-4 text-center">
											<p className="font-medium">{results.category}</p>
											<p className="text-muted-foreground">{results.riskLevel}</p>
										</div>
									)}
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Calculator;