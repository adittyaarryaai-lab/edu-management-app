const StudentTable = ({ students }) => {
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
        </tr>
      </thead>

      <tbody>
        {Array.isArray(students) && students.map((s) => (
          <tr key={s._id}>
            <td>{s.firstName} {s.lastName}</td>
            <td>{s.className}</td>
            <td>{s.section}</td>
            <td>{s.rollNumber}</td>
            <td>{s.parentName}</td>
            <td>{s.parentPhone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
