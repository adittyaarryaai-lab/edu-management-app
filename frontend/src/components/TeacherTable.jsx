const TeacherTable = ({ teachers }) => {
  if (!Array.isArray(teachers) || teachers.length === 0) {
    return <p>No teachers found</p>;
  }

  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Name</th>
          <th>Subject</th>
          <th>Experience</th>
        </tr>
      </thead>

      <tbody>
        {teachers.map((t) => (
          <tr key={t._id}>
            <td>{t.firstName}</td>        {/* ✅ FIX */}
            <td>{t.subject}</td>          {/* ✅ FIX */}
            <td>{t.experienceYears}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TeacherTable;
