import { z } from "zod";

export const tenantBSearchSchema = z.object({
	name: z.string().max(20, "名前は20文字以内で入力してください").optional().default(""),
	email: z.string().optional().default(""),
	status: z.string().optional().default(""),
});
