// @ts-nocheck

import { env } from '$env/dynamic/private';
import { getCategories, getCategory } from '$lib/fetch/categories';
import { schemaCategory } from '$lib/zod/categories';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

import { z } from 'zod';

const newCategory = z.object({
	name: z.string().min(1).default('Name'),
	description: z.string().min(1).default('Description Category'),
	thumbnailUrl: z
		.string()
		.min(1)
		.default(
			'https://res.cloudinary.com/dcpr6059h/image/upload/v1689077267/icon-image-not-found-free-vector_aro2ip.jpg'
		),
	typeCategory: z.string().default('category'),
	paths: z.string()
});

export const config = {
	isr: {
		expiration: 60
	}
};

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

	






	const categories = await getCategories(params)
	const category = await getCategory(params)
	

	let formEditCategory = await superValidate({
		id: category._id,
		name: category.data.name,
		description: category.data.description,
		thumbnailUrl: category.data.thumbnailUrl,
		typeCategory: category.data.type
	}, schemaCategory);
	let formAddCategory = await superValidate(schemaCategory);
	
	return { category, categories, formAddCategory, formEditCategory };
}


export const actions = {
	create: async ({ request, params }) => {
		const form = await superValidate(request, newCategory);
		if (!form.valid) return fail(400, { form });

		const input = {
			...form.data,
			paths: form.data.paths.split('/').slice(1),
			parentId: params.uid,
			siteId: params.id,
			type: params.type,
			uid: '123456789',
			i: `${+params.i+1}`,
		};
		// console.log('input', input)
		const res = await fetch(`${env.API_URL}/api/graphql`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				query: `
					mutation AddCategory($input:CategoryInput!) {
						addCategory(input:$input) 
					}
				`,
				variables: {
					input: input
				}
			})
		});
		const item = await res.json();
		return { item };
		// db.createTodo(cookies.get('userid'), data.get('description'));
	}

	// delete: async ({ cookies, request }) => {
	// 	const data = await request.formData();
	// 	// db.deleteTodo(cookies.get('userid'), data.get('id'));
	// }
};
