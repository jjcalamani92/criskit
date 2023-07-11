// @ts-nocheck

import { env } from '$env/dynamic/private';

export const config = {
	isr: {
			expiration: 60,
	}
};

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
	const response = await fetch(`${env.API_URL}/api/graphql`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `
      query GetPagesBySiteId($type: String!, $siteId: String!) {
				getPagesBySiteId(type: $type, siteId: $siteId) {
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
				siteId: params.id
			}
		})
	});

	const {
		data: { getPagesBySiteId: pages }
	} = await response.json();

	const response0 = await fetch(`${env.API_URL}/api/graphql`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `
      query GetSite($type: String!, $id: String!) {
				getSite(type: $type, id: $id) {
					_id
					
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
		data: { getSite: site }
	} = await response0.json();

	return { site, pages  };
}
