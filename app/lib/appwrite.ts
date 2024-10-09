// app/lib/appwrite.ts
import { Client, Databases } from "appwrite";

const client = new Client();
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

console.log("Appwrite Endpoint:", endpoint); // Log to check the endpoint
console.log("Appwrite Project ID:", projectId); // Log to check the project ID

if (!endpoint || !projectId) {
  throw new Error(
    "Appwrite endpoint and project ID must be defined in .env.local"
  );
}

client.setEndpoint(endpoint).setProject(projectId);

const databases = new Databases(client);

export { client, databases };
