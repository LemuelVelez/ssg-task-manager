import {
  Client,
  Account,
  OAuthProvider as AppwriteOAuthProvider,
} from "appwrite";

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

const account = new Account(client);

export const loginWithOAuth = async (provider: AppwriteOAuthProvider) => {
  try {
    const url = await account.createOAuth2Session(
      provider,
      `${window.location.origin}/auth/callback`,
      `${window.location.origin}/auth/error`
    );

    if (typeof url === "string") {
      window.location.href = url;
    } else {
      console.error("Failed to retrieve URL for OAuth login.");
    }
  } catch (error) {
    console.error("Error during OAuth login:", error);
  }
};
