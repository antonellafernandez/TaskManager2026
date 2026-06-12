import type { TaskFilter } from "../types/task";

interface Props {
  status: TaskFilter;
  onChange: (value: TaskFilter) => void;
}

export default function TaskFilters({
  status,
  onChange,
}: Props) {
  return (
    <div className="mb-4 flex gap-4 text-slate-950">
      <button
        onClick={() => onChange("ALL")}
        className={
          status === "ALL" ? "font-bold" : "cursor-pointer"}
      >
        All
      </button>

      <button
        onClick={() => onChange("pending")}
        className={status === "pending" ? "font-bold text-pink-500" : "cursor-pointer"}
      >
        Pending
      </button>

      <button
        onClick={() => onChange("in-progress")}
        className={status === "in-progress" ? "font-bold text-blue-500" : "cursor-pointer"}
      >
        In Progress
      </button>

      <button
        onClick={() => onChange("completed")}
        className={status === "completed" ? "font-bold text-lime-500" : "cursor-pointer"}
      >
        Completed
      </button>
    </div>
  );
}
