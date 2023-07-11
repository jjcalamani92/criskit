// @ts-nocheck
import slugify from 'slugify';
import { ObjectId } from 'mongodb';
import clientPromise0 from '../mongodb';
import { json } from '@sveltejs/kit';
import { GraphQLError } from 'graphql';



const nameCollection = 'pages';

/**
 * @param {{ i: any; name: any; parentId: any; description: any; siteId: any; uid: any; typeCategory: any; type: any; thumbnailUrl: any; paths: any; }} body
 */
export async function addCategory(body) {
	const {i, name, parentId, description, siteId, uid, typeCategory, type, thumbnailUrl, paths } = body;
	const client = await clientPromise0;

	const db = client.db(type);

	const category = await db.collection(`categories${i}`).findOne({
		"slug": slugify(name, { lower: true }),
		"parentId": parentId
	}, {projection: {"_id": 1}})

	if (category) {
		throw new GraphQLError('¡Ya tienes una categoría con ese nombre!');
		
	}
  try {
    
    // fetch
    await db.collection(`categories${i}`).insertOne({
      slug: slugify(name, { lower: true }),
      parentId: parentId,
      data: {
        name: name,
        description: description,
        thumbnailUrl: thumbnailUrl,
        type: slugify(typeCategory, { lower: true }),
        siteId: siteId,
        params: {
          path: [...paths.map((data) => slugify(data, { lower: true })), slugify(name, { lower: true })],
          paths: [...paths.map(data => ({name: data, slug: slugify(data, { lower: true })})), {name: name, slug: slugify(name, { lower: true })}],
        },
        updateDate: {
          createdAt: new Date(),
          lastUpdatedAt: new Date(),
          register: [
            {
              uid: uid,
              change: "create category",
              updatedAt: new Date(),
            },
          ],
        },
      },
    });
    // .then((data) => db.collection("sites").findOne({ _id: data.insertedId }));
    // return the posts
    return "¡Categoría Creada!"
  } catch (error) {
    console.log('error', error)
    
  }
}
/**
 * @param {{ id: any; name: any; parentId: any; description: any; siteId: any; uid: any; typeCategory: any; type: any; thumbnailUrl: any; i: any; }} body
 */
export async function updateCategory(body) {
	const {id, name, parentId, description, siteId, uid, typeCategory, type, thumbnailUrl, i } = body;
	let ids0;
  let ids1;
  const client = await clientPromise0;
  const db = client.db(type);

  const category = await db
    .collection(`categories${i}`)
    .findOne(
      { _id: new ObjectId(id) },
      { projection: { _id: 0, parentId: 1, slug: 1 } }
    );

  const slug = await db.collection(`categories${i}`).findOne(
    {
      _id: { $ne: new ObjectId(id) },
      slug: slugify(name, { lower: true }),
      parentId: category?.parentId,
    },
    { projection: { _id: 1 } }
  );

  if (slug) {
		throw new GraphQLError('¡Ya tienes una categoría con ese nombre!');
	}
  try {
    // connect to the database

    await db.collection(`categories${i}`).updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          slug: slugify(name, { lower: true }),
          "data.name": name,
          "data.description": description,
          "data.thumbnailUrl": thumbnailUrl,
          "data.type": slugify(typeCategory, { lower: true }),
          "data.params.path.$[element]": slugify(name, { lower: true }),
          "data.params.paths.$[ele]": {
            name: name,
            slug: slugify(name, { lower: true }),
          },
          "data.updateDate.lastUpdatedAt": new Date(),
        },

        $push: {
          "data.updateDate.register": {
            uid: uid,
            change: "updated slug",
            updatedAt: new Date(),
          },
        },
      },
      { arrayFilters: [{ element: { $eq: category?.slug } }, { "ele.slug": { $eq: category?.slug } }] }
    );

    ids0 = [{ _id: new ObjectId(id) }];

    let j = parseInt(i);
    while (ids0.length !== 0) {
      ids1 = await db
        .collection(`categories${+j + 1}`)
        .find({
          parentId: {
            $in: ids0.map((data) => data._id.toString()),
          },
        })
        .project({
          _id: 1,
        })
        .toArray();
      // console.log(`ids${j}`, ids1)
      if (ids1.length !== 0) {
        await db.collection(`categories${+j + 1}`).updateMany(
          { _id: { $in: ids1.map((data) => data._id) } },
          {
            $set: {
              "data.params.path.$[element]": slugify(name, { lower: true }),
              "data.params.paths.$[ele]": {
                name: name,
                slug: slugify(name, { lower: true }),
              },
            },
          },
          { arrayFilters: [{ element: { $eq: category?.slug } }, { "ele.slug": { $eq: category?.slug } }] }
        );
      }
      ids0 = ids1;
      j++;
    }
    return "¡Categoría Actualizada!"
  } catch (error) {
    // return the error
    console.log("error", error);
  }
}

/**
 * @param {string} type
 * @param {string[]} ids
 * @param {string} i
 */
export async function deleteCategoriesById(type, ids, i) {
	let ids0;
	let ids1;

	ids0 = ids.map((data) => ({ _id: new ObjectId(data) }));
	try {
    const client = await clientPromise0;
    const db = client.db(type);

      let j = parseInt(i);
    while (ids0.length !== 0) {
      
      await db
      .collection(`categories${j}`)
      .deleteMany({ _id: { $in: ids0.map((data) => data._id) } });

      ids1 = await db
        .collection(`categories${j+1}`)
        .find({
          parentId: { $in: ids0.map((data) => data._id.toString()) },
        })
        .project({
          _id: 1,
        })
        .toArray();
        
      ids0 = ids1;
      j++;
    }

    return '¡Categorías Eliminadas!'
  } catch (error) {
    console.log('error', error)

  }
}


// export async function deleteCategoryById(type, id: string, i: string) {
// 	let ids0;
// 	let ids1;

// 	ids0 = [id].map((data: string) => ({ _id: new ObjectId(data) }));
  
// 	try {
// 		const client = await clientPromise0;
// 		const db = client.db(type);
// 		const result = await db.collection(`categories${i}`).deleteMany({
//       $expr: {
//         $eq: [
//           '$_id',
//           {
//             $toObjectId: id
//           }
//         ]
//       }
//     });

// 		let i = 0;
// 		while (ids0.length !== 0) {
// 			ids1 = await db
// 				.collection(`categories${i}`)
// 				.find({
// 					parentId: {
// 						$in: ids0.map((data: any) => data._id.toString())
// 					}
// 				})
// 				.project({
// 					_id: 1
// 				})
// 				.toArray();
// 			if (ids1.length !== 0) {
// 				await db.collection(`categories${i}`).deleteMany({
// 					parentId: {
// 						$in: ids0.map((data: any) => data._id.toString())
// 					}
// 				});
// 			}
// 			ids0 = ids1;
// 			i++;
// 		}

// 		return `document deleted.`;
// 	} catch (error) {
// 		console.error('Error:', error);
// 	}
// }
