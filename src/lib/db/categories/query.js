// @ts-nocheck
import slugify from "slugify";
import clientPromise0 from "../mongodb";
import { GraphQLError } from 'graphql';

const nameCollection = "categories";



/**
 * @param {any} typeSite
 * @param {any} parentId
 * @param {any} i
 */
export async function getCategoriesByParentId(typeSite, parentId,i) {
	const client = await clientPromise0;
	const db = client.db(typeSite);
	const categories = await db.collection(`${nameCollection}${i}`).find({parentId}).toArray();
	return categories;
}
/**
 * @param {any} typeSite
 * @param {any} siteId
 * @param {any} i
 */
export async function getCategoriesBySiteId(typeSite, siteId, i) {
	const client = await clientPromise0;
	const db = client.db(typeSite);
	const categories = await db.collection(`${nameCollection}${i}`).find({'data.siteId': siteId}).toArray();
	return categories;
}
/**
 * @param {any} typeSite
 * @param {any} i
 */
export async function getCategories(typeSite, i) {
	const client = await clientPromise0;
	const db = client.db(typeSite);
	const categories = await db.collection(`${nameCollection}${i}`).find({}).toArray();
	return categories;
}
/**
 * @param {any} typeSite
 * @param {any} id
 * @param {any} i
 */
export async function getCategory(typeSite, id, i) {
	const client = await clientPromise0;
	const db = client.db(typeSite);
	const category = await db.collection(`${nameCollection}${i}`).findOne({
		$expr: {
			$eq: [
				'$_id',
				{
					$toObjectId: id
				}
			]
		}
	});
	return category;
}

/**
 * @param {any} typeSite
 * @param {string} name
 * @param {any} parentId
 */
export async function existsPage(
  typeSite,
  name,
  parentId
) {
  const client = await clientPromise0;
  const db = client.db(typeSite);
  const page = await db.collection(nameCollection).findOne(
    {
      slug: slugify(name, { lower: true }),
      parentId: parentId,
    },
    { projection: { _id: 1 } }
  );
  if (page) {
    throw new GraphQLError('¡Ya tienes una página con ese nombre!');
    
  }
  
}
