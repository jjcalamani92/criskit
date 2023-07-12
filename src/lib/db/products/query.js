// @ts-nocheck
import slugify from "slugify";
import clientPromise0 from "../mongodb";
import { GraphQLError } from 'graphql';

const nameCollection = "products";



export async function getProductsByParentId(typeSite, parentId) {
	const client = await clientPromise0;
	const db = client.db(typeSite);
	const products = await db.collection(nameCollection).find({parentId}).toArray();
	return products;
}
export async function getProductsBySiteId(typeSite, siteId) {
	const client = await clientPromise0;
	const db = client.db(typeSite);
	const products = await db.collection(nameCollection).find({'data.siteId': siteId}).toArray();
	return products;
}
export async function getProducts(typeSite) {
	const client = await clientPromise0;
	const db = client.db(typeSite);
	const products = await db.collection(nameCollection).find({}).toArray();
	return products;
}
export async function getProduct(typeSite, id) {
	const client = await clientPromise0;
	const db = client.db(typeSite);
	const product = await db.collection(nameCollection).findOne({
		$expr: {
			$eq: [
				'$_id',
				{
					$toObjectId: id
				}
			]
		}
	});
	return product;
}

export async function existsProduct(
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
    throw new GraphQLError('¡Ya tienes un producto con ese nombre!');
    
  }
  
}
