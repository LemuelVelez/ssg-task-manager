import { Client, Account, Databases, Query, Models } from "appwrite";

// Initialize the Appwrite client
const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // Use non-null assertion operator
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!); // Use non-null assertion operator

const account = new Account(client);
const databases = new Databases(client); // In case you need to interact with databases

// Define the user data interface for TypeScript
interface UserData {
  name: string;
  email: string;
  password: string; // You might not want to return password when fetching user data
  role?: string; // Optional in case the role is assigned later
}

/**
 * Function to create a user in Appwrite.
 * @param userData - The user data to create a new user.
 * @returns Promise<void>
 */
export async function createUser(userData: UserData): Promise<void> {
  const { name, email, password, role } = userData;

  try {
    // Create the user in Appwrite
    const user = await account.create("unique()", email, password, name);

    console.log("User created successfully:", user);

    // Optionally set user role in the database if specified
    if (role) {
      const documentData = { name, email, role };

      // Check if the database ID and collection ID are defined
      if (!process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID) {
        throw new Error(
          "Database ID is not defined in the environment variables."
        );
      }

      const collectionId = "users"; // Replace with the actual collection ID for users

      // Create the document in the database for user role
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        collectionId,
        user.$id, // Use user ID as the document ID
        documentData // Store user role and other details
      );

      console.log("User role assigned successfully:", documentData);
    }
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Rethrow error to handle it in the calling function
  }
}

/**
 * Function to get user by email from the database.
 * @param email - The email of the user to fetch.
 * @returns Promise<UserData | null> - Returns user data if found, otherwise null.
 */
export async function getUserByEmail(email: string): Promise<UserData | null> {
  try {
    const userList = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      "users", // Replace with the actual collection ID for users
      [Query.equal("email", email)]
    );

    // Check if any documents are returned
    if (userList.documents.length > 0) {
      const document = userList.documents[0];

      // Map the Document properties to UserData
      const userData: UserData = {
        name: document.name,
        email: document.email,
        password: "", // Do not return password or handle it securely
        role: document.role, // Assuming role exists in your document
      };

      return userData;
    }

    return null; // Return null if no user is found
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null; // Return null if there's an error
  }
}
