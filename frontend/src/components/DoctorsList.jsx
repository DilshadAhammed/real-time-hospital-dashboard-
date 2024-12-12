import { useState, useEffect } from 'react'
import axios from 'axios';
import Alert from './Alert';
import ConfirmPopup from './ConfirmPopup'
import { useDispatch, useSelector } from "react-redux";
import { toggleRefresh, setRefresh } from "../redux/refreshSlice";

function DoctorsList() {
  const [ doctors, setDoctors] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedHospitalId, setSelectedHospitalId] = useState(null);
  const token = localStorage.getItem("admin-token");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.refresh.refresh);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('/api/doctors/allDoctors', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };
    fetchDoctors();
    
    
  }, [refresh]);

  const handleDelete =  (id) => {
    setSelectedHospitalId(id);
    setIsPopupVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/doctors/${selectedHospitalId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlertMessage('Doctor deleted successfully!');
    } catch (error) {
      setAlertMessage('Failed to delete Doctor.');
      setError(true);
    } finally {
      setIsPopupVisible(false);
    }
  };

  const toggleAvailability = async ({id, status}) => {
    try {
      const updatedStatus = !status;
      await axios.put(`/api/doctor/updateAvailability/${id}`, { availability: updatedStatus }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(toggleRefresh());
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Hospitals List</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b bg-gray-100 text-left text-gray-600 font-semibold">Name</th>
            <th className="py-2 px-4 border-b bg-gray-100 text-left text-gray-600 font-semibold">Hospital</th>
            <th className="py-2 px-4 border-b bg-gray-100 text-left text-gray-600 font-semibold">Speciality</th>
            <th className="py-2 px-4 border-b bg-gray-100 text-left text-gray-600 font-semibold">Email</th>
            <th className="py-2 px-4 border-b bg-gray-100 text-center text-gray-600 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor._id} className="hover:bg-gray-50" >
              <td className="py-2 px-4 border-b text-gray-700">{doctor.name}</td>
              <td className="py-2 px-4 border-b text-gray-700">{doctor.hospital.name}</td>
              <td className="py-2 px-4 border-b text-gray-700">{doctor.specialty}</td>
              <td className="py-2 px-4 border-b text-gray-700">{doctor.email}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  className={`${
                    !doctor.availability ? 'bg-orange-600 hover:bg-orange-700' : 'bg-green-500 hover:bg-green-800'
                  } text-white px-2 py-1 mr-2 rounded `}
                  onClick={() => toggleAvailability({id: doctor._id, status: doctor.availability })}
                >
                  {doctor.availability ? "Available": "Not Available"}
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(doctor._id)}
                >
                  Delete
                </button>
                {alertMessage && (
                  <Alert message={alertMessage} isError = {error} onClose={()=> setAlertMessage('')} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isPopupVisible && (
        <ConfirmPopup
          title="Confirm Deletion"
          message="Are you sure you want to delete this Doctor?"
          onConfirm={confirmDelete}
          onCancel={() => setIsPopupVisible(false)}
        />
      )}
    </div>
  )
}

export default DoctorsList