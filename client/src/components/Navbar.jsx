import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        Placement Portal
      </h1>

      <div className="flex gap-6">

        <Link
          to="/dashboard"
          className="hover:text-yellow-300"
        >
          Dashboard
        </Link>

        <Link
          to="/companies"
          className="hover:text-yellow-300"
        >
          Companies
        </Link>

        <Link
          to="/my-applications"
          className="hover:text-yellow-300"
        >
          My Applications
        </Link>

        <Link
          to="/profile"
          className="hover:text-yellow-300"
        >
          My Profile
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;