import { useEffect, useState } from "react";
import axios from "axios";

function Companies() {

const [companies, setCompanies] =useState([]);
const [appliedCompanies, setAppliedCompanies] = useState([]);
const [search, setSearch] = useState("");
  const handleApply = async (companyId) => {
    try {

      await axios.post(
        "http://localhost:5000/api/applications/apply",
        {
          student_id: 3,
          company_id: companyId
        }
      );

      setAppliedCompanies([
  ...appliedCompanies,
  companyId
]);

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
 console.log(res.data);
        setCompanies(res.data);
       

      } catch (error) {
  console.log("Status:", error.response?.status);
  console.log("Data:", error.response?.data);
  alert(error.response?.data?.message || "Something went wrong");
}
    };

    fetchCompanies();

  }, []);

  return (
    <div className="p-6">

     <h1 className="text-3xl font-bold mb-2">
  Available Companies 🚀
</h1>

<p className="text-gray-500 mb-6">
  Browse all active placement opportunities.
</p>
<input
  type="text"
  placeholder="Search Company..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full mb-6 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
      <div className="grid md:grid-cols-2 gap-4">

      {companies
  .filter((company) =>
    company.company_name
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((company) => (

          <div
            key={company.id}
           className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
          >

          <h2 className="text-2xl font-bold text-blue-700">
  {company.company_name}
</h2>

<p className="mt-3">
  💼 <strong>Role:</strong> {company.role}
</p>

<p>
  💰 <strong>Package:</strong> {company.package} LPA
</p>

<p>
  🎓 <strong>Minimum CGPA:</strong> {company.eligibility_cgpa}
</p>

           <button
  onClick={() => handleApply(company.id)}
  disabled={appliedCompanies.includes(company.id)}
  className={`mt-5 w-full py-2 rounded-lg text-white transition ${
    appliedCompanies.includes(company.id)
      ? "bg-green-600 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  {appliedCompanies.includes(company.id)
    ? "Applied ✓"
    : "Apply"}
</button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Companies;