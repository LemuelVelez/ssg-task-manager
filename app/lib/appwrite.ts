// app/lib/appwrite.ts
import { Client, Databases, Storage } from "appwrite";

const client = new Client();
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT; // Update this line
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID; // Update this line

if (!endpoint || !projectId) {
  throw new Error(
    "Appwrite endpoint and project ID must be defined in .env.local"
  );
}

client.setEndpoint(endpoint).setProject(projectId);

const databases = new Databases(client);
const storage = new Storage(client);

export { client, databases, storage };
