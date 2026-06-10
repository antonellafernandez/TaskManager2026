export const TASK_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
} as const;

export type TaskStatus =
  (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

export type TaskFilter = "ALL" | TaskStatus;

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate?: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: TaskStatus;
  dueDate?: string;
}
