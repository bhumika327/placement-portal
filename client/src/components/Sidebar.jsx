import { Link, useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-4">

      <h2 className="text-xl font-bold mb-6">
        Menu
      </h2>

      <ul className="space-y-4">

        <li>
          <Link to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/companies">
            Companies
          </Link>
        </li>

        <li>
          <Link to="/my-applications">
            My Applications
          </Link>
        </li>

      </ul>

      <button
        onClick={handleLogout}
        className="mt-8 bg-red-600 px-4 py-2 rounded"
      >
        Logout
      </button>

    </div>
  );
}

export default Sidebar;