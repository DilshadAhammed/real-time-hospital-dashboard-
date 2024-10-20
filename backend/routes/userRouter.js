const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", asyncHandler(async (req, res) => {
    const {
      name,
      district,
      address,
      t_local_body,
      n_local_body,
      mobile,
      email,
      password,
    } = req.body;
    const userExists = await User.findOne({ email });
    if (
      !name ||
      !district ||
      !address ||
      !t_local_body ||
      !n_local_body ||
      !mobile ||
      !email ||
      !password
    ) {
      res.status(400);
      throw new Error("Invalid user data");
    }
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      district,
      address,
      t_local_body,
      n_local_body,
      mobile,
      email,
      password: hashedPassword,
    });
    if (!user) {
      res.status(400);
      throw new Error("Invalid user data");
    }
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  })
);

//portected path
router.get("/dashboard", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Welcome to dashboard",
    id: `${req.user.id}`,
  });
});

//generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = router;
