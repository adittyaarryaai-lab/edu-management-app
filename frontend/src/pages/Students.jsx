import { useEffect, useState } from "react";
import AddStudentForm from "../components/AddStudentForm";
import StudentTable from "../components/StudentTable";
import { getStudents } from "../api/studentApi";
import MainLayout from "../layouts/MainLayout";

const Students = () => {
  const [students, setStudents] = useState([]);

  const loadStudents = async () => {
    try {
      const res = await getStudents();

      // ✅ BACKEND RETURNS ARRAY DIRECTLY
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load students");
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <MainLayout>
      <h2>Students</h2>

      {/* CREATE */}
      <AddStudentForm onCreated={loadStudents} />

      <hr />

      {/* LIST + EDIT + DELETE */}
      <StudentTable
        students={students}
        onRefresh={loadStudents}
      />
    </MainLayout>
  );
};

export default Students;
