import { useState } from "react";
import type { CreateTaskRequest } from "../types/task";
import { TASK_STATUS } from "../types/task";

interface Props {
  onSubmit: (task: CreateTaskRequest) => void;
}

export default function TaskForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      title,
      description,
      status: TASK_STATUS.PENDING,
    });

    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 space-y-4 rounded-xl border p-4 text-white bg-slate-900"
    >
      <div>
        <label
          htmlFor="title"
          className="mb-1 block text-sm font-medium text-slate-300"
        >
          Title
        </label>

        <input
          className="
          w-full
          rounded-md
          border
          border-slate-300
          bg-white
          p-2
          text-slate-950
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          placeholder:italic
        "
          placeholder="Prepare project presentation"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-1 block text-sm font-medium text-slate-300"
        >
          Description
        </label>

        <input
          className="
          w-full
          rounded-md
          border
          border-slate-300
          bg-white
          p-2
          text-slate-950
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          placeholder:italic
        "
          placeholder="Create slides and review requirements before Friday"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button
        className="
          w-full
          cursor-pointer
          rounded-md
          bg-blue-500
          px-4
          py-2
          text-sm
          font-medium
          transition
          hover:bg-blue-400
        "
        type="submit"
      >
        Create Task
      </button>
    </form>
  );
}
