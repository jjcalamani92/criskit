// @ts-nocheck
import slugify from "slugify";
import clientPromise0 from "../mongodb";
import { GraphQLError } from 'graphql';

const nameCollection = "articles";



export async function getArticlesByParentId(typeSite, parentId) {
	const client = await clientPromise0;
	const db = client.db(typeSite);
	const articles = await db.collection(nameCollection).find({parentId}).toArray();
	return articles;
}
export async function getArticlesBySiteId(typeSite, siteId) {
	const client = await clientPromise0;
	const db = client.db(typeSite);
	const articles = await db.collection(nameCollection).find({'data.siteId': siteId}).toArray();
	return articles;
}
export async function getArticles(typeSite) {
	const client = await clientPromise0;
	const db = client.db(typeSite);
	const articles = await db.collection(nameCollection).find({}).toArray();
	return articles;
}
export async function getArticle(typeSite, id) {
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

export async function existsArticle(
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
    throw new GraphQLError('¡Ya tienes un articulo con ese nombre!');
    
  }
  
}
