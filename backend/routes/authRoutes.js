const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");
const Hospital = require("../models/hospitalModel");
const { hospitalAuth } = require("../middleware/authMiddleware");
const Admin = require('../models/adminModel');
const router = express.Router();

// doctor register
router.post("/register-doctor", hospitalAuth, async (req, res) => {
  const { name, email, password, specialty } = req.body;

  try {
    // Check if doctor already exists
    let doctor = await Doctor.findOne({ email });
    if (doctor)
        return res.status(400).json({ message: "Doctor already exists" });
    // // Create new doctor
    doctor = new Doctor({
      name,
      email,
      password,
      specialty,
      hospital: req.user.id,
    });
    await doctor.save();
    
    res.status(201).json({ message: "Doctor registered successfully" });
  } catch (error) {
    console.log(error);    
    res.status(500).json({ message: "Server error", error});
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Doctor.findOne({ email }) || await Hospital.findOne({ email }) || await Admin.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    const isMatch = await bcrypt.compare(password, user.password);   
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." });

    res.json({ message: "Login successful!", token: generateToken({ id: user._id, role: user.role }), role: user.role });
  } catch (error) {
    console.log(error);    
    res.status(500).json({ message: "Server error", error });
  }
});

const generateToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  };
  

module.exports = router;
