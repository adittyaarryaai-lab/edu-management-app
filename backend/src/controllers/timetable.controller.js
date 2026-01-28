const Timetable = require("../models/Timetable.model");

exports.createTimetable = async (req, res) => {
    try {
        const { className, section, day, period, subject, teacherId } = req.body;

        if (!className || !day || !period || !subject || !teacherId) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        const entry = await Timetable.create({
            instituteId: req.user.instituteId,
            className,
            section,
            day,
            period,
            subject,
            teacherId,
        });

        res.status(201).json({
            success: true,
            message: "Timetable entry created",
            entry,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Timetable slot already exists",
            });
        }

        res.status(500).json({ message: "Timetable creation failed" });
    }
};
exports.getTimetable = async (req, res) => {
    try {
        const { className, section, day } = req.query;

        const query = {
            instituteId: req.user.instituteId,
        };

        if (className) query.className = className;
        if (section) query.section = section;
        if (day) query.day = day;

        const timetable = await Timetable.find(query)
            .populate("teacherId", "name subjects");

        res.json({
            success: true,
            timetable,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch timetable" });
    }
};
