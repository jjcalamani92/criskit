import { env } from "$env/dynamic/private";

/**
 * @param {{ type: string; uuid: string; }} params
 */
export async function getArticle(params) {
	const response = await fetch(`${env.API_URL}/api/graphql`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `
      query GetArticle($type: String!, $id: String!) {
				getArticle(type: $type, id: $id) {
					_id
					data{
						name
						description
						thumbnailUrl
						content
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
				id: params.uuid
			}
		})
	});

	const {
		data: { getArticle }
	} = await response.json();
	return getArticle;
}

/**
 * @param {{ type: any; uid: any; }} params
 */
export async function getArticlesByParentId (params) {
  const response = await fetch(`${env.API_URL}/api/graphql`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `
      query GetArticlesByParentId($type: String!, $parentId: String!) {
				getArticlesByParentId(type: $type, parentId: $parentId ) {
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
		data: { getArticlesByParentId }
	} = await response.json();
  return getArticlesByParentId
}

/**
 * @param {any} input
 */
export async function addArticle(input) {
  const res = await fetch(`${env.API_URL}/api/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation AddArticle($input:ArticleInput!) {
          addArticle(input:$input) 
        }
      `,
      variables: {
        input: input
      }
    })
  });
  return await res.json();
  
}