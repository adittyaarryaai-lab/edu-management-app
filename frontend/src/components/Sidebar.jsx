import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../constants/roles";

const Sidebar = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const role = user.role;

  return (
    <div
      style={{
        width: "220px",
        background: "#111827",
        color: "white",
        padding: "20px"
      }}
    >
      <h2>EduFlowAI</h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}
      >
        {/* COMMON */}
        <Link to="/dashboard" style={linkStyle}>
          Dashboard
        </Link>

        {/* SUPER ADMIN / INSTITUTE ADMIN */}
        {(role === ROLES.INSTITUTE_ADMIN ||
          role === ROLES.SUPER_ADMIN) && (
          <>
            <Link to="/students" style={linkStyle}>
              Students
            </Link>
            <Link to="/teachers" style={linkStyle}>
              Teachers
            </Link>
            <Link to="/timetable" style={linkStyle}>
              Timetable
            </Link>
            <Link to="/reports" style={linkStyle}>
              Reports
            </Link>
          </>
        )}

        {/* TEACHER */}
        {role === ROLES.TEACHER && (
          <>
            <Link to="/attendance" style={linkStyle}>
              Attendance
            </Link>

            {/* DAY 28 – LMS */}
            <Link to="/upload-material" style={linkStyle}>
              Upload Material
            </Link>
          </>
        )}

        {/* STUDENT */}
        {role === ROLES.STUDENT && (
          <>
            <Link to="/timetable" style={linkStyle}>
              Timetable
            </Link>

            {/* DAY 28 – LMS */}
            <Link to="/study-materials" style={linkStyle}>
              Study Materials
            </Link>
          </>
        )}

        {/* PARENT (DAY 27 + 28) */}
        {role === ROLES.PARENT && (
          <>
            <Link to="/parent/dashboard" style={linkStyle}>
              Child Dashboard
            </Link>

            <Link to="/study-materials" style={linkStyle}>
              Study Materials
            </Link>
          </>
        )}

        {/* ACCOUNTANT */}
        {role === ROLES.ACCOUNTANT && (
          <Link to="/fees" style={linkStyle}>
            Fees
          </Link>
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
