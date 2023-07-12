import { env } from '$env/dynamic/private';

/**
 * @param {{ type: string; uid: string; }} params
 */
export async function getPage(params) {
	const response = await fetch(`${env.API_URL}/api/graphql`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `
      query GetPage($type: String!, $id: String!) {
				getPage(type: $type, id: $id) {
					_id
					data{
						name
						description
						type
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
				id: params.uid
			}
		})
	});

	const {
		data: { getPage }
	} = await response.json();
	return getPage;
}

/**
 * @param {{ type: string; id: string; }} params
 */
export async function getPagesByParentId(params) {
	const response = await fetch(`${env.API_URL}/api/graphql`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `
      query GetPagesByParentId($type: String!, $parentId: String!) {
				getPagesByParentId(type: $type, parentId: $parentId) {
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
				parentId: params.id
			}
		})
	});

	const {
		data: { getPagesByParentId }
	} = await response.json();
	return getPagesByParentId;
}


/**
 * @param {any} input
 */
export async function addPage(input) {
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
	return await res.json();
}