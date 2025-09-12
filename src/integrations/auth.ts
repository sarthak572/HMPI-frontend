import { apiRequest, setAuthToken } from "@/lib/api";

export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	name?: string;
	email: string;
	password: string;
}

export interface AuthUser {
	id?: string | number;
	email?: string;
	name?: string;
}

export interface AuthResponse {
	token: string;
	user?: AuthUser;
}

const USER_STORAGE_KEY = "auth_user";

export function getStoredUser(): AuthUser | null {
	try {
		const raw = localStorage.getItem(USER_STORAGE_KEY);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}

function setStoredUser(user: AuthUser | null) {
	if (user) localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
	else localStorage.removeItem(USER_STORAGE_KEY);
}

export async function loginUser(payload: LoginRequest): Promise<AuthResponse> {
	const data = await apiRequest<AuthResponse>({
		method: "POST",
		path: "/auth/login",
		body: payload,
	});
	if (data?.token) setAuthToken(data.token);
	if (data?.user) setStoredUser(data.user);
	return data;
}

export async function registerUser(payload: RegisterRequest): Promise<AuthResponse> {
	const data = await apiRequest<AuthResponse>({
		method: "POST",
		path: "/auth/register",
		body: payload,
	});
	if (data?.token) setAuthToken(data.token);
	if (data?.user) setStoredUser(data.user);
	return data;
}

export function logoutUser() {
	setAuthToken(null);
	setStoredUser(null);
}
