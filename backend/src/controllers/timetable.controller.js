const Timetable = require("../models/Timetable.model");

/* ================= SAVE / UPDATE TIMETABLE ================= */

exports.saveTimetable = async (req, res) => {
  try {
    const instituteId = req.user.instituteId;

    const { classId, day, periods } = req.body;

    if (!classId || !day) {
      return res.status(400).json({ message: "classId and day required" });
    }

    const timetable = await Timetable.findOneAndUpdate(
      {
        instituteId,
        classId,
        day
      },
      {
        instituteId,
        classId,
        day,
        periods
      },
      {
        upsert: true,
        new: true,
        runValidators: true
      }
    );

    res.json(timetable);

  } catch (err) {
    console.error("Timetable Save Error:", err);
    res.status(500).json({ message: "Timetable save failed" });
  }
};


/* ================= GET TIMETABLE BY CLASS ================= */

exports.getTimetable = async (req, res) => {
  try {
    const { className } = req.query;

    if (!className) {
      return res.status(400).json({
        message: "className is required",
      });
    }

    const timetable = await Timetable.find({
      instituteId: req.user.instituteId,
      className,
    }).sort({ day: 1 });

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
