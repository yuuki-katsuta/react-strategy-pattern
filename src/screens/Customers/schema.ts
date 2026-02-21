import { z } from "zod";

export const baseSchema = z.object({
	name: z.string().optional().default(""),
	email: z.string().optional().default(""),
	status: z.string().optional().default(""),
});

export type SearchFormValues = z.infer<typeof baseSchema>;
