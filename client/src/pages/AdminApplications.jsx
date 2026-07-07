import { useEffect, useState } from "react";
import axios from "axios";

function AdminApplications() {

  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/applications/admin"
      );

      setApplications(res.data);

    } catch (err) {

      console.log(err);

    }

  };
  


  const updateStatus = async (id, status) => {

    try {

      await axios.put(
        `http://localhost:5000/api/applications/status/${id}`,
        {
          status
        }
      );

      fetchApplications();

    } catch (err) {

      console.log(err);

    }

  };
  useEffect(() => {
   fetchApplications();
}, []);

  return (

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Manage Applications
      </h1>

      <table className="w-full bg-white shadow rounded">

        <thead className="bg-blue-600 text-white">

          <tr>

            <th className="p-3">Student</th>

            <th>Email</th>

            <th>Company</th>

            <th>Role</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {applications.map((app) => (

            <tr
              key={app.id}
              className="border-t text-center"
            >

              <td className="p-3">
                {app.name}
              </td>

              <td>
                {app.email}
              </td>

              <td>
                {app.company_name}
              </td>

              <td>
                {app.role}
              </td>

              <td>

              <select
  value={app.status}
  onChange={(e) =>
    updateStatus(
      app.id,
      e.target.value
    )
  }
  className="border p-2 rounded"
>

  <option value="Pending">
    Pending
  </option>

  <option value="Accepted">
   Selected
  </option>

  <option value="Rejected">
    Rejected
  </option>

</select>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default AdminApplications;