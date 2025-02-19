import { useState, useEffect } from "react";
import axios from "axios";
import { Search, MapPin, Stethoscope, AlertCircle, Loader2 } from "lucide-react";
import NearbyHospitals from "../components/NearbyHospitals";

const UserDash = () => {
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch doctors based on search criteria
  const fetchDoctors = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`/api/doctors`, {
        params: { location, specialty },
      });
      setDoctors(response.data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError("Failed to load doctors. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch when location or specialty changes
  useEffect(() => {
    if (location || specialty) fetchDoctors();
  }, [location, specialty]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-6 flex items-center justify-center">
        <Stethoscope className="mr-2 text-blue-500" /> Doctor Availability
      </h1>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-x-4 md:space-y-0 mb-6">
        <div className="relative w-full md:w-1/3">
          <MapPin className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-300 pl-10 p-2 rounded w-full focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Enter Specialty"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="border border-gray-300 pl-10 p-2 rounded w-full focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <button
          onClick={fetchDoctors}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition focus:outline-none focus:ring focus:ring-blue-300 flex items-center justify-center"
        >
          <Search className="mr-2" /> Search
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-5">
          <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-md mt-4 flex items-center">
          <AlertCircle className="mr-2" />
          {error}
        </div>
      )}

      {/* Doctor List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading && doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div key={doctor._id} className="p-5 bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-700">{doctor.name}</h2>
              <p className="text-gray-500">{doctor.specialty}</p>
              <span
                className={`mt-2 inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                  doctor.availability ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                }`}
              >
                {doctor.availability ? "Available" : "Not Available"}
              </span>
              <p className="text-gray-400 text-xs mt-2">{doctor.hospital.location}</p>
              <p className="text-gray-400 text-xs">Hospital: {doctor.hospital.name}</p>
            </div>
          ))
        ) : (
          !loading && <NearbyHospitals />
        )}
      </div>
    </div>
  );
};

export default UserDash;
