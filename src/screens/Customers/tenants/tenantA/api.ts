import { apiClient } from "@/lib/apiClient";

export type TenantASearchParams = {
	fullName: string;
	contactEmail: string;
	accountStatus: string;
};

export type TenantASearchResponse = {
	data: {
		results: Array<{
			id: string;
			fullName: string;
			contactEmail: string;
		}>;
		total: number;
	};
};

export function searchCustomers(
	params: TenantASearchParams,
): Promise<TenantASearchResponse> {
	return apiClient.post("/api/tenantA/customers", params);
}
