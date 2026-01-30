import { useState } from "react";
import { updateStudent, deleteStudent } from "../api/studentApi";

const StudentTable = ({ students, onRefresh }) => {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const startEdit = (student) => {
    setEditId(student._id);
    setEditData({
      firstName: student.firstName || "",
      lastName: student.lastName || "",
      className: student.className || "",
      section: student.section || "",
      parentName: student.parentName || "",
      parentPhone: student.parentPhone || ""
    });
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const saveEdit = async () => {
    try {
      await updateStudent(editId, editData);
      setEditId(null);
      onRefresh();
    } catch (err) {
      alert("Update failed");
    }
  };

  const removeStudent = async (id) => {
    if (!window.confirm("Delete student?")) return;

    try {
      await deleteStudent(id);
      onRefresh();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Name</th>
          <th>Class</th>
          <th>Section</th>
          <th>Roll</th>
          <th>Parent</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {Array.isArray(students) && students.map((s) => (
          <tr key={s._id}>

            {/* NAME */}
            <td>
              {editId === s._id ? (
                <>
                  <input
                    name="firstName"
                    placeholder="First"
                    value={editData.firstName}
                    onChange={handleChange}
                  />
                  <input
                    name="lastName"
                    placeholder="Last"
                    value={editData.lastName}
                    onChange={handleChange}
                  />
                </>
              ) : (
                `${s.firstName} ${s.lastName || ""}`
              )}
            </td>

            {/* CLASS */}
            <td>
              {editId === s._id ? (
                <input
                  name="className"
                  value={editData.className}
                  onChange={handleChange}
                />
              ) : (
                s.className
              )}
            </td>

            {/* SECTION */}
            <td>
              {editId === s._id ? (
                <input
                  name="section"
                  value={editData.section}
                  onChange={handleChange}
                />
              ) : (
                s.section
              )}
            </td>

            {/* ROLL (READ ONLY) */}
            <td>{s.rollNumber}</td>

            {/* PARENT */}
            <td>
              {editId === s._id ? (
                <input
                  name="parentName"
                  value={editData.parentName}
                  onChange={handleChange}
                />
              ) : (
                s.parentName
              )}
            </td>

            {/* PHONE */}
            <td>
              {editId === s._id ? (
                <input
                  name="parentPhone"
                  value={editData.parentPhone}
                  onChange={handleChange}
                />
              ) : (
                s.parentPhone
              )}
            </td>

            {/* ACTIONS */}
            <td>
              {editId === s._id ? (
                <>
                  <button onClick={saveEdit}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => startEdit(s)}>Edit</button>
                  <button onClick={() => removeStudent(s._id)}>Delete</button>
                </>
              )}
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
