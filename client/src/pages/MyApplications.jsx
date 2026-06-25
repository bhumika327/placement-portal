import { useEffect, useState } from "react";
import axios from "axios";

function MyApplications() {

  const [applications, setApplications] =
    useState([]);

  useEffect(() => {

    const fetchApplications = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/applications/my-applications"
        );

        setApplications(res.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchApplications();

  }, []);

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Applications
      </h1>

      <div className="grid md:grid-cols-2 gap-4">

        {applications.map((app) => (

          <div
            key={app.id}
            className="bg-white p-4 rounded shadow"
          >

            <h2 className="text-xl font-bold">
              {app.company_name}
            </h2>

            <p>{app.role}</p>

            <p>{app.package} LPA</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MyApplications;