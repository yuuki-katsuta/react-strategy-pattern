import { Err, Ok, type Result } from "@/lib/result";
import type {
	Customer,
	CustomerRepository,
} from "@/screens/Customers/domain/customer";
import type { SearchFormValues } from "@/screens/Customers/schema";

export const searchCustomers = async (
	repository: CustomerRepository,
	params: SearchFormValues,
): Promise<Result<Customer[], string>> => {
	const result = await repository.searchCustomers(params);

	if (result.ok) {
		return Ok(result.value);
	}

	return Err(result.error.message);
};
