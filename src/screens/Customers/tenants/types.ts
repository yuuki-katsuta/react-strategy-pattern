import type { z } from "zod";
import type { CustomerRepository } from "@/screens/Customers/domain/customer";
import type { SearchFormValues } from "@/screens/Customers/schema";

type BaseTenantConfig = CustomerRepository & {
	searchSchema: z.ZodType<SearchFormValues>;
};

export type TenantAConfig = BaseTenantConfig & {
	tenantLabel: "tenantA";
};

export type TenantBConfig = BaseTenantConfig & {
	tenantLabel: "tenantB";
};

export type TenantConfig = TenantAConfig | TenantBConfig;
