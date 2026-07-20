import DashboardCharts from "../components/DashboardCharts";
import { useState, useEffect } from "react";

import axios from "axios";

function AdminDashboard() {

  const [companyName, setCompanyName] = useState("");
  const [companies, setCompanies] = useState([]);
  const [role, setRole] = useState("");
  const [packageValue, setPackageValue] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [editId, setEditId] = useState(null);
  const [stats, setStats] = useState({
  students: 0,
  companies: 0,
  applications: 0,
  accepted: 0,
  rejected: 0
});

  const handleSubmit = async (e) => {

    e.preventDefault();
try {

  if (editId) {

    await axios.put(
      `http://localhost:5000/api/companies/${editId}`,
      {
        company_name: companyName,
        role,
        package: packageValue,
        eligibility_cgpa: cgpa
      }
    );

    alert("Company Updated Successfully!");

    setEditId(null);

  } else {

    await axios.post(
      "http://localhost:5000/api/companies",
      {
        company_name: companyName,
        role,
        package: packageValue,
        eligibility_cgpa: cgpa
      }
    );

    alert("Company Added Successfully!");

  }

  fetchCompanies();

  setCompanyName("");
  setRole("");
  setPackageValue("");
  setCgpa("");

} catch (err) {

  console.log(err);

  alert("Error");

}

  };
  const fetchCompanies = async () => {

  try {

    const res = await axios.get(
      "http://localhost:5000/api/companies"
    );

    setCompanies(res.data);

  } catch (err) {

    console.log(err);

  }

};
const fetchStats = async () => {

  try {

    const res = await axios.get(
      "http://localhost:5000/api/admin/stats"
    );

    setStats(res.data);

  } catch (err) {

    console.log(err);

  }

};

useEffect(() => {

  fetchCompanies();
    fetchStats();

}, []);
const handleDelete = async (id) => {

  try {

    await axios.delete(
      `http://localhost:5000/api/companies/${id}`
    );

    alert("Company Deleted");

    fetchCompanies();

  } catch (err) {

    console.log(err);

  }

};

  return (

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">

  <div className="bg-blue-600 text-white p-5 rounded-xl shadow">
    <h2 className="text-lg">Students</h2>
    <p className="text-3xl font-bold">
      {stats.students}
    </p>
  </div>

  <div className="bg-green-600 text-white p-5 rounded-xl shadow">
    <h2 className="text-lg">Companies</h2>
    <p className="text-3xl font-bold">
      {stats.companies}
    </p>
  </div>

  <div className="bg-purple-600 text-white p-5 rounded-xl shadow">
    <h2 className="text-lg">Applications</h2>
    <p className="text-3xl font-bold">
      {stats.applications}
    </p>
  </div>

  <div className="bg-emerald-600 text-white p-5 rounded-xl shadow">
    <h2 className="text-lg">Accepted</h2>
    <p className="text-3xl font-bold">
      {stats.accepted}
    </p>
  </div>

  <div className="bg-red-600 text-white p-5 rounded-xl shadow">
    <h2 className="text-lg">Rejected</h2>
    <p className="text-3xl font-bold">
      {stats.rejected}
    </p>
  </div>

</div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 max-w-lg space-y-4"
      >

        <input
          className="border p-3 rounded w-full"
          placeholder="Company Name"
          value={companyName}
          onChange={(e)=>setCompanyName(e.target.value)}
        />

        <input
          className="border p-3 rounded w-full"
          placeholder="Role"
          value={role}
          onChange={(e)=>setRole(e.target.value)}
        />

        <input
          className="border p-3 rounded w-full"
          placeholder="Package (LPA)"
          value={packageValue}
          onChange={(e)=>setPackageValue(e.target.value)}
        />

        <input
          className="border p-3 rounded w-full"
          placeholder="Minimum CGPA"
          value={cgpa}
          onChange={(e)=>setCgpa(e.target.value)}
        />
<button
  className="bg-blue-600 text-white px-6 py-3 rounded w-full hover:bg-blue-700"
>
  {editId ? "Update Company" : "Add Company"}
</button>

      </form>
      <h2 className="text-2xl font-bold mt-10 mb-4">
  All Companies
</h2>

<table className="w-full border">

  <thead className="bg-gray-200">

    <tr>

      <th className="p-3">Company</th>

      <th>Role</th>

      <th>Package</th>

      <th>CGPA</th>
      <th>Action</th>

    </tr>

  </thead>

  <tbody>

    {companies.map((company) => (

      <tr
        key={company.id}
        className="border-t text-center"
      >

        <td className="p-3">
          {company.company_name}
        </td>

        <td>
          {company.role}
        </td>

        <td>
          {company.package} LPA
        </td>

        <td>
          {company.eligibility_cgpa || company.min_cgpa}
        </td>
  <td className="space-x-2">

<button
  onClick={() => {

    setEditId(company.id);

    setCompanyName(company.company_name);

    setRole(company.role);

    setPackageValue(company.package);

    setCgpa(company.eligibility_cgpa);

  }}
  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
>
  Edit
</button>

  <button
    onClick={() => handleDelete(company.id)}
    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
  >
    Delete
  </button>

</td>

      </tr>

    ))}

  </tbody>

</table>
<DashboardCharts />
    </div>
  );
}

export default AdminDashboard;