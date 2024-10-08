export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string; // Add this if dueDate is required
}

// Example service methods for fetching, adding, and deleting tasks
export const getTasks = async (): Promise<Task[]> => {
  // Simulate fetching tasks (replace this with real fetching logic)
  return [
    {
      id: "1",
      title: "Complete project",
      completed: false,
      dueDate: "2024-10-10",
    },
    { id: "2", title: "Review tasks", completed: true, dueDate: "2024-10-12" },
  ];
};

export const addTask = async (task: Task): Promise<void> => {
  // Simulate adding a task
};

export const deleteTask = async (id: string): Promise<void> => {
  // Simulate deleting a task
};
