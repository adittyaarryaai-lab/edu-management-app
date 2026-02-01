import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { saveTimetable } from "../api/timetableApi";
import { getTeachers } from "../api/teacherApi";

const days = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY"
];

const Timetable = () => {
  const [classId, setClassId] = useState("");
  const [day, setDay] = useState("");
  const [teachers, setTeachers] = useState([]); // ✅ always array

  const [periods, setPeriods] = useState([
    { periodNumber: 1, subject: "", teacherId: "" }
  ]);

  /* -------- LOAD TEACHERS -------- */
  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const res = await getTeachers();
        setTeachers(Array.isArray(res.data?.data) ? res.data.data : []);
      } catch (err) {
        console.error("Teacher load failed", err);
        setTeachers([]);
      }
    };

    loadTeachers();
  }, []);

  /* -------- PERIOD HANDLERS -------- */
  const updatePeriod = (index, field, value) => {
    const copy = [...periods];
    copy[index][field] = value;
    setPeriods(copy);
  };

  const addPeriod = () => {
    setPeriods([
      ...periods,
      {
        periodNumber: periods.length + 1,
        subject: "",
        teacherId: ""
      }
    ]);
  };

  /* -------- SAVE -------- */
  const submit = async () => {
    if (!classId || !day) {
      alert("Class and Day required");
      return;
    }

    try {
      await saveTimetable({
        classId,
        day,
        periods
      });

      alert("Timetable saved successfully");
    } catch (err) {
      alert("Save failed");
      console.error(err);
    }
  };

  return (
    <MainLayout>
      <h2>Timetable Management</h2>

      {/* ===== CLASS SELECT (1–12) ===== */}
      <select value={classId} onChange={e => setClassId(e.target.value)}>
        <option value="">Select Class</option>

        {Array.from({ length: 12 }, (_, i) => {
          const cls = i + 1;
          return (
            <option key={cls} value={`CLASS_${cls}`}>
              Class {cls}
            </option>
          );
        })}
      </select>

      {/* ===== DAY SELECT ===== */}
      <select value={day} onChange={e => setDay(e.target.value)}>
        <option value="">Select Day</option>
        {days.map(d => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <hr />

      {/* ===== PERIODS ===== */}
      {periods.map((p, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <b>Period {p.periodNumber}</b>
          <br />

          <input
            placeholder="Subject"
            value={p.subject}
            onChange={e => updatePeriod(i, "subject", e.target.value)}
          />

          <select
            value={p.teacherId}
            onChange={e => updatePeriod(i, "teacherId", e.target.value)}
          >
            <option value="">Select Teacher</option>

            {teachers.length === 0 && (
              <option disabled>No teachers found</option>
            )}

            {teachers.map(t => (
              <option key={t._id} value={t._id}>
                {t.firstName} {t.lastName}
              </option>
            ))}
          </select>
        </div>
      ))}

      <button onClick={addPeriod}>+ Add Period</button>
      <br /><br />
      <button onClick={submit}>Save Timetable</button>
    </MainLayout>
  );
};

export default Timetable;
