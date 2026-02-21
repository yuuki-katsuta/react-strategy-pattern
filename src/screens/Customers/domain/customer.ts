import type { AppError } from "@/lib/error";
import type { Result } from "@/lib/result";
import type { SearchFormValues } from "@/screens/Customers/schema";

export type Customer = {
	id: string;
	name: string;
	email: string;
};

export type CustomerRepository = {
	searchCustomers: (
		params: SearchFormValues,
	) => Promise<Result<Customer[], AppError>>;
};
