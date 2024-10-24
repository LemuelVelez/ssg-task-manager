import { Client, Account, Databases } from "appwrite";
import { Task } from "./types"; // Importing Task interface from types.ts

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
    console.error(
      "Login failed:",
      error instanceof Error ? error.message : error
    );
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
    console.error(
      "Failed to retrieve logged-in user:",
      error instanceof Error ? error.message : error
    );
    return null; // Return null if no user is logged in
  }
};

// Function to log out the current user
export const logout = async () => {
  try {
    await account.deleteSession("current"); // Deletes the current session
    console.log("Logout successful");
  } catch (error) {
    console.error(
      "Logout failed:",
      error instanceof Error ? error.message : error
    );
    throw error; // Propagate the error to be handled elsewhere
  }
};

// Function to get tasks from the database collection
export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, // Your Appwrite database ID
      process.env.NEXT_PUBLIC_APPWRITE_TASK_COLLECTION_ID as string // Your Task collection ID
    );

    // Map the documents to the Task type
    const tasks: Task[] = response.documents.map((doc: any) => ({
      id: doc.$id, // Assuming $id is the unique identifier in Appwrite
      title: doc.title,
      description: doc.description,
      member: doc.member,
      deadline: doc.deadline,
      status: doc.status,
    }));

    console.log("Tasks retrieved:", tasks);
    return tasks; // Return the list of mapped tasks
  } catch (error) {
    console.error(
      "Failed to retrieve tasks:",
      error instanceof Error ? error.message : error
    );
    throw error; // Propagate the error to be handled elsewhere
  }
};

// Function to create a new task
export const createTask = async (taskData: {
  title: string;
  description?: string;
  member: string;
  deadline: string;
}) => {
  try {
    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, // Your Appwrite database ID
      process.env.NEXT_PUBLIC_APPWRITE_TASK_COLLECTION_ID as string, // Your Task collection ID
      "unique()", // Use 'unique()' to auto-generate a unique ID for the task
      {
        ...taskData,
        status: "pending",
      }
    );
    console.log("Task created:", response);
    return response; // Return the created task document
  } catch (error) {
    console.error(
      "Failed to create task:",
      error instanceof Error ? error.message : error
    );
    throw error; // Propagate the error to be handled elsewhere
  }
};

// Function to delete a task
export const deleteTask = async (taskId: string) => {
  try {
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, // Your Appwrite database ID
      process.env.NEXT_PUBLIC_APPWRITE_TASK_COLLECTION_ID as string, // Your Task collection ID
      taskId // The ID of the task to delete
    );
    console.log("Task deleted:", taskId);
  } catch (error) {
    console.error(
      "Failed to delete task:",
      error instanceof Error ? error.message : error
    );
    throw error; // Propagate the error to be handled elsewhere
  }
};

// Function to update the status of a task
export const updateTaskStatus = async (taskId: string, status: string) => {
  try {
    const response = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, // Your Appwrite database ID
      process.env.NEXT_PUBLIC_APPWRITE_TASK_COLLECTION_ID as string, // Your Task collection ID
      taskId, // The ID of the task to update
      {
        status, // Update the status field
      }
    );
    console.log("Task status updated:", response);
    return response; // Return the updated task document
  } catch (error) {
    console.error(
      "Failed to update task status:",
      error instanceof Error ? error.message : error
    );
    throw error; // Propagate the error to be handled elsewhere
  }
};

export const updateOverdueTasks = async () => {
  try {
    const tasks = await getTasks(); // Fetch all tasks

    // Get current date and time
    const now = new Date();

    // Filter for overdue tasks
    const overdueTasks = tasks.filter((task) => {
      return new Date(task.deadline) < now && task.status !== "completed"; // Check if the task is overdue and not completed
    });

    // Update the status of all overdue tasks
    const updatePromises = overdueTasks.map((task) => {
      const taskId = task.id; // Use the 'id' attribute for the task ID
      const newStatus = "overdue"; // Set the status to "overdue"
      return updateTaskStatus(taskId, newStatus); // Update each task's status
    });

    const updatedTasks = await Promise.all(updatePromises);
    console.log("Updated overdue tasks:", updatedTasks);
  } catch (error) {
    console.error(
      "Error updating overdue tasks:",
      error instanceof Error ? error.message : error
    );
  }
};

// Call the function to demonstrate updating overdue tasks
updateOverdueTasks();

export { client, account, databases };
