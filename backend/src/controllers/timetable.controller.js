const Timetable = require("../models/Timetable.model");

/* ================= CREATE TIMETABLE ================= */

exports.createTimetable = async (req, res) => {
    try {
        const {
            classId,
            day,
            periodNumber,
            subject,
            teacherId
        } = req.body;

        // ✅ Validation
        if (!classId || !day || !periodNumber || !subject || !teacherId) {
            return res.status(400).json({
                message: "Required fields missing",
            });
        }

        const entry = await Timetable.create({
            instituteId: req.user.instituteId,
            classId,
            day,
            periodNumber,
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

        console.error(error);
        res.status(500).json({
            message: "Timetable creation failed",
        });
    }
};

/* ================= GET TIMETABLE ================= */

exports.getTimetable = async (req, res) => {
    try {
        const { classId, day } = req.query;

        const query = {
            instituteId: req.user.instituteId,
        };

        if (classId) query.classId = classId;
        if (day) query.day = day;

        const timetable = await Timetable.find(query)
            .populate("teacherId", "name email");

        res.json({
            success: true,
            timetable,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch timetable",
        });
    }
};

