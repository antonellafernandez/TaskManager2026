import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between border-b p-4">
      <h1 className="text-xl font-bold">
        Task Manager
      </h1>

      <button
        onClick={handleLogout}
        className="rounded border px-3 py-1"
      >
        Logout
      </button>
    </nav>
  );
}
