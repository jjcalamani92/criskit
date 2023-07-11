// @ts-nocheck
import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';


const newSite = z.object({
	name: z.string().min(1).default('Name'),
	theme: z.string().min(1).default('red'),
	url: z.string().min(1).default('.vercel.app'),
	lightAndDarkMode: z.boolean().default(false),
});

/** @type {import('../$types').PageServerLoad} */
export async function load({ params }) {
	const response = await fetch(`${env.API_URL}/api/graphql`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `
      query GetSites($type: String!) {
        getSites(type: $type) {
          _id
          url
					data{
						info {
							name
							icon
						}
					}
        }
      }
      `,
			variables: {
				type: params.type
			}
		})
	});

	const {
		data: { getSites: sites }
	} = await response.json();

	let form = await superValidate(newSite);


	return { sites, form };
}

export const actions = {
	create: async ({ request, params }) => {
		const form = await superValidate(request, newSite);
		if (!form.valid) return fail(400, { form });

		const input = {
			...form.data,
			type: params.type,
			uid: '123456789'
		};
		console.log('input', input)
		const res = await fetch(`${env.API_URL}/api/graphql`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				query: `
					mutation AddSite($input:SiteInput!) {
						addSite(input:$input) 
					}
				`,
				variables: {
					input: input
				}
			})
		});
		const item = await res.json();
		console.log('item', item)
		return { item };
	}

	// delete: async ({ cookies, request }) => {
	// 	const data = await request.formData();
	// 	// db.deleteTodo(cookies.get('userid'), data.get('id'));
	// }
};
