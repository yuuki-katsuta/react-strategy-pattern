import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import type { Customer } from "@/screens/Customers/domain/customer";
import {
	TenantProvider,
	useTenantConfig,
} from "@/screens/Customers/providers/TenantProvider";
import type { SearchFormValues } from "@/screens/Customers/schema";
import { searchCustomers } from "@/screens/Customers/usecase/searchCustomers";

function CustomerScreen() {
	const config = useTenantConfig();
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SearchFormValues>({
		resolver: standardSchemaResolver(config.searchSchema),
		defaultValues: {
			name: "",
			email: "",
			status: "",
		},
	});

	const onSubmit = useCallback(
		async (values: SearchFormValues) => {
			setIsLoading(true);
			setError(null);

			const result = await searchCustomers(config, values);

			if (result.ok) {
				setCustomers(result.value);
			} else {
				setError(result.error);
				setCustomers([]);
			}

			setIsLoading(false);
		},
		[config],
	);

	return (
		<div className="customer-search">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor="name">Name</label>
					<input id="name" {...register("name")} />
					{errors.name && <span className="error">{errors.name.message}</span>}
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<input id="email" {...register("email")} />
					{errors.email && (
						<span className="error">{errors.email.message}</span>
					)}
				</div>
				<div>
					<label htmlFor="status">Status</label>
					<select id="status" {...register("status")}>
						<option value="">All</option>
						{[
							{ value: "active", label: "Active" },
							{ value: "inactive", label: "Inactive" },
							{ value: "pending", label: "Pending" },
						].map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>
				<button type="submit" disabled={isLoading}>
					{isLoading ? "Searching..." : "Search"}
				</button>
			</form>

			{error && <div className="error-message">{error}</div>}

			<div className="results">
				{customers.map((customer) => (
					<div key={customer.id} className="customer-row">
						<span>{customer.name}</span>
						<span>{customer.email}</span>
					</div>
				))}
			</div>
		</div>
	);
}

export function CustomerSearchScreen() {
	return (
		<TenantProvider>
			<CustomerScreen />
		</TenantProvider>
	);
}
