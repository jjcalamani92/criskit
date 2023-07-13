// @ts-nocheck

// import { getProduct } from '$lib/db/products/query';

import { getArticle } from '$lib/fetch/articles';
import { schemaArticle } from '$lib/zod/articles';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';




export const config = {
	isr: {
		expiration: 60
	}
};

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	// const products = await getProductsByParentId(params)

	const article = await getArticle(params)
	let formArticle = await superValidate({
		id: article._id,
		name: article.data.name,
		description: article.data.description,
		thumbnailUrl: article.data.thumbnailUrl,
	}, schemaArticle);
	
	

	return { article, formArticle };
}

// export const actions = {
// 	default: async(event) => {
// 		const formData = Object.fromEntries(await event.request.formData())
// 		console.log('formDataa', formData)

// 	}
// }

export const actions = {
	create: async ({ request, params }) => {
		const form = await superValidate(request, schemaArticle);
		if (!form.valid) return fail(400, { form });

		const input = {
			...form.data,
			paths: form.data.paths.split('/').slice(1),
			parentId: params.uid,
			siteId: params.id,
			type: params.type,
			uid: '123456789',
			
		};
		console.log('input', input)
		// return await addProduct(input)
		
		// db.createTodo(cookies.get('userid'), data.get('description'));
	}

	// delete: async ({ cookies, request }) => {
	// 	const data = await request.formData();
	// 	// db.deleteTodo(cookies.get('userid'), data.get('id'));
	// }
};
