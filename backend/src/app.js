const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", require("./routes/health.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/protected", require("./routes/protected.routes"));
app.use("/api/institutes", require("./routes/institute.routes"));
app.use("/api/students", require("./routes/student.routes"));
app.use("/api/teachers", require("./routes/teacher.routes"));
app.use("/api/attendance", require("./routes/attendance.routes"));
app.use("/api/timetable", require("./routes/timetable.routes"));
app.use("/api/exams", require("./routes/exam.routes"));
app.use("/api/marks", require("./routes/marks.routes"));
app.use("/api/classes", require("./routes/class.routes"));
app.use("/api/fees", require("./routes/fees.routes"));
app.use("/api/parents", require("./routes/parent.routes"));
app.use("/api/notifications", require("./routes/notification.routes"));

module.exports = app;
