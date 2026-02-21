import {
	createContext,
	type ReactNode,
	useContext,
	useMemo,
	useState,
} from "react";

export type TenantType = "tenantA" | "tenantB";

type AuthContextType = {
	tenant: TenantType | null;
	setTenant: (type: TenantType) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [tenant, setTenant] = useState<TenantType | null>(null);

	const contextValue = useMemo(() => ({ tenant, setTenant }), [tenant]);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
}

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within <AuthProvider>");
	}
	return context;
}
