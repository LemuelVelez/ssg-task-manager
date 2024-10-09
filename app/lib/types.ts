// app/lib/types.ts
export interface Task {
  $id: string; // Task ID from Appwrite
  title: string; // Title of the task
  description: string; // Description of the task
  deadline: string; // Deadline of the task
  // Add any other fields as needed
}
