// @ts-nocheck
import { addCategory, getCategories } from '$lib/fetch/categories';
import { getPage } from '$lib/fetch/pages';
import { schemaCategory } from '$lib/zod/categories';
import { schemaPage } from '$lib/zod/pages';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

export const config = {
	isr: {
		expiration: 60
	}
};

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const page = await getPage(params);
	const categories = await getCategories(params);

	// let form = await superValidate(newCategory);
	let formPage = await superValidate({
		id: page._id,
		name: page.data.name,
		description: page.data.description,
		thumbnailUrl: page.data.thumbnailUrl,
		typePage: page.data.type
	}, schemaPage);
	let formAddCategory = await superValidate(schemaCategory);
	

	return { page, categories, formPage, formAddCategory };
}

export const actions = {
	create: async ({ request, params }) => {
		const form = await superValidate(request, schemaCategory);
		if (!form.valid) return fail(400, { form });

		const input = {
			...form.data,
			paths: form.data.paths.split('/').slice(1),
			parentId: params.uid,
			siteId: params.id,
			type: params.type,
			uid: '123456789',
			i: '0'
		};

		return await addCategory(input);
	}
};
