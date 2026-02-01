import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../constants/roles";

const Sidebar = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const role = user.role;

  return (
    <div style={{
      width: "220px",
      background: "#111827",
      color: "white",
      padding: "20px"
    }}>
      <h2>EduFlowAI</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>

        {(role === ROLES.INSTITUTE_ADMIN || role === ROLES.SUPER_ADMIN) && (
          <>
            <Link to="/students" style={linkStyle}>Students</Link>
            <Link to="/teachers" style={linkStyle}>Teachers</Link>
            <Link to="/timetable" style={linkStyle}>Timetable</Link>
            <Link to="/reports" style={linkStyle}>Reports</Link>
          </>
        )}

        {role === ROLES.TEACHER && (
          <Link to="/attendance" style={linkStyle}>Attendance</Link>
        )}

        {role === ROLES.STUDENT && (
          <Link to="/timetable" style={linkStyle}>Timetable</Link>
        )}

        {role === ROLES.ACCOUNTANT && (
          <Link to="/fees" style={linkStyle}>Fees</Link>
        )}

        <button onClick={logout} style={logoutStyle}>
          Logout
        </button>
      </nav>
    </div>
  );
};

const linkStyle = {
  color: "white",
  textDecoration: "none"
};

const logoutStyle = {
  marginTop: "20px",
  padding: "8px",
  background: "#ef4444",
  color: "white",
  border: "none",
  cursor: "pointer"
};

export default Sidebar;
