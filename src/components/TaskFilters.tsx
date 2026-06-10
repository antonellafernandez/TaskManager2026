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
    <div className="mb-4 flex gap-2">
      <button
        onClick={() => onChange("ALL")}
        className={status === "ALL" ? "font-bold" : ""}
      >
        All
      </button>

      <button
        onClick={() => onChange("pending")}
        className={status === "pending" ? "font-bold" : ""}
      >
        Pending
      </button>

      <button
        onClick={() => onChange("in-progress")}
        className={status === "in-progress" ? "font-bold" : ""}
      >
        In Progress
      </button>

      <button
        onClick={() => onChange("completed")}
        className={status === "completed" ? "font-bold" : ""}
      >
        Completed
      </button>
    </div>
  );
}
