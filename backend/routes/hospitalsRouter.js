// /api/hospitals

const express = require("express");
const router = express.Router();
const Hospital = require("../models/hospitalModel");
const { adminAuth, hospitalAuth } = require("../middleware/authMiddleware");
const orMiddleware = require("../middleware/orMiddleware");

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
router.post("/", adminAuth, async (req, res) => {
  const { name, location, email, password } = req.body;
  try {
    let hospital = await Hospital.findOne({ email });
    if (hospital)
      return res.status(400).json({ message: "hospital already exists" });

    hospital = new Hospital({ name, location, email, password });
    await hospital.save();
    res.status(201).json({ message: "Hospital registered successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Error registering hospital.", error });
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
