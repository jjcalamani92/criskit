// @ts-nocheck

import slugify from 'slugify';
import { ObjectId } from 'mongodb';
import clientPromise0 from '../mongodb';
import { GraphQLError } from 'graphql';



const nameCollection = 'articles';

/**
 * @param {{ name: string; parentId: string; description: string; siteId: string; uid: string; type: string; thumbnailUrl: string; paths: string[]}} body
 */
export async function addArticle(body) {
	const { name, parentId, description, siteId, uid, type, thumbnailUrl, paths } = body;
	const client = await clientPromise0;
	const db = client.db(type);
	await db.collection(nameCollection).insertOne({
		slug: slugify(name, { lower: true }),
		parentId: parentId,
		data: {
			name: name,
			description: description,
			thumbnailUrl: thumbnailUrl,
			siteId: siteId,
			params: {
				path: [
					...paths.map((data) => slugify(data, { lower: true })),
					slugify(name, { lower: true })
				],
				paths: [
					...paths.map((data) => ({ name: data, slug: slugify(data, { lower: true }) })),
					{ name: name, slug: slugify(name, { lower: true }) }
				]
			},
			updateDate: {
				createdAt: new Date(),
				lastUpdatedAt: new Date(),
				register: [
					{
						uid: uid,
						change: 'create article',
						updatedAt: new Date()
					}
				]
			}
		}
	});
	return '¡Artículo Creado!';
}
/**
 * @param {{ name: string; uid: string; id?: string; parentId?: string; description?: string; siteId?: string; type?: string; thumbnailUrl?: string; paths: string[] }} body
 */
export async function updateArticle(body) {
	const {id, name, description, uid, type, thumbnailUrl } = body;
	
  const client = await clientPromise0;
  const db = client.db(type);

  const product = await db
    .collection(nameCollection)
    .findOne({
      $expr: {
        $eq: [
          '$_id',
          {
            $toObjectId: id
          }
        ]
      }
    }, { projection: { _id: 0, parentId: 1 } });

  const slug = await db.collection(nameCollection).findOne(
    {
      _id: { $ne: new ObjectId(id) },
      slug: slugify(body.name, { lower: true }),
      parentId: product?.parentId,
    },
    { projection: { _id: 1 } }
  );
  if (slug) {
		throw new GraphQLError('¡Ya tienes un artículo con ese nombre!');
	}
  

  await db.collection(nameCollection).updateOne(
    {
      $expr: {
        $eq: [
          '$_id',
          {
            $toObjectId: id
          }
        ]
      }
    },
    {
      $set: {
        slug: slugify(name, { lower: true }),
        "data.name": name,
        "data.description": description,
        "data.thumbnailUrl": thumbnailUrl,
        'data.params.path.$[element]': slugify(name, { lower: true }),
					'data.params.paths.$[ele]': {
						name: name,
						slug: slugify(name, { lower: true })
					},
        "data.updateDate.lastUpdatedAt": new Date(),
      },
      $push: {
        "data.updateDate.register": {
          uid: uid,
          change: "updated page info",
          updatedAt: new Date(),
        },
      },
    },
		{
			arrayFilters: [
				{ element: { $eq: product?.slug } },
				{ 'ele.slug': { $eq: product?.slug } }
			]
		}
  );

  
	return '¡Artículo Actualizado!';
}

/**
 * @param {string} type
 * @param {string[]} ids
 */
export async function deleteArticlesById(type, ids) {
	let ids0;

	ids0 = ids.map((data) => ({ _id: new ObjectId(data) }));
	try {
		const client = await clientPromise0;
		const db = client.db(type);
		const result = await db.collection(nameCollection).deleteMany({
			_id: { $in: ids0.map((data) => data._id) }
		});

		

		return `${result.deletedCount} documents deleted.`;
	} catch (error) {
		console.error('Error:', error);
	}
}
/**
 * @param {string} type
 * @param {string} id
 */

export async function deleteArticleById(type, id) {
	let ids0;
	

	try {
		const client = await clientPromise0;
		const db = client.db(type);
		const result = await db.collection(nameCollection).deleteMany({
      $expr: {
        $eq: [
          '$_id',
          {
            $toObjectId: id
          }
        ]
      }
    });

		

		return `document deleted.`;
	} catch (error) {
		console.error('Error:', error);
	}
}
