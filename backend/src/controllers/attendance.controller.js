const Attendance = require("../models/Attendance.model");

/* ================= MARK ATTENDANCE (UPSERT SAFE) ================= */

exports.markAttendance = async (req, res) => {
  try {
    const { className, section, date, records } = req.body;

    if (!className || !date || !records || records.length === 0) {
      return res.status(400).json({ message: "Invalid attendance data" });
    }

    const instituteId = req.user.instituteId;
    const markedBy = req.user.userId;

    /* Convert records to bulk operations */
    const ops = records.map((r) => ({
      updateOne: {
        filter: {
          instituteId,
          studentId: r.studentId,
          date
        },
        update: {
          instituteId,
          studentId: r.studentId,
          className,
          section,
          date,
          status: r.status,
          markedBy
        },
        upsert: true
      }
    }));

    await Attendance.bulkWrite(ops);

    res.status(200).json({
      success: true,
      message: "Attendance marked successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Attendance marking failed" });
  }
};

/* ================= GET ATTENDANCE ================= */

exports.getAttendance = async (req, res) => {
  try {
    const { className, section, date } = req.query;

    const query = {
      instituteId: req.user.instituteId
    };

    if (className) query.className = className;
    if (section) query.section = section;
    if (date) query.date = date;

    const attendance = await Attendance.find(query)
      .populate("studentId", "firstName lastName rollNumber")
      .populate("markedBy", "name role")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      attendance
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch attendance" });
  }
};
