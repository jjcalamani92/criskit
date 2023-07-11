// @ts-nocheck

import { env } from '$env/dynamic/private';

/** @type {import('../$types').PageServerLoad} */
export async function load({ params }) {
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
		data: { getSites: sites }
	} = await response.json();
	return { sites };
}
