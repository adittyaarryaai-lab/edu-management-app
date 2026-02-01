import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getStudents } from "../api/studentApi";
import { markAttendance } from "../api/attendanceApi";

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState({});

  useEffect(() => {
    getStudents().then(r => setStudents(r.data));
  }, []);

  const set = (id, val) =>
    setStatus({ ...status, [id]: val });

  const submit = async () => {
    const today = new Date().toISOString().slice(0, 10);

    const records = students.map(s => ({
      studentId: s._id,
      className: s.className,
      date: today,
      status: status[s._id] || "absent"
    }));

    await markAttendance(records);
    alert("Attendance saved");
  };

  return (
    <MainLayout>
      <h2>Attendance</h2>

      {students.map(s => (
        <div key={s._id}>
          {s.firstName}
          <button onClick={() => set(s._id, "present")}>Present</button>
          <button onClick={() => set(s._id, "absent")}>Absent</button>
        </div>
      ))}

      <button onClick={submit}>Save Attendance</button>
    </MainLayout>
  );
};

export default Attendance;
