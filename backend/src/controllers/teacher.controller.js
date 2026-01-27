const Teacher = require("../models/Teacher.model");

exports.createTeacher = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            subjects,
            qualification,
            experienceYears,
        } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Teacher name is required" });
        }

        const teacher = await Teacher.create({
            instituteId: req.user.instituteId,
            name,
            email,
            phone,
            subjects,
            qualification,
            experienceYears,
        });

        res.status(201).json({
            success: true,
            message: "Teacher created successfully",
            teacher,
        });
    } catch (error) {
        res.status(500).json({ message: "Teacher creation failed" });
    }
};
exports.getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find({
            instituteId: req.user.instituteId,
        });

        res.json({
            success: true,
            teachers,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch teachers" });
    }
};
