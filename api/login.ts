import type { NextApiRequest, NextApiResponse } from 'next';
import { account } from 'lib/appwrite';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const session = await account.createSession(email, password);
      // Send back session data or token as needed
      return res.status(200).json({ session });
    } catch (error) {
      console.error('Login Error:', error);
      return res.status(401).json({ message: 'Login failed. Please check your credentials and try again.' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
