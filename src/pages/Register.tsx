import Layout from "../components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/integrations/auth";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/integrations/AuthContext";

const Register = () => {
	const navigate = useNavigate();
	const { toast } = useToast();
	const { setUser, setToken } = useAuth();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!email || !password) return;
		try {
			setLoading(true);
			const data = await registerUser({ name, email, password });
			if (data?.token) setToken(data.token);
			if (data?.user) setUser(data.user);
			else setUser({ name, email });
			toast({ title: "Account created", description: "You're all set!" });
			navigate("/");
		} catch (err: any) {
			const message = err?.message || "Registration failed";
			toast({ title: "Error", description: message });
		} finally {
			setLoading(false);
		}
	}

	return (
		<Layout showSidebar={false}>
			<div className="min-h-screen flex items-center justify-center bg-background px-4">
				<Card className="w-full max-w-md">
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl font-bold text-center">Create account</CardTitle>
						<CardDescription className="text-center">
							Sign up to access the HMPI Dashboard
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<form className="space-y-4" onSubmit={handleSubmit}>
							<div className="space-y-2">
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									type="text"
									placeholder="Your name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="Enter your email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									type="password"
									placeholder="Create a password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<Button className="w-full" variant="government" type="submit" disabled={loading}>
								{loading ? "Creating..." : "Create Account"}
							</Button>
						</form>
						<div className="text-center text-sm text-muted-foreground">
							Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</Layout>
	);
};

export default Register;
