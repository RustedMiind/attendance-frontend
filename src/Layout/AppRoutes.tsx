import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/main/Main";
import EmployeesPage from "../pages/employees/EmployeesPage";
import ProfilePage from "../pages/profile/ProfilePage";
import AttendancePage from "../pages/attendance/Attendance";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/employees" element={<EmployeesPage />} />
      <Route path="/users/:id" element={<ProfilePage />} />
      <Route path="attendance" element={<AttendancePage />} />
    </Routes>
  );
}

export default AppRoutes;
