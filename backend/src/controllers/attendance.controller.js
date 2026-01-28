const Attendance = require("../models/Attendance.model");

exports.markAttendance = async (req, res) => {
    try {
        const { className, section, date, records } = req.body;

        if (!className || !date || !records || records.length === 0) {
            return res.status(400).json({ message: "Invalid attendance data" });
        }

        const attendance = await Attendance.create({
            instituteId: req.user.instituteId,
            className,
            section,
            date,
            markedBy: req.user.userId,
            records,
        });

        res.status(201).json({
            success: true,
            message: "Attendance marked successfully",
            attendance,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Attendance already marked for this class and date",
            });
        }

        res.status(500).json({ message: "Attendance marking failed" });
    }
};
exports.getAttendance = async (req, res) => {
    try {
        const { className, section, date } = req.query;

        const query = {
            instituteId: req.user.instituteId,
        };

        if (className) query.className = className;
        if (section) query.section = section;
        if (date) query.date = date;

        const attendance = await Attendance.find(query)
            .populate("records.studentId", "name rollNumber")
            .populate("markedBy", "name role");

        res.json({
            success: true,
            attendance,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch attendance" });
    }
};
