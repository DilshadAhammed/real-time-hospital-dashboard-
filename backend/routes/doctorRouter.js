// /api/doctor

const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Doctor = require('../models/Doctor'); // Adjust the path if necessary
const { doctorAuth, hospitalAuth, adminAuth } = require("../middleware/authMiddleware");
const orMiddleware = require("../middleware/orMiddleware");

// Fetch doctor data by ID (assuming ID comes from req.user after authentication)
router.get('/', doctorAuth, async (req, res) => {
  try {
    const doctorId = req.user.id; // Ensure user ID comes from auth middleware
    const doctor = await Doctor.findById(doctorId);
    
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor data' });
  }
});

// Update doctor availability status by doctor
router.put('/updateAvailability', doctorAuth, async (req, res) => {
  const { availability } = req.body;
  try {
    const doctorId = req.user.id;
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { availability },
      { new: true }
    );
    res.json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ message: 'Error updating availability status' });
  }
});

router.put('/updateAvailability/:id', orMiddleware(hospitalAuth, adminAuth), async (req, res) => {
  const { id } = req.params;
  const { availability } = req.body;
  try {
    console.log("6");
    const doctorId = id;
    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, { availability }, { new: true });
    console.log("7");
    res.json(updatedDoctor);
  } catch (error) {
    console.log("8");
    res.status(500).json({ message: 'Error updating availability status' });
  }
});


module.exports = router;
