import { NextApiRequest, NextApiResponse } from "next";
import { Client, Databases } from "appwrite";

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string) // Appwrite endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string); // Appwrite project ID

// Appwrite Databases Service
const databases = new Databases(client);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Fetch user data from the specific database and collection
    const user = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, // Your database ID
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID as string, // Your collection ID
      id as string // User ID
    );
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(404).json({ error: "User not found" });
  }
}
