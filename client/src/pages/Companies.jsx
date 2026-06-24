import { useEffect, useState } from "react";
import axios from "axios";

function Companies() {

  const [companies, setCompanies] = useState([]);

  const handleApply = async (companyId) => {
    try {

      await axios.post(
        "http://localhost:5000/api/applications/apply",
        {
          student_id: 3,
          company_id: companyId
        }
      );

      alert("Applied Successfully!");

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    const fetchCompanies = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/companies"
        );

        setCompanies(res.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchCompanies();

  }, []);

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Available Companies
      </h1>

      <div className="grid md:grid-cols-2 gap-4">

        {companies.map((company) => (

          <div
            key={company.id}
            className="bg-white p-6 rounded-2xl shadow"
          >

            <h2 className="text-2xl font-bold">
              {company.company_name}
            </h2>

            <p>Role: {company.role}</p>

            <p>Package: {company.package} LPA</p>

            <button
              onClick={() => handleApply(company.id)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Apply
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Companies;