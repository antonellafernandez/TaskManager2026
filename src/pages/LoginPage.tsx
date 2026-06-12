import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../api/authApi";
import { setToken } from "../utils/token";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await login({
        username,
        password,
      });

      setToken(response.token);

      navigate("/tasks");
    } catch (error) {
      setError("Invalid username or password");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div
        className="
        w-full
        max-w-md
        rounded-xl
        border
        border-slate-800
        bg-slate-900
        p-6
        shadow-md
      "
      >
        <h1 className="mb-6 text-center text-2xl font-bold text-white">
          Task Manager
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-sm font-medium text-slate-300"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              placeholder="Tobias Forge"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
              w-full
              rounded-md
              border
              border-slate-300
              bg-white
              px-3
              py-2
              text-slate-950
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
              placeholder:italic
            "
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-slate-300"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
              w-full
              rounded-md
              border
              border-slate-300
              bg-white
              px-3
              py-2
              text-slate-950
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
              placeholder:italic
            "
              required
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="
            w-full
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
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
