import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import type {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskFilter,
} from "../types/task";

import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../api/taskApi";

import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import TaskFilters from "../components/TaskFilters";

export default function TasksPage() {
  const queryClient = useQueryClient();

  const [filter, setFilter] = useState<TaskFilter>("ALL");

  // =========================
  // QUERY (GET TASKS)
  // =========================
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks", filter],
    queryFn: () =>
      getTasks(filter === "ALL" ? undefined : filter),
  });

  // =========================
  // CREATE TASK (optimistic)
  // =========================
  const createMutation = useMutation({
    mutationFn: createTask,

    onMutate: async (newTask: CreateTaskRequest) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks = queryClient.getQueryData<Task[]>([
        "tasks",
        filter,
      ]);

      const tempTask: Task = {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        status: newTask.status ?? "pending",
        dueDate: newTask.dueDate,
      };

      queryClient.setQueryData<Task[]>(["tasks", filter], (old) => [
        ...(old || []),
        tempTask,
      ]);

      return { previousTasks };
    },

    onError: (_err, _newTask, context) => {
      queryClient.setQueryData(
        ["tasks", filter],
        context?.previousTasks
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // =========================
  // DELETE TASK (optimistic)
  // =========================
  const deleteMutation = useMutation({
    mutationFn: deleteTask,

    onMutate: async (taskId: number) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks = queryClient.getQueryData<Task[]>([
        "tasks",
        filter,
      ]);

      queryClient.setQueryData<Task[]>(["tasks", filter], (old) =>
        old?.filter((t) => t.id !== taskId)
      );

      return { previousTasks };
    },

    onError: (_err, _id, context) => {
      queryClient.setQueryData(
        ["tasks", filter],
        context?.previousTasks
      );
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // =========================
  // UPDATE TASK (optimistic)
  // =========================
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateTaskRequest;
    }) => updateTask(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks = queryClient.getQueryData<Task[]>([
        "tasks",
        filter,
      ]);

      queryClient.setQueryData<Task[]>(["tasks", filter], (old) =>
        old?.map((task) =>
          task.id === id ? { ...task, ...data } : task
        )
      );

      return { previousTasks };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(
        ["tasks", filter],
        context?.previousTasks
      );
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // =========================
  // UI STATES
  // =========================
  if (isLoading) {
    return (
      <div className="p-6">
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p>Failed to load tasks.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen mx-auto max-w-4xl p-6 text-slate-950 bg-white">
        <h1 className="mb-6 text-3xl font-bold">Tasks</h1>

        {/* Create task */}
        <TaskForm
          onSubmit={(task: CreateTaskRequest) =>
            createMutation.mutate(task)
          }
        />

        {/* Filters */}
        <TaskFilters status={filter} onChange={setFilter} />

        {/* Task list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {!tasks?.length ? (
            <p>No tasks found.</p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={(id) => deleteMutation.mutate(id)}
                onStart={(task) =>
                  updateMutation.mutate({
                    id: task.id,
                    data: {
                      title: task.title,
                      description: task.description,
                      status: "in-progress",
                    },
                  })
                }
                onComplete={(task) =>
                  updateMutation.mutate({
                    id: task.id,
                    data: {
                      title: task.title,
                      description: task.description,
                      status: "completed",
                    },
                  })
                }
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
