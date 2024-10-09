import { databases } from "./appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID; // Use the environment variable
const COLLECTION_ID = "tasks"; // Your tasks collection ID

export const createTask = async (task) => {
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

export const updateTask = async (taskId, updates) => {
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

export const deleteTask = async (taskId) => {
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, taskId);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
