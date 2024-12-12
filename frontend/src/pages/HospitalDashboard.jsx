import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorRegister from "../components/DoctorRegister";


const HospitalDashboard = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const token = localStorage.getItem('hospital-token'); // Assuming token is stored in localStorage

  // Fetch doctors in the hospital on component mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  const toggleAvailability = async ({id, status}) => {
    try {
      const updatedStatus = !status;
      await axios.put(`/api/doctor/updateAvailability/${id}`, { availability: updatedStatus }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('/api/doctors/hospital', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Hospital Dashboard</h1>

      {/* Add New Doctor Form */}
      <button onClick={togglePopup} className = "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">Add Doctors</button>
      {showPopup && <DoctorRegister onClose={togglePopup} />}

      {/* List of Doctors */}
      <div>
        <h2 className="text-xl font-semibold mb-4">List of Doctors</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <li key={doctor._id} className="border border-gray-200 p-4 rounded-lg shadow-md">
              <p><strong>Name:</strong> {doctor.name}</p>
              <p><strong>Email:</strong> {doctor.email}</p>
              <p><strong>Specialty:</strong> {doctor.specialty}</p>
              <p><strong>Availability:</strong> {doctor.availability ? 'Available' : 'Unavailable'}</p>
              <button
                onClick={() => toggleAvailability({id: doctor._id, status: doctor.availability })}
                className={`mt-4 px-4 py-2 rounded ${
                  doctor.availability ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                } text-white`}
              >{doctor.availability ? 'Mark as Unavailable' : 'Mark as Available'}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HospitalDashboard;
