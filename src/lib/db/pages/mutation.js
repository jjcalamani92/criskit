// @ts-nocheck

import slugify from 'slugify';
import { ObjectId } from 'mongodb';
import clientPromise0 from '../mongodb';
import { GraphQLError } from 'graphql';



const nameCollection = 'pages';


/**
 * @param {{ name: string; parentId: string; description: string; siteId: string; uid: string; typePage: string; type: string; thumbnailUrl: string; }} body
 */
export async function addPage(body) {
	const { name, parentId, description, siteId, uid, typePage, type, thumbnailUrl } = body;
	const client = await clientPromise0;
	const db = client.db(type);
	await db.collection(nameCollection).insertOne({
		slug: slugify(name, { lower: true }),
		parentId: parentId,
		data: {
			name: name,
			description: description,
			thumbnailUrl: thumbnailUrl,
			type: slugify(typePage, { lower: true }),
			siteId: siteId,
			params: {
				path: [slugify(name, { lower: true })],
				paths: [{ name: name, slug: slugify(name, { lower: true }) }]
			},
			updateDate: {
				createdAt: new Date(),
				lastUpdatedAt: new Date(),
				register: [
					{
						uid: uid,
						change: 'create page',
						updatedAt: new Date()
					}
				]
			}
		}
	});
	return '¡Página Creada!';
}
/**
 * @param {{ name: string; uid: string; id?: string; parentId?: string; description?: string; siteId?: string; typePage: string; type?: string; thumbnailUrl?: string; }} body
 */
export async function updatePage(body) {
	const {id, name, parentId, description, siteId, uid, typePage, type, thumbnailUrl } = body;
	
  let ids0;
  let ids1;
  const client = await clientPromise0;
  const db = client.db(type);

  const page = await db
    .collection("pages")
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
      parentId: page?.parentId,
    },
    { projection: { _id: 1 } }
  );
  if (slug) {
		throw new GraphQLError('¡Ya tienes una página con ese nombre!');
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
        "data.type": slugify(typePage , { lower: true }),
        "data.params.path.0": slugify(name, { lower: true }),
        "data.params.paths.0": {
          name: name,
          slug: slugify(name, { lower: true }),
        },
        "data.updateDate.lastUpdatedAt": new Date(),
      },
      $push: {
        "data.updateDate.register": {
          uid: body.uid,
          change: "updated page info",
          updatedAt: new Date(),
        },
      },
    }
  );

  ids0 = [{ _id: id }];
  let i = 0;
  while (ids0.length !== 0) {
    ids1 = await db
      .collection(`categories${i}`)
      .find({
        parentId: { $in: ids0.map((data) => data._id?.toString()) },
      })
      .project({
        _id: 1,
      })
      .toArray();

    if (ids1.length !== 0) {
      await db.collection(`categories${i}`).updateMany(
        { _id: { $in: ids1.map((data) => data._id) } },
        {
          $set: {
            "data.params.path.0": slugify(name, { lower: true }),
            "data.params.paths.0": {
              name: name,
              slug: slugify(name, { lower: true }),
            },
          },
        }
      );
    }
    ids0 = ids1;
    i++;
  }
	return '¡Página Actualizada!';
}

/**
 * @param {string} type
 * @param {string[]} ids
 */
export async function deletePagesById(type, ids) {
	let ids0;
	let ids1;

	ids0 = ids.map((data) => ({ _id: new ObjectId(data) }));
	try {
		const client = await clientPromise0;
		const db = client.db(type);
		const result = await db.collection(nameCollection).deleteMany({
			_id: { $in: ids0.map((data) => data._id) }
		});

		let i = 0;
		while (ids0.length !== 0) {
			ids1 = await db
				.collection(`categories${i}`)
				.find({
					parentId: {
						$in: ids0.map((data) => data._id.toString())
					}
				})
				.project({
					_id: 1
				})
				.toArray();
			if (ids1.length !== 0) {
				await db.collection(`categories${i}`).deleteMany({
					parentId: {
						$in: ids0.map((data) => data._id.toString())
					}
				});
			}
			ids0 = ids1;
			i++;
		}

		return `${result.deletedCount} documents deleted.`;
	} catch (error) {
		console.error('Error:', error);
	}
}
/**
 * @param {string} type
 * @param {string} id
 */
export async function deletePageById(type, id) {
	let ids0;
	let ids1;

	ids0 = [id].map((data) => ({ _id: new ObjectId(data) }));
  
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

		let i = 0;
		while (ids0.length !== 0) {
			ids1 = await db
				.collection(`categories${i}`)
				.find({
					parentId: {
						$in: ids0.map((data) => data._id.toString())
					}
				})
				.project({
					_id: 1
				})
				.toArray();
			if (ids1.length !== 0) {
				await db.collection(`categories${i}`).deleteMany({
					parentId: {
						$in: ids0.map((data) => data._id.toString())
					}
				});
			}
			ids0 = ids1;
			i++;
		}

		return `document deleted.`;
	} catch (error) {
		console.error('Error:', error);
	}
}
