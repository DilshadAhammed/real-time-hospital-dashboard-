import { useState, useEffect } from "react";
import axios from "axios";

const UserDash = () => {
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [doctors, setDoctors] = useState([]);

  // Fetch doctors based on search criteria
  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`/api/doctors`, {
        params: { location, specialty },
      });
      setDoctors(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  // Trigger fetch when location or department changes
  useEffect(() => {
    if (location || specialty) fetchDoctors();
  }, [location, specialty]);

  return (
    
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Doctor Availability
      </h1>


      {/* Search Bar */}
      <div className="flex justify-center space-x-4 mb-6">
        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-gray-300 p-2 rounded w-1/3 focus:outline-none focus:ring focus:ring-blue-200"
        />
        <input
          type="text"
          placeholder="Enter Specialty"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="border border-gray-300 p-2 rounded w-1/3 focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          onClick={fetchDoctors}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Search
        </button>
      </div>

      {/* Doctor List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            
            <div key={doctor._id}className="border border-gray-200 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700">
                {doctor.name}
              </h2>
              <p className="text-gray-500">{doctor.specialty}</p>
              <p
                className={`mt-2 text-sm ${
                  doctor.availability ? "text-green-500" : "text-red-500"
                }`}
              >
                {doctor.availability ? "Available" : "Not Available"}
              </p>
              <p className="text-gray-400 text-xs">{doctor.hospital.location}</p>
              <p className="text-gray-400 text-xs">
                Hospital: {doctor.hospital.name}
              </p>
              {/* New line for hospital */}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No doctors found for the selected criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserDash;
