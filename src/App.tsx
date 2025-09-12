import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Calculator from "./pages/Calculator";
import Maps from "./pages/Maps";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import { AuthProvider } from "@/integrations/AuthContext";

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<Toaster />
			<Sonner />
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Index />} />
						<Route path="/calculator" element={<Calculator />} />
						<Route path="/maps" element={<Maps />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</TooltipProvider>
	</QueryClientProvider>
);

export default App;
