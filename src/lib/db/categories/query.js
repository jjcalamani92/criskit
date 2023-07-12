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
 * @param {any} id
 * @param {any} i
 */
export async function getCategoryInAll(typeSite, id,) {
	const client = await clientPromise0;
	const db = client.db(typeSite);
	const collections = ['pages','categories0', 'categories1', 'categories2', 'categories3', 'categories4', 'categories5', 'categories6', 'categories7', 'categories8', 'categories9', 'categories10'];
	let category = null;
	for (const collectionName of collections) {
    category = await db.collection(collectionName).findOne(
      {
        $expr: {
          $eq: [
            "$_id",
            {
              $toObjectId: id,
            },
          ],
        },
      },
      {
        projection: {
          _id: 1,
          "data.name": 1,
          "data.description": 1,
          "data.thumbnailUrl": 1,
          "data.type": 1,
          "data.params": 1,
        },
      }
    );

    if (category) {
      break; // Si se encuentra la categoría, se interrumpe el bucle
    }
  }
	
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
