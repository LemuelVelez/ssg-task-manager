import { Client, Account } from 'appwrite';

// Using environment variables for API endpoint and project ID
const API_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string;

if (!API_ENDPOINT || !PROJECT_ID) {
    throw new Error("Environment variables for Appwrite are not set.");
}

// Initialize Appwrite client
const client = new Client()
    .setEndpoint(API_ENDPOINT)
    .setProject(PROJECT_ID);

export const account = new Account(client);

export default client;
