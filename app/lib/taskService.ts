// lib/taskService.ts
import { databases } from "./appwrite"; // Ensure this imports your Appwrite client

// Ensure the environment variables are defined
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
if (!DATABASE_ID) {
  throw new Error("NEXT_PUBLIC_APPWRITE_DATABASE_ID is not defined.");
}
const COLLECTION_ID = "tasks"; // Your tasks collection ID

// Define an interface for the Task
interface Task {
  $id: string; // Include the $id property
  title: string;
  description: string;
  assigned_to: string;
  status: string;
  deadline: string;
  proof?: string | null; // Optional proof field
}

// Function to create a new task
export const createTask = async (
  taskData: Omit<Task, "$id">
): Promise<Task | null> => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      "unique()",
      taskData
    );
    return {
      $id: response.$id,
      ...taskData,
    };
  } catch (error) {
    console.error("Error creating task:", error);
    return null; // Return null on error
  }
};

// Function to delete a task by ID
export const deleteTask = async (taskId: string): Promise<boolean> => {
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, taskId);
    return true; // Return true if deletion was successful
  } catch (error) {
    console.error("Error deleting task:", error);
    return false; // Return false on error
  }
};

// Existing fetchTasks function...
export const fetchTasks = async (): Promise<Task[] | null> => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);

    // Map Documents to Task
    const transformedTasks: Task[] = response.documents.map((doc: any) => ({
      $id: doc.$id,
      title: doc.title || "",
      description: doc.description || "",
      assigned_to: doc.assigned_to || "",
      status: doc.status || "pending",
      deadline: doc.deadline || "",
      proof: doc.proof || null,
    }));

    return transformedTasks; // Return the transformed tasks
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return null; // Return null on error
  }
};
