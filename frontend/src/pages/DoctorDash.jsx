import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorDash = () => {
  const [doctor, setDoctor] = useState(null);
  const [availability, setAvailability] = useState(false);
  const token = localStorage.getItem("doctor-token")
  const navigate = useNavigate();

  // Fetch doctor data on mount
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get('/api/doctor', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }); // Adjust endpoint as needed
        
        setDoctor(response.data);
        setAvailability(response.data.availability);
      } catch (error) {
        console.log("Error fetching doctor data:", error);
      }
    };
    fetchDoctor();
  }, []);

  // Handle availability toggle
  const toggleAvailability = async () => {
    try {
      const updatedStatus = !availability;
      await axios.put('/api/doctor/updateAvailability', { availability: updatedStatus }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAvailability(updatedStatus);
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  if (!doctor) return <p>Loading...</p>;

  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Doctor Dashboard</h1>
      <p className="text-lg text-gray-700">Welcome, {doctor.name}</p>
      <p className="text-gray-600 mb-4">Specialty: {doctor.specialty}</p>

      <div className="flex items-center space-x-2">
        <p className="text-gray-700">Status:</p>
        <span className={`text-lg font-medium ${availability ? 'text-green-500' : 'text-red-500'}`}>
          {availability ? 'Available' : 'Unavailable'}
        </span>
      </div>

      <button
        onClick={toggleAvailability}
        className={`mt-4 px-4 py-2 rounded ${
          availability ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
        } text-white`}
      >
        {availability ? 'Mark as Unavailable' : 'Mark as Available'}
      </button>
    </div>
  );
};

export default DoctorDash;
