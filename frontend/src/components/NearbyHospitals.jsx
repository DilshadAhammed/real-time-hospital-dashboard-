import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, MapPin, AlertTriangle } from "lucide-react";

const NearbyHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async (latitude, longitude) => {
      try {
        const response = await axios.get(`/api/hospitals/nearby`, {
          params: { latitude, longitude },
        });
        setHospitals(response.data);
      } catch (err) {
        console.error("Error fetching hospitals:", err);
        setError("Unable to fetch nearby hospitals.");
      } finally {
        setLoading(false);
      }
    };

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchHospitals(latitude, longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Please enable location access to view nearby hospitals.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center">
        <MapPin className="mr-2 text-blue-500" /> Nearby Hospitals
      </h1>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-5">
          <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-md mt-4 flex items-center">
          <AlertTriangle className="mr-2" />
          {error}
        </div>
      )}

      {/* Hospitals List */}
      {!loading && !error && hospitals.length > 0 ? (
        <ul className="mt-4 space-y-4">
          {hospitals.map((hospital) => (
            <li
              key={hospital.id}
              className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{hospital.name}</h2>
                <p className="text-gray-600">{hospital.location}</p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${hospital.latitude},${hospital.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 font-semibold hover:underline"
              >
                View on Map
              </a>
            </li>
          ))}
        </ul>
      ) : (
        !loading &&
        !error && <p className="text-gray-600 mt-4">No nearby hospitals found.</p>
      )}
    </div>
  );
};

export default NearbyHospitals;
