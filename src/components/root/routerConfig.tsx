import { RouteObject } from "react-router-dom";
import { navigationRoutes } from "../../consts/navigationRoutes";
import LoginView from "../../views/auth/LoginView";
import RegisterView from "../../views/auth/RegisterView";
import StartingView from "../../views/StartingView";
import { AuthLayout } from "../layouts/AuthLayout";
import { MainLayout } from "../layouts/MainLayout";

const authRoutes = [
  { path: navigationRoutes.Login, element: <LoginView /> },
  { path: navigationRoutes.Register, element: <RegisterView /> }
];

export const routerConfig: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [{ index: true, element: <StartingView /> }]
  },
  ...authRoutes.map((route) => ({
    path: route.path,
    element: <AuthLayout />,
    children: [{ index: true, element: route.element }]
  }))
];
