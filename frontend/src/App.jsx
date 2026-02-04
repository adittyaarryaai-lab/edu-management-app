import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";

/* Auth */
import Login from "./pages/Login";

/* Dashboards */
import DashboardRouter from "./pages/dashboard/DashboardRouter";
import ParentDashboard from "./pages/ParentDashboard";

/* Core Modules */
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Attendance from "./pages/Attendance";
import Reports from "./pages/Reports";
import Fees from "./pages/Fees";
import Timetable from "./pages/Timetable";

/* Day 28 — LMS */
import UploadMaterial from "./pages/UploadMaterial";
import StudyMaterials from "./pages/StudyMaterials";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ---------------- PUBLIC ---------------- */}
          <Route path="/login" element={<Login />} />

          {/* ---------------- DASHBOARDS ---------------- */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardRouter />
              </ProtectedRoute>
            }
          />

          <Route
            path="/parent/dashboard"
            element={
              <ProtectedRoute>
                <ParentDashboard />
              </ProtectedRoute>
            }
          />

          {/* ---------------- ADMIN / TEACHER / STUDENT ---------------- */}
          <Route
            path="/students"
            element={
              <ProtectedRoute>
                <Students />
              </ProtectedRoute>
            }
          />

          <Route
            path="/teachers"
            element={
              <ProtectedRoute>
                <Teachers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            }
          />

          <Route
            path="/timetable"
            element={
              <ProtectedRoute>
                <Timetable />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />

          <Route
            path="/fees"
            element={
              <ProtectedRoute>
                <Fees />
              </ProtectedRoute>
            }
          />

          {/* ---------------- DAY 28 : LMS ---------------- */}
          <Route
            path="/upload-material"
            element={
              <ProtectedRoute>
                <UploadMaterial />
              </ProtectedRoute>
            }
          />

          <Route
            path="/study-materials"
            element={
              <ProtectedRoute>
                <StudyMaterials />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
