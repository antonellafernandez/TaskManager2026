import type { Task } from "../types/task";

interface Props {
  task: Task;
  onSelect?: (task: Task) => void;
  onDelete?: (id: number) => void;
}

export default function TaskCard({
  task,
  onSelect,
  onDelete,
}: Props) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <div
        className="cursor-pointer"
        onClick={() => onSelect?.(task)}
      >
        <h3 className="text-lg font-semibold">
          {task.title}
        </h3>

        <p className="text-sm text-gray-600">
          {task.description}
        </p>

        <p className="mt-2 text-sm">
          Status: {task.status}
        </p>

        {task.dueDate && (
          <p className="text-sm">
            Due: {task.dueDate}
          </p>
        )}
      </div>

      <button
        onClick={() => onDelete?.(task.id)}
        className="mt-3 text-sm text-red-500"
      >
        Delete
      </button>
    </div>
  );
}
