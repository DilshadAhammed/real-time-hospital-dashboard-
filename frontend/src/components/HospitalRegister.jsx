import React, { useState } from 'react';
import axios from 'axios';
import { toggleRefresh } from '../redux/refreshSlice';
import { useDispatch } from 'react-redux';


const HospitalRegister = ({onClose}) => {
    const dispatch = useDispatch();
    const [hospital, setHospital] = useState({
        name: '',
        email: '',
        location: '',
        password: '',
        confirmPassword: ''
    });
    const token = localStorage.getItem('admin-token')
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setHospital({ ...hospital, [e.target.name]: e.target.value });
    };

    const validate = () => {
        if (hospital.confirmPassword !== hospital.password) {
            setError("Passwords do not match");
            return false; // Indicate validation failed
        }
        setError(''); // Clear error if validation passes
        return true;
    };

      const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate before proceeding
        if (!validate()) return;
    
        try {
            await axios.post('/api/hospitals', hospital, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setHospital({ name: '', email: '', location: '', password: '', confirmPassword: '' });
            dispatch(toggleRefresh())
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 relative">
                {/* Close Button */}
                <button
                onClick={onClose}
                className="absolute top-6 right-5 text-gray-500 hover:text-gray-700"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    />
                </svg>
                </button>
                <h2 className="text-lg font-bold mb-4">Hospital Registration</h2>
                
                {error && <p className="p-2 text-red-500 bg-red-100 rounded">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hospital Name</label>
                        <input
                            type="text"
                            name="name"
                            value={hospital.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={hospital.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='flex space-x-2.5'>
                        <div className='w-1/2'>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={hospital.password}
                                onChange={handleChange}
                                required
                                className="w-full px-2 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className='w-1/2'>
                            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={hospital.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full px-2 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={hospital.location}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default HospitalRegister;
