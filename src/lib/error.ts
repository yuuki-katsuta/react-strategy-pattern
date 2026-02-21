export type AppError = {
	type: "network" | "http" | "unknown";
	status?: number;
	message: string;
};

/**
 *インフラ固有のエラーをアプリケーション共通の AppError に正規化
 */
export const toAppError = (error: unknown): AppError => {
	if (error instanceof TypeError && error.message === "Failed to fetch") {
		return {
			type: "network",
			message: "Network error",
		};
	}

	if (error instanceof Error && error.message.startsWith("Request failed:")) {
		const statusMatch = error.message.match(/(\d{3})/);
		return {
			type: "http",
			status: statusMatch ? Number(statusMatch[1]) : undefined,
			message: error.message,
		};
	}

	return {
		type: "unknown",
		message: error instanceof Error ? error.message : String(error),
	};
};
