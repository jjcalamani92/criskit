import { env } from "$env/dynamic/private";

/**
 * @param {{ type: string; uid: string; i: string; }} params
 */
export async function getCategories(params) {
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
				i: params.i ? `${+params.i+1}` : '0'
			}
		})
	});

	const {
		data: { getCategoriesByParentId }
	} = await response.json();

  return getCategoriesByParentId
}

/**
 * @param {{ type: any; uid: any; i: any; }} params
 */
export async function getCategory(params) {
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
						description
						thumbnailUrl
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
	})
	const {
		data: { getCategory }
	} = await response0.json();

  return getCategory
}

/**
 * @param {{ type: any; uid: any; }} params
 */
export async function getCategoryInAll(params) {
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
		data: { getCategoryInAll }
	} = await response0.json();
	return getCategoryInAll
}
/**
 * @param {any} input
 */
export async function addCategory(input) {
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
	return await res.json();
}