// import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import VideosPage from "./pages/VideosPage";
import { consts } from "./utils/routsConsts";

export const authRoutes = [
  //Можно добавить роут оплаты прайма
];

export const adminRoutes = [
  {
    path: consts.ADMIN_ROUTE,
    Component: AdminPage,
  },
];

export const publicRoutes = [
  {
    path: consts.HOME_ROUTE,
    Component: HomePage,
  },
  {
    path: consts.LOGIN_ROUTE,
    Component: LoginPage,
  },
  {
    path: consts.REGISTRATION_ROUTE,
    Component: RegisterPage,
  },
  {
    path: consts.VIDEOS_ROUTE,
    Component: VideosPage,
  },
];
