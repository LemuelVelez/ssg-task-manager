// statusDisplayMap: Mapping status codes to human-readable labels
export const statusDisplayMap: { [key: string]: string } = {
  overdue: "Overdue",
  inProgress: "In Progress",
  complete: "Complete",
  pending: "Pending",
};

// Task interface for type safety across the app
export interface Task {
  id: string;
  title: string;
  description?: string;
  member: string;
  deadline: string;
  status: string;
}

export interface createNotification {
  id: string;
  message: string;
  Priority: string;
}
