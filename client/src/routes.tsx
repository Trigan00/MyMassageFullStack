// import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
// import AllCoursesPage from "./pages/AllCoursesPage";
import { consts } from "./utils/routsConsts";
import LessonPage from "./pages/LessonPage";
import CoursePage from "./pages/CoursePage";
import MyCoursesPage from "./pages/MyCoursesPage";
import MyCourseInfoPage from "./pages/MyCourseInfoPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import BuyCoursePage from "./pages/BuyCoursePage";

export const authRoutes = [
  {
    path: consts.BUY_COURSE_ROUTE + "/:id",
    Component: BuyCoursePage,
  },
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
  // {
  //   path: consts.ALLCOURSES_ROUTE,
  //   Component: AllCoursesPage,
  // },
  {
    path: consts.MYCOURSES_ROUTE,
    Component: MyCoursesPage,
  },
  {
    path: consts.MYCOURSES_ROUTE + "/:courseName",
    Component: MyCourseInfoPage,
  },
  {
    path: consts.ALLCOURSES_ROUTE + "/:name",
    Component: CoursePage,
  },
  // {
  //   path: consts.LESSON_ROUTE + "/:id",
  //   Component: LessonPage,
  // },
  {
    path: consts.MYCOURSES_ROUTE + "/:courseName/:id",
    Component: LessonPage,
  },
  {
    path: consts.RESET_PASSWORD,
    Component: ResetPasswordPage,
  },
];
