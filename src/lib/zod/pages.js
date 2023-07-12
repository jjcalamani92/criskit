import { z } from "zod";

export const schemaPage = z.object({
	id: z.string().optional(),
	name: z.string().min(1).default('Name'),
	description: z.string().min(1).default('Description Category'),
	thumbnailUrl: z
		.string()
		.min(1)
		.default(
			'https://res.cloudinary.com/dcpr6059h/image/upload/v1689077267/icon-image-not-found-free-vector_aro2ip.jpg'
		),
	typePage: z.string().optional().default('category')
});