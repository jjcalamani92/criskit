// @ts-nocheck

import { getCategoryInAll } from '$lib/fetch/categories';
import { addProduct, getProductsByParentId } from '$lib/fetch/products';
import { schemaCategory } from '$lib/zod/categories';
import { schemaProduct } from '$lib/zod/products';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';




export const config = {
	isr: {
		expiration: 60
	}
};

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const products = await getProductsByParentId(params)

	const category = await getCategoryInAll(params)
	let formEditCategory = await superValidate({
		id: category._id,
		name: category.data.name,
		description: category.data.description,
		thumbnailUrl: category.data.thumbnailUrl,
		typeCategory: category.data.type
	}, schemaCategory);
	let formProduct = await superValidate(schemaProduct);
	

	return { category, products, formProduct, formEditCategory };
}

// export const actions = {
// 	default: async(event) => {
// 		const formData = Object.fromEntries(await event.request.formData())
// 		console.log('formDataa', formData)

// 	}
// }

export const actions = {
	create: async ({ request, params }) => {
		const form = await superValidate(request, schemaProduct);
		if (!form.valid) return fail(400, { form });

		const input = {
			...form.data,
			paths: form.data.paths.split('/').slice(1),
			parentId: params.uid,
			siteId: params.id,
			type: params.type,
			uid: '123456789',
			
		};
		
		return await addProduct(input)
		
		// db.createTodo(cookies.get('userid'), data.get('description'));
	}

	// delete: async ({ cookies, request }) => {
	// 	const data = await request.formData();
	// 	// db.deleteTodo(cookies.get('userid'), data.get('id'));
	// }
};
