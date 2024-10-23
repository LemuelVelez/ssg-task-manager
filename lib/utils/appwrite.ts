import { Client, Account, Databases } from "appwrite";

// Initialize the Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

// Create an instance of Account
const account = new Account(client);

// Create an instance of Databases to interact with collections
const databases = new Databases(client);

// Function to create a session using email and password
export const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    console.log("Login successful:", session);
    return session; // Return the session if needed
  } catch (error) {
    if (error instanceof Error) {
      console.error("Login failed:", error.message);
    } else {
      console.error("Login failed:", error);
    }
    throw error; // Propagate the error to be handled elsewhere
  }
};

// Function to get the currently logged-in user
export const getLoggedInUser = async () => {
  try {
    const user = await account.get(); // Fetch user data
    console.log("User retrieved:", user);
    return user; // Return user data
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to retrieve logged-in user:", error.message);
    } else {
      console.error("Failed to retrieve logged-in user:", error);
    }
    return null; // Return null if no user is logged in
  }
};

// Function to log out the current user
export const logout = async () => {
  try {
    await account.deleteSession("current"); // Deletes the current session
    console.log("Logout successful");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Logout failed:", error.message);
    } else {
      console.error("Logout failed:", error);
    }
    throw error; // Propagate the error to be handled elsewhere
  }
};

// Function to get tasks from the database collection
export const getTasks = async () => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, // Your Appwrite database ID
      process.env.NEXT_PUBLIC_APPWRITE_TASK_COLLECTION_ID as string // Your Task collection ID
    );
    console.log("Tasks retrieved:", response.documents);
    return response.documents; // Return the list of documents (tasks)
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to retrieve tasks:", error.message);
    } else {
      console.error("Failed to retrieve tasks:", error);
    }
    throw error; // Propagate the error to be handled elsewhere
  }
};

export { client, account, databases };
