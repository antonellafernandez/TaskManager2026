import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-slate-900 text-white">
      <h1 className="text-xl font-bold">Task Manager</h1>

      <button
        onClick={handleLogout}
        className="
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
      >
        Logout
      </button>
    </nav>
  );
}
