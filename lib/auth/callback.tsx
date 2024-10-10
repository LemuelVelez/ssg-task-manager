import { useEffect } from "react";
import { Client, Account } from "appwrite";
import { useRouter } from "next/router";

// Initialize the Appwrite client
const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string) // Assert as string
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string); // Assert as string // Your project ID

const CallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const account = new Account(client);
      try {
        // Update the session to check the current user's authentication status
        const session = await account.getSession("current"); // Get current session
        if (session) {
          // Redirect to the dashboard or home page after successful login
          router.push("/task-management"); // Update to the desired page after successful login
        } else {
          // No session found, redirect to error page
          router.push("/auth/error");
        }
      } catch (error) {
        console.error("Error during session update:", error);
        // Handle errors (redirect to error page)
        router.push("/auth/error");
      }
    };

    handleCallback();
  }, [router]);

  return <div>Loading...</div>; // Optionally display a loading state
};

export default CallbackPage;
