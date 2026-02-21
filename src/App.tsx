import {
	AuthProvider,
	type TenantType,
	useAuth,
} from "@/providers/AuthProvider";
import { CustomerSearchScreen } from "@/screens/Customers";

import "./App.css";

function TenantSwitcher() {
	const { tenant, setTenant } = useAuth();

	return (
		<div className="tenant-switcher">
			<label htmlFor="tenant-select">Tenant:</label>
			<select
				id="tenant-select"
				value={tenant ?? ""}
				onChange={(e) => setTenant(e.target.value as TenantType)}
			>
				<option value="" disabled>
					選択してください
				</option>
				<option value="tenantA">Tenant A</option>
				<option value="tenantB">Tenant B</option>
			</select>
		</div>
	);
}

function AppContent() {
	const { tenant } = useAuth();

	return (
		<div className="app">
			<header className="app-header">
				<div className="header-content">
					<h1>ストラテジーパターン</h1>
					<TenantSwitcher />
				</div>
			</header>
			<main>
				{tenant ? (
					<CustomerSearchScreen key={tenant} />
				) : (
					<p className="table-message">テナントを選択してください</p>
				)}
			</main>
		</div>
	);
}

function App() {
	return (
		<AuthProvider>
			<AppContent />
		</AuthProvider>
	);
}

export default App;
