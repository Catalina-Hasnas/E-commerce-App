import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../services/database.service';

export default async function handler(
req: NextApiRequest,
res: NextApiResponse
) {
  if (req.method === 'POST') {

    const data = req.body;
      
    try {
      const { products }  = await connectToDatabase()
      await products?.insertOne(data);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Adding product failed!' });
      return;
    }    

    res
    .status(201)
    .json({ message: `Successfully added ${data.toString()}`});
  }
}  