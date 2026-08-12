import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
console.log("Profile component loaded");
  const [profile, setProfile] = useState({});
  const [resume, setResume] = useState(null);

  const token = localStorage.getItem("token");

  const fetchProfile = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/students/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("API Response:", res.data);
console.log("Resume:", res.data.resume);

      setProfile(res.data);

    } catch (err) {
      console.log(err);
    }

  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const uploadResume = async () => {

    if (!resume) {
      alert("Select Resume First");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {

      await axios.post(
        `http://localhost:5000/api/students/upload/${profile.id}`,
        formData
      );

      alert("Resume Uploaded");

      fetchProfile();

    } catch (err) {
      console.log(err);
    }

  };


  return (

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        My Profile
      </h1>

      <div className="bg-white shadow rounded p-6 max-w-xl">

        <p><b>Name:</b> {profile.name}</p>

        <p><b>Email:</b> {profile.email}</p>

        <p><b>Branch:</b> {profile.branch}</p>

        <p><b>Year:</b> {profile.year}</p>

        <p><b>CGPA:</b> {profile.cgpa}</p>

       <input
  type="file"
  className="mt-6"
  onChange={(e) => setResume(e.target.files[0])}
/>

<button
  onClick={uploadResume}
  className="bg-green-600 text-white px-5 py-2 rounded mt-4"
>
  Upload Resume
</button>

{profile.resume && (

  <div className="mt-6">

    <p className="font-semibold">
      Uploaded Resume
    </p>

    <div className="flex gap-4 mt-2">

      <a
        href={`http://localhost:5000/uploads/${profile.resume}`}
        target="_blank"
        rel="noreferrer"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        View Resume
      </a>

      <a
        href={`http://localhost:5000/uploads/${profile.resume}`}
        download
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Download Resume
      </a>

    </div>

  </div>

)}

      </div>

    </div>

  );
}

export default Profile;