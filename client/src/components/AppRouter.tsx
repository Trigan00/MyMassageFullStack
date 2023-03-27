import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { adminRoutes, publicRoutes /* , authRoutes */ } from "../routes";

const AppRouter: React.FC = () => {
  const { id /*  isAuth */ } = useAuth();

  return (
    <Routes>
      {id === process.env.REACT_APP_ADMINID &&
        adminRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {/* {isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))} */}
      <Route path={"*"} element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
