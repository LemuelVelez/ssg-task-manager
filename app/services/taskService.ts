import { Task } from "../models/task";

// Dummy data for demonstration purposes (replace with your actual data source)
let tasks: Task[] = [];

// Function to simulate file upload and return a URL (replace this with actual upload logic)
const uploadFile = async (file: File): Promise<string> => {
  // Simulate file upload and return a URL
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`https://example.com/${file.name}`); // Dummy URL
    }, 1000);
  });
};

// Update the addTask function to handle proof URL
export const addTask = async (task: Task, proof?: File) => {
  if (proof) {
    task.proofUrl = await uploadFile(proof);
  }
  tasks.push(task); // Add task to the in-memory list (replace with your data source)
};

// Your existing functions
export const getTasks = async (): Promise<Task[]> => {
  return tasks;
};

export const deleteTask = async (id: string) => {
  tasks = tasks.filter((task) => task.id !== id);
};
