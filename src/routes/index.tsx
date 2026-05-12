import { Route, Routes, Navigate } from "react-router-dom";
import { appRoutesConfig } from "./admin.routing";
import type { AppRoute } from "../utils/routes";
import AppLayout from "../layouts/AppLayout";

export function AppRoutes() {
  const renderRoutes = (routes: AppRoute[]) => {
    return routes.map((route, index) => {
      if (route.children && route.children.length > 0) {
        return (
          <Route
            key={index}
            path={route.path || undefined}
            element={route.element}
          >
            {renderRoutes(route.children)}
          </Route>
        );
      }

      return (
        <Route
          key={index}
          index={route.path === ""}
          path={route.path !== "" ? route.path : undefined}
          element={route.element}
        />
      );
    });
  };

  return (
    <Routes>
      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      
      <Route path="/admin" element={<AppLayout />}>
        {appRoutesConfig.children && renderRoutes(appRoutesConfig.children)}
      </Route>
    </Routes>
  );
}

export default AppRoutes;
