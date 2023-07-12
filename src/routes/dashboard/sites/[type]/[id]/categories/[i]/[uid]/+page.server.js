// @ts-nocheck

import { env } from '$env/dynamic/private';
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
				i: `${+params.i+1}`
			}
		})
	});

	const {
		data: { getCategoriesByParentId: categories }
	} = await response.json();

	
	let response0 = await fetch(`${env.API_URL}/api/graphql`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `
			query GetCategory($type: String!, $id: String!, $i: String!) {
				getCategory(type: $type, id: $id, i: $i) {
					_id
					data{
						name
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
				id: params.uid,
				i: params.i
			}
		})
	}).then((data) => data.json());
	const category = response0.data.getCategory

	let form = await superValidate(newCategory);
	
	return { category, categories, form };
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
