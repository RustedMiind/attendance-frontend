import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/main/Main";
import RolesPage from "../pages/roles/RolesPage";
import ProtectedComponent from "../components/protected-component/ProtectedComponent";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route
        path="/Roles"
        element={
          <ProtectedComponent>
            <RolesPage />
          </ProtectedComponent>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
