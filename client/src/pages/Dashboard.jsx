import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBuilding,
  FaFileAlt,
  FaGraduationCap,
  FaUserCircle,
  FaEnvelope,
  FaCodeBranch
} from "react-icons/fa";

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

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Welcome Section */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Welcome, {student.name} 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Here's an overview of your placement activities.
        </p>

      </div>

      {/* Dashboard Cards */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl shadow-xl p-6 hover:scale-105 transition duration-300">

          <FaBuilding size={35} />

          <h2 className="text-xl font-semibold mt-4">
            Companies
          </h2>

          <p className="text-4xl font-bold mt-3">
            15
          </p>

        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-2xl shadow-xl p-6 hover:scale-105 transition duration-300">

          <FaFileAlt size={35} />

          <h2 className="text-xl font-semibold mt-4">
            Applications
          </h2>

          <p className="text-4xl font-bold mt-3">
            4
          </p>

        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-2xl shadow-xl p-6 hover:scale-105 transition duration-300">

          <FaGraduationCap size={35} />

          <h2 className="text-xl font-semibold mt-4">
            CGPA
          </h2>

          <p className="text-4xl font-bold mt-3">
            {student.cgpa}
          </p>

        </div>

      </div>

      {/* Student Profile */}

      <div className="bg-white rounded-3xl shadow-xl p-8">

        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Student Profile
        </h2>

        <div className="space-y-6">

          <div className="flex items-center justify-between border-b pb-4">

            <div className="flex items-center gap-3">

              <FaUserCircle className="text-blue-600 text-2xl" />

              <span className="font-semibold">
                Name
              </span>

            </div>

            <span className="text-gray-700">
              {student.name}
            </span>

          </div>

          <div className="flex items-center justify-between border-b pb-4">

            <div className="flex items-center gap-3">

              <FaEnvelope className="text-green-600 text-xl" />

              <span className="font-semibold">
                Email
              </span>

            </div>

            <span className="text-gray-700">
              {student.email}
            </span>

          </div>

          <div className="flex items-center justify-between border-b pb-4">

            <div className="flex items-center gap-3">

              <FaCodeBranch className="text-purple-600 text-xl" />

              <span className="font-semibold">
                Branch
              </span>

            </div>

            <span className="text-gray-700">
              {student.branch}
            </span>

          </div>

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <FaGraduationCap className="text-orange-500 text-xl" />

              <span className="font-semibold">
                CGPA
              </span>

            </div>

            <span className="font-bold text-lg text-blue-600">
              {student.cgpa}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;