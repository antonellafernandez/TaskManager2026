import type { Task } from "../types/task";

interface Props {
  task: Task;
  onDelete?: (id: number) => void;
  onStart?: (task: Task) => void;
  onComplete?: (task: Task) => void;
}

export default function TaskCard({ task, onDelete, onStart, onComplete }: Props) {
  return (
    <div
      className="
        h-full
        rounded-xl
        border
        border-slate-800
        bg-slate-900
        p-5
        shadow-md
        transition-all
        hover:shadow-xl
        hover:border-slate-700
      "
    >
      <div>
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-100 break-words">
            {task.title}
          </h3>

          <span
            className={`
              shrink-0
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold
              capitalize
              ${
                task.status === "completed"
                  ? "bg-lime-500/15 text-lime-400"
                  : task.status === "in-progress"
                    ? "bg-blue-500/15 text-blue-400"
                    : "bg-pink-500/15 text-pink-400"
              }
            `}
          >
            {task.status}
          </span>
        </div>

        <p className="mb-4 text-sm text-slate-400">
          {task.description || "No description provided."}
        </p>

        {task.dueDate && (
          <div className="text-sm text-slate-500">
            <span className="font-medium text-slate-300">Due Date:</span>{" "}
            {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}
      </div>

      <div className="mt-5 flex justify-end gap-2">
        {task.status === "pending" && (
          <button
            onClick={() => onStart?.(task)}
            className="
              cursor-pointer
              rounded-md
              bg-blue-500
              px-4
              py-2
              text-sm
              font-medium
              text-white
              transition
              hover:bg-blue-400
            "
          >
            Start
          </button>
        )}

        {task.status === "in-progress" && (
          <button
            onClick={() => onComplete?.(task)}
            className="
              cursor-pointer
              rounded-md
              bg-lime-500/90
              px-4
              py-2
              text-sm
              font-medium
              text-slate-950
              transition
              hover:bg-lime-400
            "
          >
            Complete
          </button>
        )}

        <button
          onClick={() => onDelete?.(task.id)}
          className="
            cursor-pointer
            rounded-md
            border
            border-pink-500/60
            px-4
            py-2
            text-sm
            font-medium
            text-pink-400
            transition
            hover:bg-pink-500
            hover:text-white
          "
        >
          Delete
        </button>
      </div>
    </div>
  );
}
