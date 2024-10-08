// app/lib/taskService.ts
import { databases } from "./appwrite";

// Define the Task interface
interface Task {
  title: string;
  description?: string;
  assigned_to: string;
  status: "pending" | "in_progress" | "completed";
  deadline: string; // You can change this to Date if you're using a Date object
  proof?: string; // Optional field
}

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || ""; // Ensure to replace this in your .env.local
const COLLECTION_ID = "tasks"; // Your tasks collection ID

export const createTask = async (task: Task) => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      "unique()",
      task
    );
    return response;
  } catch (error) {
    console.error("Error creating task:", error);
  }
};

export const fetchTasks = async () => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    return response.documents;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export const updateTask = async (taskId: string, updates: Partial<Task>) => {
  try {
    const response = await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      taskId,
      updates
    );
    return response;
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, taskId);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
