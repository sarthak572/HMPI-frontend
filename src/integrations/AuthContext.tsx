import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getAuthToken, setAuthToken } from "@/lib/api";
import { AuthUser, getStoredUser, logoutUser as authLogout } from "@/integrations/auth";

interface AuthState {
	user: AuthUser | null;
	token: string | null;
	setUser: (u: AuthUser | null) => void;
	setToken: (t: string | null) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [tokenState, setTokenState] = useState<string | null>(null);

	useEffect(() => {
		setUser(getStoredUser());
		setTokenState(getAuthToken());
	}, []);

	const logout = () => {
		authLogout();
		setUser(null);
		setTokenState(null);
	};

	const setToken = (t: string | null) => {
		setAuthToken(t);
		setTokenState(t);
	};

	const value = useMemo<AuthState>(() => ({ user, token: tokenState, setUser, setToken, logout }), [user, tokenState]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}
