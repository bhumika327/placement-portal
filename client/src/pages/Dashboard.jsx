import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [student, setStudent] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/students/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStudent(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">
          Placement Portal
        </h1>
      </nav>

      <div className="max-w-6xl mx-auto p-6">

        <h2 className="text-3xl font-bold mb-6">
          Welcome, {student.name} 👋
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mb-8">

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">
              Companies
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              15
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">
              Applied
            </h3>
            <p className="text-3xl font-bold text-green-600">
              4
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">
              CGPA
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              {student.cgpa}
            </p>
          </div>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <h3 className="text-2xl font-bold mb-4">
            Student Profile
          </h3>

          <p className="mb-2">
            <strong>Name:</strong> {student.name}
          </p>

          <p className="mb-2">
            <strong>Email:</strong> {student.email}
          </p>

          <p className="mb-2">
            <strong>Branch:</strong> {student.branch}
          </p>

          <p className="mb-4">
            <strong>CGPA:</strong> {student.cgpa}
          </p>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;