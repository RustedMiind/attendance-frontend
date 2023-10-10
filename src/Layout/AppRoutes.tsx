import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/main/Main";
import RolesPage from "../pages/roles/RolesPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/Roles" element={<RolesPage />} />
    </Routes>
  );
}

export default AppRoutes;
