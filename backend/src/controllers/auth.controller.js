const User = require("../models/User.model");
const InstituteSettings = require("../models/InstituteSettings");
const validatePassword = require("../utils/passwordValidator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =========================
// REGISTER
// =========================
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, instituteId } = req.body;

    // Basic validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    // SUPER_ADMIN does not need instituteId
    if (role !== "SUPER_ADMIN" && !instituteId) {
      return res
        .status(400)
        .json({ message: "Institute ID is required" });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔐 Password policy check (Day 13)
    if (role !== "SUPER_ADMIN") {
      const settings = await InstituteSettings.findOne({ instituteId });

      if (settings?.passwordPolicy) {
        const error = validatePassword(password, settings.passwordPolicy);
        if (error) {
          return res.status(400).json({ message: error });
        }
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      instituteId: role === "SUPER_ADMIN" ? null : instituteId,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

// =========================
// LOGIN
// =========================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        instituteId: user.instituteId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        instituteId: user.instituteId,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Login failed" });
  }
};
