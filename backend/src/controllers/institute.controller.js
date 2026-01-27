const Institute = require("../models/Institute.model");
const User = require("../models/User.model");

exports.createInstitute = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const institute = await Institute.create({
      name,
      email,
      phone,
      address,
    });

    // Link institute to creator user
    await User.findByIdAndUpdate(req.user.userId, {
      instituteId: institute._id,
    });

    res.status(201).json({
      success: true,
      message: "Institute created successfully",
      institute,
    });
  } catch (error) {
    res.status(500).json({ message: "Institute creation failed" });
  }
};
