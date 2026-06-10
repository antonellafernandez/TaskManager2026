import { api } from "./axios";
import type {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskStatus,
} from "../types/task";

export const getTasks = async (
  status?: TaskStatus
): Promise<Task[]> => {
  const response = await api.get<Task[]>("/tasks", {
    params: { status },
  });

  return response.data;
};

export const createTask = async (
  task: CreateTaskRequest
): Promise<Task> => {
  const response = await api.post<Task>(
    "/tasks",
    task
  );

  return response.data;
};

export const updateTask = async (
  id: number,
  task: UpdateTaskRequest
): Promise<Task> => {
  const response = await api.put<Task>(
    `/tasks/${id}`,
    task
  );

  return response.data;
};

export const deleteTask = async (
  id: number
): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
