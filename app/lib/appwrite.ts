// lib/appwrite.ts
import { Client, Account, Databases } from "appwrite";

// Initialize Appwrite client
const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string) // Use environment variable for endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string); // Use environment variable for project ID

// Initialize services
const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
