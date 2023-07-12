// @ts-nocheck
import { addSite, getSites } from '$lib/fetch/sites';
import { schemaSite } from '$lib/zod/sites';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';



/** @type {import('../$types').PageServerLoad} */
export async function load({ params }) {
	const sites = getSites(params)
	let formSite = await superValidate(schemaSite);
	return { sites, formSite };
}

export const actions = {
	create: async ({ request, params }) => {
		const form = await superValidate(request, schemaSite);
		if (!form.valid) return fail(400, { form });

		const input = {
			...form.data,
			type: params.type,
			uid: '123456789'
		};
		return addSite(input)
		
	}

	// delete: async ({ cookies, request }) => {
	// 	const data = await request.formData();
	// 	// db.deleteTodo(cookies.get('userid'), data.get('id'));
	// }
};
