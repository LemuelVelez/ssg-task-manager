import { Client, Databases } from "appwrite";

const client = new Client();
const endpoint = process.env.APPWRITE_ENDPOINT;
const projectId = process.env.APPWRITE_PROJECT_ID;

if (!endpoint || !projectId) {
  throw new Error(
    "Appwrite endpoint and project ID must be defined in .env.local"
  );
}

client.setEndpoint(endpoint).setProject(projectId);

const databases = new Databases(client);

export { client, databases };
