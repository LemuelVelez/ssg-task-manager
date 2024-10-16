// appwriteClient.js
import { Client } from 'appwrite';

const client = new Client();

client
    .setEndpoint('NEXT_PUBLIC_APPWRITE_ENDPOINT') // Your Appwrite endpoint
    .setProject('NEXT_PUBLIC_APPWRITE_PROJECT_ID'); // Your project ID

export default client;
