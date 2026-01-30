import { useState } from "react";
import { createStudent } from "../api/studentApi";

const AddStudentForm = ({ onCreated }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    className: "",
    section: "",
    rollNumber: "",
    parentName: "",
    parentPhone: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createStudent(form);
      alert("Student created successfully");

      setForm({
        firstName: "",
        lastName: "",
        className: "",
        section: "",
        rollNumber: "",
        parentName: "",
        parentPhone: ""
      });

      onCreated(); // 🔥 refresh student list
    } catch (err) {
      console.error(err);
      alert("Create student failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Student</h3>

      <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
      <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />

      <input name="className" placeholder="Class" value={form.className} onChange={handleChange} required />
      <input name="section" placeholder="Section" value={form.section} onChange={handleChange} />
      <input name="rollNumber" placeholder="Roll No" value={form.rollNumber} onChange={handleChange} />

      <input name="parentName" placeholder="Parent Name" value={form.parentName} onChange={handleChange} />
      <input name="parentPhone" placeholder="Parent Phone" value={form.parentPhone} onChange={handleChange} />

      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudentForm;
