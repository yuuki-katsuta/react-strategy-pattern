import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";

const tenantAHandler = http.post(
	"/api/tenantA/customers",
	async ({ request }) => {
		const body = (await request.json()) as {
			fullName: string;
			contactEmail: string;
			accountStatus: string;
		};

		const allCustomers = [
			{
				id: "A001",
				fullName: "Alice TenantA",
				contactEmail: "alice@tenantA.com",
			},
			{
				id: "A002",
				fullName: "Bob TenantA",
				contactEmail: "bob@tenantA.com",
			},
			{
				id: "A003",
				fullName: "Charlie TenantA",
				contactEmail: "charlie@tenantA.com",
			},
		];

		const filtered = allCustomers.filter((c) => {
			if (
				body.fullName &&
				!c.fullName.toLowerCase().includes(body.fullName.toLowerCase())
			)
				return false;
			if (
				body.contactEmail &&
				!c.contactEmail
					.toLowerCase()
					.includes(body.contactEmail.toLowerCase())
			)
				return false;
			return true;
		});

		return HttpResponse.json({
			data: {
				results: filtered,
				total: filtered.length,
			},
		});
	},
);

const tenantBHandler = http.get(
	"/api/tenantB/customers",
	({ request }) => {
		const url = new URL(request.url);
		const name = url.searchParams.get("name") || "";
		const email = url.searchParams.get("email") || "";

		const allCustomers = [
			{
				customerId: "B001",
				customerName: "Alice TenantB",
				email: "alice@tenantB.com",
			},
			{
				customerId: "B002",
				customerName: "Bob TenantB",
				email: "bob@tenantB.com",
			},
			{
				customerId: "B003",
				customerName: "Charlie TenantB",
				email: "charlie@tenantB.com",
			},
		];

		const filtered = allCustomers.filter((c) => {
			if (
				name &&
				!c.customerName.toLowerCase().includes(name.toLowerCase())
			)
				return false;
			if (
				email &&
				!c.email.toLowerCase().includes(email.toLowerCase())
			)
				return false;
			return true;
		});

		return HttpResponse.json({
			customers: filtered,
			count: filtered.length,
		});
	},
);

export const worker = setupWorker(tenantAHandler, tenantBHandler);
