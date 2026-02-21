import type { Customer } from "@/screens/Customers/domain/customer";
import type { SearchFormValues } from "@/screens/Customers/schema";
import type { TenantASearchResponse } from "./api";

export function toRequestParams(values: SearchFormValues) {
	return {
		fullName: values.name,
		contactEmail: values.email,
		accountStatus: values.status,
	};
}

export function toCustomers(response: TenantASearchResponse): Customer[] {
	return response.data.results.map((r) => ({
		id: r.id,
		name: r.fullName,
		email: r.contactEmail,
	}));
}
