export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions {
	method?: HttpMethod;
	path: string;
	body?: unknown;
	headers?: Record<string, string>;
	auth?: boolean;
}

export interface ApiErrorBody {
	message?: string;
	errors?: unknown;
}

export class ApiError extends Error {
	status: number;
	body?: ApiErrorBody | unknown;
	constructor(status: number, message: string, body?: ApiErrorBody | unknown) {
		super(message);
		this.status = status;
		this.body = body;
	}
}

export function getAuthToken(): string | null {
	return localStorage.getItem("auth_token");
}

export function setAuthToken(token: string | null) {
	if (token) localStorage.setItem("auth_token", token);
	else localStorage.removeItem("auth_token");
}

export async function apiRequest<T = unknown>({ method = "GET", path, body, headers = {}, auth = false }: RequestOptions): Promise<T> {
	const url = `${API_BASE_URL}${path}`;
	const finalHeaders: Record<string, string> = {
		"Content-Type": "application/json",
		...headers,
	};
	if (auth) {
		const token = getAuthToken();
		if (token) finalHeaders["Authorization"] = `Bearer ${token}`;
	}
	const response = await fetch(url, {
		method,
		headers: finalHeaders,
		body: body !== undefined ? JSON.stringify(body) : undefined,
	});

	const text = await response.text();
	let maybeJson: unknown = undefined;
	if (text) {
		try {
			maybeJson = JSON.parse(text);
		} catch (_err) {
			maybeJson = text;
		}
	}

	if (!response.ok) {
		const message = (typeof maybeJson === "object" && maybeJson && (maybeJson as any).message)
			? (maybeJson as any).message
			: `Request failed with status ${response.status}`;
		throw new ApiError(response.status, message, maybeJson);
	}
	return maybeJson as T;
}
