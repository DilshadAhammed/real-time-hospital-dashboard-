 // /api/doctors

const express = require("express");
const Doctor = require("../models/Doctor");
const { hospitalAuth, adminAuth } = require("../middleware/authMiddleware");
const orMiddleware = require("../middleware/orMiddleware");
const router = express.Router();

// Endpoint to get doctors based on location, department, and hospital
router.get("/", async (req, res) => {
  const { location, specialty } = req.query;

  try {
    // Base match condition for fields in `doctors`
    const doctorMatchConditions = { availability: true };

    if (specialty) {
      doctorMatchConditions.specialty = { $regex: specialty, $options: "i" };
    }

    // Aggregation pipeline
    const doctors = await Doctor.aggregate([
      {
        $match: doctorMatchConditions,
      },
      {
        $lookup: {
          from: "hospitals",
          localField: "hospital",
          foreignField: "_id",
          as: "hospital",
        },
      },
      {
        $unwind: { path: "$hospital", preserveNullAndEmptyArrays: true },
      },
      {
        $match: location
          ? { "hospital.location": { $regex: location, $options: "i" } }
          : {}, // This additional match condition applies only if `location` is provided
      },
      {
        $project: {
          "hospital.password": 0, // Hide hospital password if stored
          "hospital.__v": 0, // Hide any version keys
        },
      },
    ]);

    res.json(doctors);
    // console.log("Filtered doctors:", doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Error fetching doctors", error });
  }
});

// GET all doctors
router.get("/allDoctors", adminAuth, async (req, res ) =>{
  try {
    const doctors = await Doctor.find().populate('hospital');
    // console.log(doctors);    
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctors", error });
  }
});

// to delete a doctor
router.delete("/:id", orMiddleware(hospitalAuth, adminAuth), async (req, res) => {
  const { id } = req.params;
    try {
      await Doctor.findByIdAndDelete(id);
      res.json({ message: "Hospital deleted" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
});

// for hospital dashboard
router.get("/hospital", hospitalAuth, async (req, res) => {
  const hospitalId = req.user.id;
  try {
    const doctors = await Doctor.find({ hospital: hospitalId });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctors", error });
  }
});

module.exports = router;
