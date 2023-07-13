import { env } from "$env/dynamic/private";


/**
 * @param {{ type: any; uid: any; }} params
 */
export async function getProductsByParentId (params) {
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
		data: { getProductsByParentId }
	} = await response.json();
  return getProductsByParentId
}

/**
 * @param {any} input
 */
export async function addProduct(input) {
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
  return await res.json();
  
}