const User = require("../models/User.model");

exports.createParent = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Parent already exists" });
    }

    const parent = await User.create({
      name,
      email,
      phone,
      password,
      role: "PARENT",
      instituteId: req.user.instituteId,
    });

    res.status(201).json({
      success: true,
      message: "Parent created successfully",
      parent,
    });
  } catch (error) {
    res.status(500).json({ message: "Parent creation failed" });
  }
};
