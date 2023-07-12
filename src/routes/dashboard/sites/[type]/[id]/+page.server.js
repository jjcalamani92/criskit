// @ts-nocheck
import { addPage, getPagesByParentId } from '$lib/fetch/pages';
import { getSite } from '$lib/fetch/sites';
import { schemaPage } from '$lib/zod/pages';
import { schemaSite } from '$lib/zod/sites';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

export const config = {
	isr: {
		expiration: 60
	}
};

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const pages = await getPagesByParentId(params);
	const site = await getSite(params);
	// let form = await superValidate(schemaPage);
	let formPage = await superValidate(schemaPage);
	let formSite = await superValidate({id: site.id, name: site.data.info.name, theme: site.data.theme.light}, schemaSite);
	return { site, pages, formSite, formPage };
}

export const actions = {
	create: async ({ request, params }) => {
		const form = await superValidate(request, schemaPage);
		if (!form.valid) return fail(400, { form });

		const input = {
			...form.data,
			parentId: params.id,
			siteId: params.id,
			type: params.type,
			uid: '123456789'
		};
		return await addPage(input);
		// db.createTodo(cookies.get('userid'), data.get('description'));
	}

	// delete: async ({ cookies, request }) => {
	// 	const data = await request.formData();
	// 	// db.deleteTodo(cookies.get('userid'), data.get('id'));
	// }
};
