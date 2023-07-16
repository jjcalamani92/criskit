import { env } from "$env/dynamic/private";

/**
 * @param {string} type
 */
export async function getSitesByType(type) {
	const response = await fetch(`${env.URL}/api/${env.VERSION}`, {
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
				type
			}
		})
	});

	const {
		data: { getSites }
	} = await response.json();
  return getSites
}