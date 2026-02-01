import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { createExam } from "../api/examApi";

const Exams = () => {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");

  const submit = async () => {
    await createExam({ name, className });
    alert("Exam created");
  };

  return (
    <MainLayout>
      <h2>Create Exam</h2>

      <input
        placeholder="Exam Name"
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Class"
        onChange={e => setClassName(e.target.value)}
      />

      <button onClick={submit}>Create</button>
    </MainLayout>
  );
};

export default Exams;
