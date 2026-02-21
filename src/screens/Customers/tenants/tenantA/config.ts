import { toAppError } from "@/lib/error";
import { Err, Ok } from "@/lib/result";
import type { TenantAConfig } from "@/screens/Customers/tenants/types";
import { searchCustomers } from "./api";
import { toCustomers, toRequestParams } from "./presenter";
import { tenantASearchSchema } from "./schema";

export const tenantAConfig: TenantAConfig = {
	tenantLabel: "tenantA",
	searchSchema: tenantASearchSchema,
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
