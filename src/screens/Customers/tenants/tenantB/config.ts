import { toAppError } from "@/lib/error";
import { Err, Ok } from "@/lib/result";
import type { TenantBConfig } from "@/screens/Customers/tenants/types";
import { searchCustomers } from "./api";
import { toCustomers, toRequestParams } from "./presenter";
import { tenantBSearchSchema } from "./schema";

export const tenantBConfig: TenantBConfig = {
	tenantLabel: "tenantB",
	searchSchema: tenantBSearchSchema,
	searchCustomers: async (values) => {
		try {
			const params = toRequestParams(values);
			const response = await searchCustomers(params);
			return Ok(toCustomers(response));
		} catch (error) {
			return Err(toAppError(error));
		}
	},
};
