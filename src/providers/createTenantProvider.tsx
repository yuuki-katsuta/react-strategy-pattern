import { createContext, type JSX, useContext, useMemo } from "react";
import { NotFound } from "@/components/NotFound";
import { type TenantType, useAuth } from "./AuthProvider";

interface TenantContextValue<TConfig> {
	config: TConfig;
}

interface CreateTenantProviderOptions<TConfig> {
	configMap: Record<TenantType, TConfig>;
}

interface TenantProviderResult<TConfig> {
	TenantProvider: ({ children }: { children: React.ReactNode }) => JSX.Element;
	useTenantConfig: () => TConfig;
}

export function createTenantProvider<TConfig>({
	configMap,
}: CreateTenantProviderOptions<TConfig>): TenantProviderResult<TConfig> {
	const TenantConfigContext = createContext<TenantContextValue<TConfig> | null>(
		null,
	);

	function useTenantConfig() {
		const context = useContext(TenantConfigContext);
		if (!context) {
			throw new Error("useTenantConfig must be used within TenantProvider");
		}
		return context.config;
	}

	function TenantProvider({ children }: { children: React.ReactNode }) {
		const { tenant } = useAuth();

		const config = useMemo(() => {
			return tenant ? { config: configMap[tenant] } : null;
		}, [tenant]);

		if (!config) {
			return <NotFound />;
		}

		return (
			<TenantConfigContext.Provider value={config}>
				{children}
			</TenantConfigContext.Provider>
		);
	}

	return {
		TenantProvider,
		useTenantConfig,
	};
}
