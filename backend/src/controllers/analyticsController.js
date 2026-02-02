const Marks = require("../models/Marks.model");

exports.classPerformance = async (req, res) => {
  try {
    const { className } = req.query;

    const data = await Marks.aggregate([
      {
        $lookup: {
          from: "exams",
          localField: "examId",
          foreignField: "_id",
          as: "exam"
        }
      },
      { $unwind: "$exam" },
      {
        $match: {
          "exam.className": className
        }
      },
      {
        $group: {
          _id: "$studentId",
          avgMarks: {
            $avg: {
              $sum: "$subjectMarks.marks"
            }
          }
        }
      }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Analytics failed" });
  }
};
