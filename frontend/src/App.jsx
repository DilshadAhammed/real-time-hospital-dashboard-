import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import Test from './components/Test';
import Login from './pages/Login'
import UserDash from './pages/UserDash';
import DoctorDash from './pages/DoctorDash';
import HospitalDashboard from './pages/HospitalDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Landing from './pages/Landing';
import store from './redux/store';

function App() {
  return (
      <Router>
        <Provider store={store}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/view" element={<UserDash />} />
            <Route path="/doctor" element={<DoctorDash />} />
            <Route path="/hospital" element={<HospitalDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </div>
        </Provider>
      </Router>
  );
}

export default App
