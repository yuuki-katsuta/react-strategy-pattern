import type { Customer } from "@/screens/Customers/domain/customer";
import type { SearchFormValues } from "@/screens/Customers/schema";
import type { TenantBSearchParams, TenantBSearchResponse } from "./api";

export function toRequestParams(
	values: SearchFormValues,
): TenantBSearchParams {
	return {
		name: values.name,
		email: values.email,
		status: values.status,
	};
}

export function toCustomers(response: TenantBSearchResponse): Customer[] {
	return response.customers.map((c) => ({
		id: c.customerId,
		name: c.customerName,
		email: c.email,
	}));
}
