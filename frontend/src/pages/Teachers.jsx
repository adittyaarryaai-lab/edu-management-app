import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import AddTeacherForm from "../components/AddTeacherForm";
import TeacherTable from "../components/TeacherTable";
import { getTeachers } from "../api/teacherApi";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);

  const load = async () => {
    const res = await getTeachers();
    setTeachers(res.data.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <MainLayout>
      <h2>Teachers</h2>
      <AddTeacherForm onCreated={load} />
      <TeacherTable teachers={teachers} />
    </MainLayout>
  );
};

export default Teachers;
