import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2, Calendar, Clock, AlertTriangle } from "lucide-react";

const DoctorDash = () => {
  const [doctor, setDoctor] = useState(null);
  const [availability, setAvailability] = useState(false);
  const [availabilitySlots, setAvailabilitySlots] = useState([]);
  const [recurringAvailability, setRecurringAvailability] = useState([]);
  const [emergencyOverride, setEmergencyOverride] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("doctor-token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get("/api/doctor", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctor(response.data);
        setAvailability(response.data.availability);
        setAvailabilitySlots(response.data.availabilitySlots);
        setRecurringAvailability(response.data.recurringAvailability);
        setEmergencyOverride(response.data.emergencyOverride);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctorData();
  }, []);

  // Toggle Availability
  const toggleAvailability = async () => {
    try {
      const updatedStatus = !availability;
      await axios.put(
        "/api/doctor/updateAvailability",
        { availability: updatedStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAvailability(updatedStatus);
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  // Toggle Emergency Override
  const toggleEmergencyOverride = async () => {
    try {
      const updatedStatus = !emergencyOverride;
      await axios.put(
        "/api/doctor/updateEmergencyOverride",
        { emergencyOverride: updatedStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEmergencyOverride(updatedStatus);
    } catch (error) {
      console.error("Error updating emergency override:", error);
    }
  };

  if (loading) return <div className="flex justify-center py-10"><Loader2 className="animate-spin h-8 w-8 text-blue-500" /></div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Doctor Dashboard</h1>
      <p className="text-lg text-gray-700">Welcome, <span className="font-semibold">{doctor.name}</span></p>
      <p className="text-gray-600 mb-4">Specialty: {doctor.specialty}</p>

      {/* Availability Toggle */}
      <div className="flex items-center space-x-2">
        <p className="text-gray-700">Status:</p>
        <span className={`text-lg font-medium ${availability ? 'text-green-500' : 'text-red-500'}`}>
          {availability ? "Available" : "Unavailable"}
        </span>
      </div>
      <button
        onClick={toggleAvailability}
        className={`mt-3 px-4 py-2 rounded ${availability ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
      >
        {availability ? "Mark as Unavailable" : "Mark as Available"}
      </button>

      {/* Emergency Override */}
      <div className="mt-6 flex items-center space-x-2">
        <AlertTriangle className="text-yellow-500" />
        <p className="text-gray-700">Emergency Override:</p>
        <span className={`text-lg font-medium ${emergencyOverride ? 'text-red-500' : 'text-green-500'}`}>
          {emergencyOverride ? "Unavailable" : "Active"}
        </span>
      </div>
      <button
        onClick={toggleEmergencyOverride}
        className="mt-3 px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white"
      >
        {emergencyOverride ? "Disable Emergency Override" : "Enable Emergency Override"}
      </button>

      {/* Availability Slots */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Calendar className="mr-2 text-blue-500" /> Scheduled Availability
        </h2>
        {availabilitySlots.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {availabilitySlots.map((slot, index) => (
              <li key={index} className="p-3 bg-gray-100 rounded-md flex justify-between">
                <span>{slot.date} | {slot.startTime} - {slot.endTime}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 mt-2">No scheduled availability.</p>
        )}
      </div>

      {/* Recurring Availability */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Clock className="mr-2 text-blue-500" /> Recurring Availability
        </h2>
        {recurringAvailability.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {recurringAvailability.map((slot, index) => (
              <li key={index} className="p-3 bg-gray-100 rounded-md flex justify-between">
                <span>{slot.day} | {slot.startTime} - {slot.endTime}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 mt-2">No recurring availability set.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorDash;
