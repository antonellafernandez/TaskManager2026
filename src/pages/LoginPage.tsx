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

  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
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
      setError("Usuario o contraseña inválidos");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg border p-6 shadow">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Task Manager
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="username"
              className="mb-1 block"
            >
              Usuario
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              className="w-full rounded border px-3 py-2"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block"
            >
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded border px-3 py-2"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded border px-4 py-2"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
