// @ts-nocheck

import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

import { z } from 'zod';

const newPage = z.object({
	name: z.string().min(1).default('Name'),
	description: z.string().min(1).default('Description Page'),
	thumbnailUrl: z
		.string()
		.min(1)
		.default(
			'https://res.cloudinary.com/dcpr6059h/image/upload/v1689077267/icon-image-not-found-free-vector_aro2ip.jpg'
		),
	typePage: z.string().default('category')
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
      query GetPagesBySiteId($type: String!, $siteId: String!) {
				getPagesBySiteId(type: $type, siteId: $siteId) {
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
				siteId: params.id
			}
		})
	});

	const {
		data: { getPagesBySiteId: pages }
	} = await response.json();

	const response0 = await fetch(`${env.API_URL}/api/graphql`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `
      query GetSite($type: String!, $id: String!) {
				getSite(type: $type, id: $id) {
					_id
					data{
						info{
							name
						}
					}
					
				}
			}
      `,
			variables: {
				type: params.type,
				id: params.id
			}
		})
	});

	const {
		data: { getSite: site }
	} = await response0.json();

	let form = await superValidate(newPage);
	
	return { site, pages, form };
}

// export const actions = {
// 	default: async(event) => {
// 		const formData = Object.fromEntries(await event.request.formData())
// 		console.log('formDataa', formData)

// 	}
// }

export const actions = {
	create: async ({ request, params }) => {
		const form = await superValidate(request, newPage);
		if (!form.valid) return fail(400, { form });

		const input = {
			...form.data,
			parentId: params.id,
			siteId: params.id,
			type: params.type,
			uid: '123456789'
		};

		const res = await fetch(`${env.API_URL}/api/graphql`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				query: `
					mutation AddPage($input:PageInput!) {
						addPage(input:$input) 
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
