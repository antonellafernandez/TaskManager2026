export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate?: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  status: string;
  dueDate?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: string;
  dueDate?: string;
}