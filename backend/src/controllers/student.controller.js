const Student = require("../models/Student.model");

exports.createStudent = async (req, res) => {
    try {
        const { name, className, email, phone, rollNumber, section } = req.body;

        if (!name || !className) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        const student = await Student.create({
            instituteId: req.user.instituteId,
            name,
            email,
            phone,
            rollNumber,
            className,
            section,
        });

        res.status(201).json({
            success: true,
            message: "Student created successfully",
            student,
        });
    } catch (error) {
        res.status(500).json({ message: "Student creation failed" });
    }
};
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find({
            instituteId: req.user.instituteId,
        });

        res.json({
            success: true,
            students,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch students" });
    }
};
