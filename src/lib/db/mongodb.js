// @ts-ignore
import { env } from '$env/dynamic/private';

import { MongoClient } from 'mongodb'

const uri = env.MONGO_URL_0
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client
let clientPromise0

if (!env.MONGO_URL_0) {
  throw new Error('Add Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
// @ts-ignore
// Replacement).
  // @ts-ignore
  if (!global._mongoClientPromise) {
    // @ts-ignore
    client = new MongoClient(uri, options)
    // @ts-ignore
    global._mongoClientPromise = client.connect()
  }
  // @ts-ignore
  clientPromise0 = global._mongoClientPromise
} else {
  // @ts-ignore
  client = new MongoClient(uri, options)
  clientPromise0 = client.connect()
}

export default clientPromise0