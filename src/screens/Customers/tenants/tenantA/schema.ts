import { z } from "zod";

export const tenantASearchSchema = z.object({
	name: z.string().min(1, "名前は必須です").max(10, "名前は10文字以内で入力してください"),
	email: z.string().optional().default(""),
	status: z.string().optional().default(""),
});
