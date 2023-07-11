// @ts-nocheck

import clientPromise0 from '../mongodb';
import { GraphQLError } from 'graphql';

const nameCollection = 'sites';

/**
 * @param {string} typeSite
 */
export async function getSites(typeSite) {
	const client = await clientPromise0;
	const db = client.db(typeSite);
	const sites = await db.collection(nameCollection).find({}).toArray();
	return sites;
}
/**
 * @param {string} typeSite
 * @param {string} id
 */
export async function getSite(typeSite, id) {
	const client = await clientPromise0;
	const db = client.db(typeSite);
	const site = await db.collection(nameCollection).findOne({
		$expr: {
			$eq: [
				'$_id',
				{
					$toObjectId: id
				}
			]
		}
	});
	return site;
}
/**
 * @param {string} typeSite
 * @param {string} url
 */
export async function existsSite(typeSite, url) {
	const client = await clientPromise0;
	const db = client.db(typeSite);
	const site = await db.collection(nameCollection).findOne(
		{
			url: url
		},
		{ projection: { _id: 1 } }
	);
	if (site) {
		throw new GraphQLError('¡Ya tienes una sitio con ese dominio!');
	}
}
