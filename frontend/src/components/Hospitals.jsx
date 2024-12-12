// HospitalsList Component
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Alert from './Alert';
import ConfirmPopup from './ConfirmPopup'
import { useDispatch, useSelector } from "react-redux";
import { toggleRefresh, setRefresh } from "../redux/refreshSlice";

const Hospitals = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedHospitalId, setSelectedHospitalId] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const token = localStorage.getItem('admin-token');
  const [alertMessage, setAlertMessage] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.refresh.refresh);
  
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get('/api/hospitals', {
            headers: { Authorization: `Bearer ${token}` },
          });
        setHospitals(response.data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };
    fetchHospitals();
  },[refresh]);


  const handleDelete =  (id) => {
    setSelectedHospitalId(id);
    setIsPopupVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/hospitals/${selectedHospitalId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlertMessage('Hospital deleted successfully!');
    } catch (error) {
      setAlertMessage('Failed to delete hospital.');
    } finally {
      setIsPopupVisible(false);
      dispatch(toggleRefresh());
    }
  };

  return (
  
    <div className="overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Hospitals List</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b bg-gray-100 text-left text-gray-600 font-semibold">Hospital Name</th>
            <th className="py-2 px-4 border-b bg-gray-100 text-left text-gray-600 font-semibold">Location</th>
            <th className="py-2 px-4 border-b bg-gray-100 text-left text-gray-600 font-semibold">Email</th>
            <th className="py-2 px-4 border-b bg-gray-100 text-center text-gray-600 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map((hospital) => (
            <tr key={hospital._id} className="hover:bg-gray-50" >
              <td className="py-2 px-4 border-b text-gray-700">{hospital.name}</td>
              <td className="py-2 px-4 border-b text-gray-700">{hospital.location}</td>
              <td className="py-2 px-4 border-b text-gray-700">{hospital.email}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  className="bg-blue-500 text-white px-2 py-1 mr-2 rounded hover:bg-blue-600"
                  onClick={() => {/* Edit functionality */}}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(hospital._id)}
                >
                  Delete
                </button>
                {alertMessage && (
                  <Alert message={alertMessage} isError={error} onClose={()=> setAlertMessage('')} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isPopupVisible && (
        <ConfirmPopup
          title="Confirm Deletion"
          message="Are you sure you want to delete this hospital?"
          onConfirm={confirmDelete}
          onCancel={() => setIsPopupVisible(false)}
        />
      )}
    </div>
  );
};

export default Hospitals;
