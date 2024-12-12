import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('/api/auth/login', { email, password });
            const { role, token } = response.data;
            localStorage.setItem(`${role}-token`, token);
            if (role === 'doctor') navigate('/doctor/');
            else if (role === 'hospital') navigate('/hospital/');
            else if (role === 'admin') navigate('/admin/');
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">Login</button>
            </form>
        </div>
    );
};

export default Login;
