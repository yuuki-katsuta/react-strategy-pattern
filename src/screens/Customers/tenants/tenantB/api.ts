import { apiClient } from "@/lib/apiClient";

export type TenantBSearchParams = {
	name: string;
	email: string;
	status: string;
};

export type TenantBSearchResponse = {
	customers: Array<{
		customerId: string;
		customerName: string;
		email: string;
	}>;
	count: number;
};

export function searchCustomers(
	params: TenantBSearchParams,
): Promise<TenantBSearchResponse> {
	return apiClient.get("/api/tenantB/customers", { params });
}
