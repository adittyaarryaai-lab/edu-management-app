const Class = require("../models/Class.model");

exports.createClass = async (req, res) => {
  try {
    const { name, section, classTeacher } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Class name is required" });
    }

    const newClass = await Class.create({
      instituteId: req.user.instituteId,
      name,
      section,
      classTeacher,
    });

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      class: newClass,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Class already exists",
      });
    }
    res.status(500).json({ message: "Failed to create class" });
  }
};

exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find({
      instituteId: req.user.instituteId,
    }).populate("classTeacher", "name");

    res.json({
      success: true,
      classes,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch classes" });
  }
};
