import { Client, Account, Databases, Storage } from "appwrite";
import { Task } from "./types"; // Importing Task interface from types.ts

// Initialize the Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

// Create an instance of Account
const account = new Account(client);

// Create an instance of Databases to interact with collections
const databases = new Databases(client);

// Create an instance of Storage to handle file uploads
const storage = new Storage(client);

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

    // Filter for overdue tasks, excluding tasks with "complete" status
    const overdueTasks = tasks.filter((task) => {
      return new Date(task.deadline) < now && task.status !== "complete"; // Check if the task is overdue and not complete
    });

    // Update the status of all overdue tasks, except those with "complete" status
    const updatePromises = overdueTasks.map((task) => {
      const taskId = task.id; // Use the 'id' attribute for the task ID
      if (task.status !== "complete") {
        // Ensure complete tasks are excluded
        const newStatus = "overdue"; // Set the status to "overdue"
        return updateTaskStatus(taskId, newStatus); // Update each task's status
      }
    });

    // Wait for all the tasks to be updated
    const updatedTasks = await Promise.all(updatePromises.filter(Boolean)); // Filter out undefined results
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

// Function to create a new notification
export const createNotification = async (notificationData: {
  id: string;
  message: string;
  Priority: "Normal" | "High" | "Urgent"; // Use lowercase 'Priority' to match the Appwrite schema
}) => {
  try {
    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, // Your Appwrite database ID
      process.env.NEXT_PUBLIC_APPWRITE_NOTIFICATION_COLLECTION_ID as string, // Your Notification collection ID
      "unique()", // Auto-generate a unique ID for the notification
      {
        id: notificationData.id, // Add the message
        message: notificationData.message, // Add the message
        Priority: notificationData.Priority, // Add the Priority
      }
    );

    console.log("Notification created:", response);
    return response; // Return the created notification document
  } catch (error) {
    console.error(
      "Failed to create notification:",
      error instanceof Error ? error.message : error
    );
    throw error; // Propagate the error to be handled elsewhere
  }
};

// Function to get notifications from the database collection
export const getNotifications = async () => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, // Your Appwrite database ID
      process.env.NEXT_PUBLIC_APPWRITE_NOTIFICATION_COLLECTION_ID as string // Your Notification collection ID
    );

    // Map the documents to a notification type
    const notifications = response.documents.map((doc: any) => ({
      id: doc.$id, // Assuming $id is the unique identifier in Appwrite
      message: doc.message,
      Priority: doc.Priority,
    }));

    console.log("Notifications retrieved:", notifications);
    return notifications; // Return the list of mapped notifications
  } catch (error) {
    console.error(
      "Failed to retrieve notifications:",
      error instanceof Error ? error.message : error
    );
    throw error; // Propagate the error to be handled elsewhere
  }
};

// Function to delete a notification
export const deleteNotification = async (notificationId: string) => {
  try {
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, // Your Appwrite database ID
      process.env.NEXT_PUBLIC_APPWRITE_NOTIFICATION_COLLECTION_ID as string, // Your Notification collection ID
      notificationId // The ID of the notification to delete
    );
    console.log("Notification deleted:", notificationId);
  } catch (error) {
    console.error(
      "Failed to delete notification:",
      error instanceof Error ? error.message : error
    );
    throw error; // Propagate the error to be handled elsewhere
  }
};

// Function to upload a file to the Proofs bucket
export const uploadProofFile = async (file: File) => {
  try {
    const response = await storage.createFile(
      process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string, // Your Appwrite bucket ID
      "unique()", // Auto-generate a unique ID for the file
      file // The file to upload
    );
    console.log("File uploaded:", response);
    return response; // Return the uploaded file document
  } catch (error) {
    console.error(
      "Failed to upload file:",
      error instanceof Error ? error.message : error
    );
    throw error; // Propagate the error to be handled elsewhere
  }
};

// Function to delete a file from the Proofs bucket
export const deleteProofFile = async (fileId: string) => {
  try {
    await storage.deleteFile(
      process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string, // Your Appwrite bucket ID
      fileId // The ID of the file to delete
    );
    console.log("File deleted:", fileId);
  } catch (error) {
    console.error(
      "Failed to delete file:",
      error instanceof Error ? error.message : error
    );
    throw error; // Propagate the error to be handled elsewhere
  }
};

// Function to create a new proof
export const createProofs = async (proofData: {
  type: "Duty" | "Task";
  file: string; // URL of the uploaded file
  description: string;
  status: "Pending" | "Approved" | "Rejected";
}) => {
  try {
    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, // Your Appwrite database ID
      process.env.NEXT_PUBLIC_APPWRITE_PROOFS_COLLECTION_ID as string, // Your Proofs collection ID
      "unique()", // Use 'unique()' to auto-generate a unique ID for the proof
      proofData
    );
    console.log("Proof created:", response);
    return response; // Return the created proof document
  } catch (error) {
    console.error(
      "Failed to create proof:",
      error instanceof Error ? error.message : error
    );
    throw error; // Propagate the error to be handled elsewhere
  }
};

// Function to get proofs from the database collection
export const getProofs = async () => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, // Your Appwrite database ID
      process.env.NEXT_PUBLIC_APPWRITE_PROOFS_COLLECTION_ID as string // Your Proofs collection ID
    );

    const proofs = response.documents.map((doc: any) => ({
      id: doc.$id,
      type: doc.type,
      file: doc.file,
      description: doc.description,
      status: doc.status,
    }));

    console.log("Proofs retrieved:", proofs);
    return proofs; // Return the list of mapped proofs
  } catch (error) {
    console.error(
      "Failed to retrieve proofs:",
      error instanceof Error ? error.message : error
    );
    throw error; // Propagate the error to be handled elsewhere
  }
};

// Function to delete a proof
export const deleteProofs = async (proofId: string) => {
  try {
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, // Your Appwrite database ID
      process.env.NEXT_PUBLIC_APPWRITE_PROOFS_COLLECTION_ID as string, // Your Proofs collection ID
      proofId // The ID of the proof to delete
    );
    console.log("Proof deleted:", proofId);
  } catch (error) {
    console.error(
      "Failed to delete proof:",
      error instanceof Error ? error.message : error
    );
    throw error; // Propagate the error to be handled elsewhere
  }
};

export { client, account, databases, storage };
