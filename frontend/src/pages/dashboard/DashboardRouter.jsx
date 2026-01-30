import { useAuth } from "../../context/AuthContext";
import { ROLES } from "../../constants/roles";

import MainLayout from "../../layouts/MainLayout";

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
      return (
        <MainLayout>
          <AdminDashboard />
        </MainLayout>
      );

    case ROLES.TEACHER:
      return (
        <MainLayout>
          <TeacherDashboard />
        </MainLayout>
      );

    case ROLES.STUDENT:
      return (
        <MainLayout>
          <StudentDashboard />
        </MainLayout>
      );

    case ROLES.PARENT:
      return (
        <MainLayout>
          <ParentDashboard />
        </MainLayout>
      );

    case ROLES.ACCOUNTANT:
      return (
        <MainLayout>
          <AccountantDashboard />
        </MainLayout>
      );

    default:
      return <h2>Unauthorized</h2>;
  }
};

export default DashboardRouter;
