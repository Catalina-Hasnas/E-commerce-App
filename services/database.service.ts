import * as mongoDB from "mongodb";
import { username, pass } from './mongodbConfig';

export async function connectToDatabase() {

    const url = `mongodb+srv://${username}:${pass}@cluster0.np3cz.mongodb.net/products?retryWrites=true&w=majority`;

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(url);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db();
   
    const productsCollection: mongoDB.Collection = db.collection('products');

    const collections: { products?: mongoDB.Collection } = {}

    collections.products = productsCollection;
       
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${productsCollection.collectionName}`);

    return collections
 }
