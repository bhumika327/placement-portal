import { useEffect, useState } from "react";
import axios from "axios";

function MyApplications() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {

    const fetchApplications = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/applications/my-applications"
        );

        setApplications(res.data);

      } catch (err) {
        console.log(err);
      }

    };

    fetchApplications();

  }, []);

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Applications 📄
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>

              <th className="p-4 text-left">
                Company
              </th>

              <th className="p-4 text-left">
                Role
              </th>

              <th className="p-4 text-left">
                Package
              </th>

              <th className="p-4 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {applications.map((item) => (

              <tr
                key={item.id}
                className="border-b"
              >

                <td className="p-4">
                  {item.company_name}
                </td>

                <td className="p-4">
                  {item.role}
                </td>

                <td className="p-4">
                  {item.package} LPA
                </td>

             <td className="p-4">
  <span
    className={`px-3 py-1 rounded-full text-white ${
      item.status === "Selected"
        ? "bg-green-600"
        : item.status === "Rejected"
        ? "bg-red-600"
        : "bg-yellow-500"
    }`}
  >
    {item.status}
  </span>
</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default MyApplications;