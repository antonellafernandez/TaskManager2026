import { useState } from "react";
import type { CreateTaskRequest, TaskStatus } from "../types/task";
import { TASK_STATUS } from "../types/task";

interface Props {
  onSubmit: (task: CreateTaskRequest) => void;
}

export default function TaskForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(
    TASK_STATUS.PENDING
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      title,
      description,
      status,
    });

    setTitle("");
    setDescription("");
    setStatus(TASK_STATUS.PENDING);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 space-y-3 rounded border p-4"
    >
      <input
        className="w-full border p-2"
        placeholder="Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <input
        className="w-full border p-2"
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <select
        value={status}
        onChange={(e) =>
          setStatus(
            e.target.value as TaskStatus
          )
        }
      >
        <option value={TASK_STATUS.PENDING}>
          Pending
        </option>

        <option value={TASK_STATUS.IN_PROGRESS}>
          In Progress
        </option>

        <option value={TASK_STATUS.COMPLETED}>
          Completed
        </option>
      </select>

      <button
        className="w-full border p-2"
        type="submit"
      >
        Create Task
      </button>
    </form>
  );
}
