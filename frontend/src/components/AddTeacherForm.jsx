import { useState } from "react";
import { createTeacher } from "../api/teacherApi";

const AddTeacherForm = ({ onCreated }) => {
  const [form, setForm] = useState({
    firstName: "",
    subject: "",
    experienceYears: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await createTeacher(form);
    setForm({ firstName: "", subject: "", experienceYears: "" });
    onCreated();
  };

  return (
    <form onSubmit={submit}>
      <h3>Add Teacher</h3>

      <input
        name="firstName"
        placeholder="Name"
        value={form.firstName}
        onChange={handleChange}
        required
      />

      <input
        name="subject"
        placeholder="Subject"
        value={form.subject}
        onChange={handleChange}
      />

      <input
        name="experienceYears"
        placeholder="Experience"
        value={form.experienceYears}
        onChange={handleChange}
      />

      <button>Add Teacher</button>
    </form>
  );
};

export default AddTeacherForm;
