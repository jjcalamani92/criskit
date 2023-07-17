import { env } from "$env/dynamic/private";

/**
 
 * @param {string} type
 * @param {string} id
 */
export async function getSiteByIdComponents(type, id) {
  const response0 = await fetch(`${env.URL}/api/${env.VERSION}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `
      query GetSiteById($type: String!, $id: String!) {
				getSiteById(type: $type, id: $id) {
					_id
					url
					data{
						components{
							header
							headingArticles
							gridArticles
							cardArticles
							headingProducts
							gridProducts
							cardProducts
							headingCategories
							gridCategories
							cardCategories
							contact
							faqs
							footer
						}
					}
				}
			}
      `,
			variables: {
				type: type,
				id: id
			}
		})
	});

	const {
		data: { getSiteById }
	} = await response0.json();

  return getSiteById
}
/**
 * @param {string} type
 * @param {string} id
 */
export async function getSiteById(type, id) {
  const response0 = await fetch(`${env.URL}/api/${env.VERSION}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `
      query GetSiteById($type: String!, $id: String!) {
				getSiteById(type: $type, id: $id) {
					_id
					url
					data{
						components{
							header
							headingArticles
							gridArticles
							cardArticles
							headingProducts
							gridProducts
							cardProducts
							headingCategories
							gridCategories
							cardCategories
							contact
							faqs
							footer
						}
					}
				}
			}
      `,
			variables: {
				type: type,
				id: id
			}
		})
	});

	const {
		data: { getSiteById }
	} = await response0.json();

  return getSiteById
}
/**
 * @param {{ type: string; id: string; }} params
 */
export async function getSite(params) {
  const response0 = await fetch(`${env.API_URL}/api/graphql`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `
      query GetSite($type: String!, $id: String!) {
				getSite(type: $type, id: $id) {
					_id
					url
					data{
						theme{
							light
							lightAndDarkMode
						}
						info{
							name
						}
					}
					
				}
			}
      `,
			variables: {
				type: params.type,
				id: params.id
			}
		})
	});

	const {
		data: { getSite }
	} = await response0.json();

  return getSite
}
/**
 * @param {{ type: string; }} params
 */
export async function getSites(params) {
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
		data: { getSites }
	} = await response.json();
  return getSites
}

/**
 * @param {any} input
 */
export async function addSite(input) {
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
	return await res.json();
}