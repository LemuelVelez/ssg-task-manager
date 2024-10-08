export interface Task {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

// Example tasks for demonstration
export const tasks: Task[] = [
  {
    id: "1",
    title: "Complete the project proposal",
    dueDate: "2024-10-15",
    completed: false,
  },
  {
    id: "2",
    title: "Prepare presentation for SSG meeting",
    dueDate: "2024-10-20",
    completed: false,
  },
];
