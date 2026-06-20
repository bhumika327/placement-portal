import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [student, setStudent] = useState({});

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/students/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
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
    <div>

      <h1>Student Dashboard</h1>

      <h3>Name: {student.name}</h3>

      <h3>Email: {student.email}</h3>

      <h3>Branch: {student.branch}</h3>

      <h3>CGPA: {student.cgpa}</h3>

      <button onClick={handleLogout}>
        Logout
      </button>

    </div>
  );
}

export default Dashboard;