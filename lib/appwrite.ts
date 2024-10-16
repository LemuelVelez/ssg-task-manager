import { Client, Account } from 'appwrite';

// Initialize Appwrite Client
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

if (!endpoint || !projectId) {
  throw new Error("Appwrite endpoint or project ID is not defined.");
}

const client = new Client();
client.setEndpoint(endpoint).setProject(projectId);

const account = new Account(client);

export { client, account };
