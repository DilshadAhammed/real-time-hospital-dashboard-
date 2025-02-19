// /api/hospitals

const express = require("express");
const router = express.Router();
const Hospital = require("../models/hospitalModel");
const { adminAuth, hospitalAuth } = require("../middleware/authMiddleware");
const orMiddleware = require("../middleware/orMiddleware");
const axios = require("axios")


// Haversine formula for calculating distance
const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

// Route to get nearby hospitals
router.get("/nearby", async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: "Latitude and longitude required." });
  }

  try {
    const hospitals = await Hospital.find(); // Fetch all hospitals from the DB

    // Calculate distance and filter nearby hospitals
    const nearbyHospitals = hospitals.filter((hospital) => {
      const distance = getDistanceFromLatLonInKm(
        latitude,
        longitude,
        hospital.latitude,
        hospital.longitude
      );      
      return distance <= 10; // Example: Hospitals within 10km radius
    });
    
    res.json(nearbyHospitals);
  } catch (error) {
    console.error("Error fetching nearby hospitals:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET all hospitals
router.get("/", adminAuth, async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// POST new hospital
// router.post("/", adminAuth, async (req, res) => {
//   const { name, location, email, password } = req.body;
//   try {
//     let hospital = await Hospital.findOne({ email });
//     if (hospital)
//       return res.status(400).json({ message: "hospital already exists" });

//     hospital = new Hospital({ name, location, email, password });
//     await hospital.save();
//     res.status(201).json({ message: "Hospital registered successfully!" });
//   } catch (error) {
//     res.status(400).json({ message: "Error registering hospital.", error });
//   }
// });

router.post("/", adminAuth, async (req, res) => {
  const { name, location, latitude, longitude, email, password } = req.body;

  try {
    // Check if a hospital with the same email already exists
    let hospital = await Hospital.findOne({ email });
    if (hospital)
      return res.status(400).json({ message: "Hospital already exists" });

    // Create a new hospital with the provided data
    const newHospital = new Hospital({
      name,
      email,
      location, // Location name (e.g., "XYZ Hospital, City")
      latitude, // Latitude from the frontend
      longitude, // Longitude from the frontend
      password, // Ensure password is hashed in production
    });

    await newHospital.save();
    res.status(201).json({ message: "Hospital registered successfully" });
  } catch (error) {
    console.error("Error registering hospital:", error);
    res.status(500).json({ message: "Failed to register hospital" });
  }
});


// PUT update hospital
router.put("/:id", orMiddleware(adminAuth, hospitalAuth), async (req, res) => {
  const { id } = req.params;
  const { name, location } = req.body;
  try {
    const updatedHospital = await Hospital.findByIdAndUpdate(
      id,
      { name, location },
      { new: true }
    );
    res.json(updatedHospital);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// DELETE a hospital
router.delete("/:id", orMiddleware(adminAuth, hospitalAuth), async (req, res) => {
    const { id } = req.params;
    try {
      await Hospital.findByIdAndDelete(id);
      res.json({ message: "Hospital deleted" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
);

module.exports = router;
