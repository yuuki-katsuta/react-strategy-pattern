type RequestOptions = {
	headers?: Record<string, string>;
	params?: Record<string, string | number | boolean | undefined | null>;
};

function buildUrlWithParams(
	url: string,
	params?: RequestOptions["params"],
): string {
	if (!params) {
		return url;
	}

	const filtered = Object.fromEntries(
		Object.entries(params).filter(
			([, value]) => value !== undefined && value !== null && value !== "",
		),
	);

	if (Object.keys(filtered).length === 0) {
		return url;
	}

	const queryString = new URLSearchParams(
		filtered as Record<string, string>,
	).toString();

	return `${url}?${queryString}`;
}

async function fetchApi<T>(
	url: string,
	init: {
		method: string;
		headers?: Record<string, string>;
		body?: unknown;
		params?: RequestOptions["params"];
	},
): Promise<T> {
	const fullUrl = buildUrlWithParams(url, init.params);

	const response = await fetch(fullUrl, {
		method: init.method,
		headers: {
			"Content-Type": "application/json",
			...init.headers,
		},
		body: init.body ? JSON.stringify(init.body) : undefined,
	});

	if (!response.ok) {
		throw new Error(`Request failed: ${response.statusText}`);
	}

	return response.json();
}

export const apiClient = {
	get<T>(url: string, options?: RequestOptions): Promise<T> {
		return fetchApi<T>(url, { ...options, method: "GET" });
	},
	post<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T> {
		return fetchApi<T>(url, { ...options, method: "POST", body });
	},
	put<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T> {
		return fetchApi<T>(url, { ...options, method: "PUT", body });
	},
	patch<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T> {
		return fetchApi<T>(url, { ...options, method: "PATCH", body });
	},
	delete<T>(url: string, options?: RequestOptions): Promise<T> {
		return fetchApi<T>(url, { ...options, method: "DELETE" });
	},
};
