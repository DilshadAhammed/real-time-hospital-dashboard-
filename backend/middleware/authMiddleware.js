const jwt = require("jsonwebtoken");
const Hospital = require("../models/hospitalModel"); // Assuming Hospital model is defined
const Doctor = require("../models/Doctor");

// Middleware to authenticate hospital superintendents
const hospitalAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Get the Bearer token

    if (!token) {
      return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden: Invalid token." });
      }
      
      // Check if the user is a hospital superintendent
      if (user.role !== "hospital") {
        console.log("Access denied. Not authorized as hospital.");
        // return res.status(403).json({ message: "Access denied. Not authorized as hospital." });
        return
      }

      req.user = user; // Attach hospital object to request
      next();
    });
  } catch (error) {
    console.error("Error in hospitalAuth middleware:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


const doctorAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Get the Bearer token

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided, authorization denied" });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res.status(403).send("Forbidden: Invalid token.");
      }
      // Check if the user is a hospital superintendent
      if (user.role !== "doctor") {
        // return res
        //   .status(403)
        //   .json({ message: "Access denied. Not authorized as doctor." });
        return
      }

      // Attach the hospital details to the request for later use


      req.user = user; // Attach hospital object to request
      next();
    });
  } catch (error) {
    console.error("Error in doctorAuth middleware:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const adminAuth = (req, res, next) => {
  try {

    const token = req.headers.authorization?.split(" ")[1]; // Get the Bearer token

    if (!token) {
      return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden: Invalid token." });
      }

      // Check if the user is an admin
      if (user.role !== "admin") {
        return
      }

      req.user = user; // Attach hospital object to request
      next();
    });
  } catch (error) {
    console.log("poda");
    console.error("Error in adminAuth middleware:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { hospitalAuth, doctorAuth, adminAuth };
