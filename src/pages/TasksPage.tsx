import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import type {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskFilter,
} from "../types/task";

import { getTasks, createTask, deleteTask, updateTask } from "../api/taskApi";

import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import TaskFilters from "../components/TaskFilters";

export default function TasksPage() {
  const queryClient = useQueryClient();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [filter, setFilter] = useState<TaskFilter>("ALL");

  // -------------------------
  // GET TASKS
  // -------------------------
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks", filter],
    queryFn: () => getTasks(filter === "ALL" ? undefined : filter),
  });

  // -------------------------
  // CREATE (optimistic)
  // -------------------------
  const createMutation = useMutation({
    mutationFn: createTask,

    onMutate: async (newTask: CreateTaskRequest) => {
      await queryClient.cancelQueries({
        queryKey: ["tasks", filter],
      });

      const previousTasks = queryClient.getQueryData<Task[]>(["tasks", filter]);

      const tempTask: Task = {
        id: Date.now(),
        ...newTask,
      };

      queryClient.setQueryData<Task[]>(["tasks", filter], (old) => [
        ...(old || []),
        tempTask,
      ]);

      return { previousTasks };
    },

    onError: (_err, _newTask, context) => {
      queryClient.setQueryData(["tasks", filter], context?.previousTasks);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", filter],
      });
    },
  });

  // -------------------------
  // DELETE (optimistic)
  // -------------------------
  const deleteMutation = useMutation({
    mutationFn: deleteTask,

    onMutate: async (taskId: number) => {
      await queryClient.cancelQueries({
        queryKey: ["tasks", filter],
      });

      const previousTasks = queryClient.getQueryData<Task[]>(["tasks", filter]);

      queryClient.setQueryData<Task[]>(["tasks", filter], (old) =>
        old?.filter((t) => t.id !== taskId),
      );

      return { previousTasks };
    },

    onError: (_err, _id, context) => {
      queryClient.setQueryData(["tasks", filter], context?.previousTasks);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", filter],
      });
    },
  });

  // -------------------------
  // UPDATE (optimistic)
  // -------------------------
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTaskRequest }) =>
      updateTask(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: ["tasks", filter],
      });

      const previousTasks = queryClient.getQueryData<Task[]>(["tasks", filter]);

      queryClient.setQueryData<Task[]>(["tasks", filter], (old) =>
        old?.map((task) => (task.id === id ? { ...task, ...data } : task)),
      );

      return { previousTasks };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["tasks", filter], context?.previousTasks);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", filter],
      });
    },
  });

  // -------------------------
  // LOADING
  // -------------------------
  if (isLoading) {
    return (
      <div className="p-6">
        <p>Loading tasks...</p>
      </div>
    );
  }

  // -------------------------
  // ERROR
  // -------------------------
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

      <div className="mx-auto max-w-4xl p-6">
        <h1 className="mb-6 text-3xl font-bold">Tasks</h1>

        {/* CREATE TASK */}
        <TaskForm
          onSubmit={(task: CreateTaskRequest) => createMutation.mutate(task)}
        />

        {/* FILTERS */}
        <TaskFilters status={filter} onChange={setFilter} />

        {/* TASK LIST */}
        <div className="space-y-4">
          {!tasks?.length ? (
            <p>No tasks found.</p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onSelect={setSelectedTask}
                onDelete={(id) => deleteMutation.mutate(id)}
              />
            ))
          )}
        </div>

        {/* SELECTED TASK */}
        {selectedTask && (
          <div className="mt-8 rounded-lg border p-4">
            <h2 className="mb-2 text-xl font-semibold">Selected Task</h2>

            <p>
              <strong>Title:</strong> {selectedTask.title}
            </p>

            <p>
              <strong>Description:</strong> {selectedTask.description}
            </p>

            <p>
              <strong>Status:</strong> {selectedTask.status}
            </p>

            {/* QUICK UPDATE EXAMPLE */}
            <button
              onClick={() =>
                updateMutation.mutate({
                  id: selectedTask.id,
                  data: {
                    status: "completed",
                  },
                })
              }
              className="mt-3 rounded border px-3 py-1"
            >
              Mark as completed
            </button>
          </div>
        )}
      </div>
    </>
  );
}
