
import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import { username, pass } from '../../mongodbconfig';

// type Data = {
//     name: string
// }

const url = `mongodb+srv://${username}:${pass}@cluster0.pvgfd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(url);

export default async function handler(
req: NextApiRequest,
res: NextApiResponse
) {
    if (req.method === 'POST') {

        const data = req.body;
    
        try {
          await client.connect();
        } catch (err) {
          res.status(500).json({ message: 'Could not connect to database.' });
          return;
        }
    
        const db = client.db();
    
        try {
          await db.collection('products').insertOne(data);
        } catch (error) {
          client.close();
          res.status(500).json({ message: 'Adding product failed!' });
          return;
        }
      
        client.close();
    
        res
        .status(201)
        .json({ message: `Successfully added ${data.toString()}`});
      }
}  