import { z } from "zod";

export const schemaSite = z.object({
	id: z.string().optional(),
	name: z.string().min(1).default('Name'),
	theme: z.string().min(1).default('red'),
	url: z.string().min(1).default('.vercel.app'),
	lightAndDarkMode: z.boolean().default(false),
});