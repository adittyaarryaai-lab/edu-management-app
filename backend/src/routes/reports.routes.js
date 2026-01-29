const express = require("express");
const Attendance = require("../models/Attendance.model");
const Marks = require("../models/Marks.model");
const FeeInvoice = require("../models/FeeInvoice");
const ParentStudent = require("../models/ParentStudent");


const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();
// 🟢 Attendance Report (Admin)
router.get(
    "/attendance/class/:classId",
    authMiddleware,
    roleMiddleware(["INSTITUTE_ADMIN"]),
    async (req, res) => {
        try {
            const { startDate, endDate } = req.query;

            if (!startDate || !endDate) {
                return res.status(400).json({
                    message: "startDate and endDate are required",
                });
            }

            const report = await Attendance.aggregate([
                {
                    $match: {
                        instituteId: req.user.instituteId,
                        classId: req.params.classId,
                        date: { $gte: startDate, $lte: endDate },
                    },
                },
                {
                    $group: {
                        _id: {
                            studentId: "$studentId",
                            status: "$status",
                        },
                        count: { $sum: 1 },
                    },
                },
            ]);

            res.json(report);
        } catch (error) {
            res.status(500).json({ message: "Attendance report failed" });
        }
    }
);
// 🟢 Exam Performance Report (Admin)
router.get(
    "/exams/:examId/class/:classId",
    authMiddleware,
    roleMiddleware(["INSTITUTE_ADMIN"]),
    async (req, res) => {
        try {
            const report = await Marks.aggregate([
                {
                    $match: {
                        instituteId: req.user.instituteId,
                        examId: req.params.examId,
                    },
                },
                {
                    $group: {
                        _id: "$subject",
                        averageMarks: { $avg: "$marksObtained" },
                        maxMarks: { $first: "$maxMarks" },
                    },
                },
            ]);

            res.json(report);
        } catch (error) {
            res.status(500).json({ message: "Exam report failed" });
        }
    }
);
// 🟢 Fee Due Report (Admin)
router.get(
    "/fees/due",
    authMiddleware,
    roleMiddleware(["INSTITUTE_ADMIN"]),
    async (req, res) => {
        try {
            const dues = await FeeInvoice.find({
                instituteId: req.user.instituteId,
                status: { $ne: "PAID" },
            }).populate("studentId classId");

            res.json(dues);
        } catch (error) {
            res.status(500).json({ message: "Fee due report failed" });
        }
    }
);
// 🟢 Parent Dashboard Summary
router.get(
    "/parent/summary",
    authMiddleware,
    roleMiddleware(["PARENT"]),
    async (req, res) => {
        try {
            const links = await ParentStudent.find({
                parentId: req.user._id,
                instituteId: req.user.instituteId,
            });

            const studentIds = links.map((l) => l.studentId);

            const attendance = await Attendance.find({
                studentId: { $in: studentIds },
            });

            const fees = await FeeInvoice.find({
                studentId: { $in: studentIds },
            });

            res.json({ attendance, fees });
        } catch (error) {
            res.status(500).json({ message: "Parent summary failed" });
        }
    }
);
module.exports = router;
