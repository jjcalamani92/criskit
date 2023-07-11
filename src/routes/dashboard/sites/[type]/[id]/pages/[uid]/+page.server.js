// @ts-nocheck

import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

import { z } from 'zod';

const newCategory = z.object({
	name: z.string().min(1).default('Name Category'),
	description: z.string().min(1).default('Description Category'),
	thumbnailUrl: z
		.string()
		.min(1)
		.default(
			'https://res.cloudinary.com/dcpr6059h/image/upload/v1689077267/icon-image-not-found-free-vector_aro2ip.jpg'
		),
	typeCategory: z.string().default('category'),
	paths: z.string().array()
});

export const config = {
	isr: {
		expiration: 60
	}
};

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const response = await fetch(`${env.API_URL}/api/graphql`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `
      query GetCategoriesByParentId($type: String!, $parentId: String!, $i: String!) {
				getCategoriesByParentId(type: $type, parentId: $parentId, i: $i) {
					_id
					data{
						name
						description
						thumbnailUrl
						type
					}
					
				}
			}
      `,
			variables: {
				type: params.type,
				parentId: params.uid,
				i:'0'
			}
		})
	});

	const {
		data: { getCategoriesByParentId: categories }
	} = await response.json();

	const response0 = await fetch(`${env.API_URL}/api/graphql`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `
      query GetPage($type: String!, $id: String!) {
				getPage(type: $type, id: $id) {
					_id
					data{
						params{
							path
							paths{
								name
							}
						}
					}
					
				}
			}
      `,
			variables: {
				type: params.type,
				id: params.uid
			}
		})
	});

	const {
		data: { getPage: page }
	} = await response0.json();

	let form = await superValidate(newCategory);
	
	return { page, categories, form };
}

// export const actions = {
// 	default: async(event) => {
// 		const formData = Object.fromEntries(await event.request.formData())
// 		console.log('formDataa', formData)

// 	}
// }

export const actions = {
	create: async ({ request, params }) => {
		const form = await superValidate(request, newCategory);
		if (!form.valid) return fail(400, { form });

		const input = {
			...form.data,
			parentId: params.uid,
			siteId: params.id,
			type: params.type,
			uid: '123456789',
			i: '0',
		};
		
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