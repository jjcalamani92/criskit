// @ts-nocheck

import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

import { z } from 'zod';

const newProduct = z.object({
	name: z.string().min(1).default('Name'),
	description: z.string().min(1).default('Description Product'),
	thumbnailUrl: z
		.string()
		.min(1)
		.default(
			'https://res.cloudinary.com/dcpr6059h/image/upload/v1689077267/icon-image-not-found-free-vector_aro2ip.jpg'
		),
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
      query GetProductsByParentId($type: String!, $parentId: String!) {
				getProductsByParentId(type: $type, parentId: $parentId ) {
					_id
					parentId
					slug
					data{
						name
						description
						thumbnailUrl
					}
					
				}
			}
      `,
			variables: {
				type: params.type,
				parentId: params.uid,
			}
		})
	});

	const {
		data: { getProductsByParentId: products }
	} = await response.json();

	const response0 = await fetch(`${env.API_URL}/api/graphql`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `
      query GetCategoryInAll($type: String!, $id: String!) {
				getCategoryInAll(type: $type, id: $id) {
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
				id: params.uid
			}
		})
	});

	const {
		data: { getCategoryInAll: category }
	} = await response0.json();

	let form = await superValidate(newProduct);
	
	return { category, products, form };
}

// export const actions = {
// 	default: async(event) => {
// 		const formData = Object.fromEntries(await event.request.formData())
// 		console.log('formDataa', formData)

// 	}
// }

export const actions = {
	create: async ({ request, params }) => {
		const form = await superValidate(request, newProduct);
		if (!form.valid) return fail(400, { form });

		const input = {
			...form.data,
			paths: form.data.paths.split('/').slice(1),
			parentId: params.uid,
			siteId: params.id,
			type: params.type,
			uid: '123456789',
			
		};
		
		const res = await fetch(`${env.API_URL}/api/graphql`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				query: `
					mutation AddProduct($input:ProductInput!) {
						addProduct(input:$input) 
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
