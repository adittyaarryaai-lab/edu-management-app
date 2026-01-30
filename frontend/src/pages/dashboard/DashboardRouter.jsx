import { useAuth } from "../../context/AuthContext";
import { ROLES } from "../../constants/roles";

import AdminDashboard from "./AdminDashboard";
import TeacherDashboard from "./TeacherDashboard";
import StudentDashboard from "./StudentDashboard";
import ParentDashboard from "./ParentDashboard";
import AccountantDashboard from "./AccountantDashboard";

const DashboardRouter = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case ROLES.SUPER_ADMIN:
    case ROLES.INSTITUTE_ADMIN:
      return <AdminDashboard />;

    case ROLES.TEACHER:
      return <TeacherDashboard />;

    case ROLES.STUDENT:
      return <StudentDashboard />;

    case ROLES.PARENT:
      return <ParentDashboard />;

    case ROLES.ACCOUNTANT:
      return <AccountantDashboard />;

    default:
      return <h2>Unauthorized</h2>;
  }
};

export default DashboardRouter;
