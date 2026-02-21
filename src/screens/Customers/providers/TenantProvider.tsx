import { createTenantProvider } from "@/providers/createTenantProvider";
import { tenantAConfig } from "@/screens/Customers/tenants/tenantA/config";
import { tenantBConfig } from "@/screens/Customers/tenants/tenantB/config";
import type { TenantConfig } from "@/screens/Customers/tenants/types";

export const { TenantProvider, useTenantConfig } =
	createTenantProvider<TenantConfig>({
		configMap: {
			tenantA: tenantAConfig,
			tenantB: tenantBConfig,
		},
	});
