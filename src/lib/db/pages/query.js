// @ts-nocheck
import slugify from "slugify";
import clientPromise0 from "../mongodb";
import { GraphQLError } from 'graphql';

const nameCollection = "pages";



export async function getPagesByParentId(typeSite, parentId) {
	const client = await clientPromise0;
	const db = client.db(typeSite);
	const pages = await db.collection(nameCollection).find({parentId}).toArray();
	return pages;
}
export async function getPagesBySiteId(typeSite, siteId) {
	const client = await clientPromise0;
	const db = client.db(typeSite);
	const pages = await db.collection(nameCollection).find({'data.siteId': siteId}).toArray();
	return pages;
}
export async function getPages(typeSite) {
	const client = await clientPromise0;
	const db = client.db(typeSite);
	const pages = await db.collection(nameCollection).find({}).toArray();
	return pages;
}
export async function getPage(typeSite, id) {
	const client = await clientPromise0;
	const db = client.db(typeSite);
	const page = await db.collection(nameCollection).findOne({
		$expr: {
			$eq: [
				'$_id',
				{
					$toObjectId: id
				}
			]
		}
	});
	return page;
}

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
