import React, { useState } from "react";
import Hospitals from "../components/Hospitals";
import DoctorsList from '../components/DoctorsList';
import HospitalRegister from "../components/HospitalRegister";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("hospitals"); // Default tab
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-xl font-semibold mb-8">Admin Dashboard</h2>

        <nav className="flex flex-col space-y-4">
          <button
            onClick={() => setActiveTab("hospitals")}
            className={`p-2 text-left ${
              activeTab === "hospitals" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            Hospitals
          </button>
          <button
            onClick={() => setActiveTab("doctors")}
            className={`p-2 text-left ${
              activeTab === "doctors" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            Doctors
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {showPopup && <HospitalRegister onClose={togglePopup} />}

        {/* Display content based on activeTab */}
        <div className="mt-6">
          {activeTab === "hospitals" && (
            <>
              <button
                onClick={togglePopup}
                className="absolute top-14 right-6 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 mt-4"
              >
                Add Hospital
              </button>
              <Hospitals />
            </>
          )}
          {activeTab === "doctors" && <DoctorsList />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
