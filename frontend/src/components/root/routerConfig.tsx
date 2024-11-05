import { RouteObject } from "react-router-dom";
import { navigationRoutes } from "../../consts/navigationRoutes";
import App from "../../views/App";
import StartingView from "../../views/StartingView";
import { AuthLayout } from "../layouts/AuthLayout";
import { MainLayout } from "../layouts/MainLayout";
import { appRoutes } from "./appRoutes";
import { authRoutes } from "./authRoutes";
import ProtectedRoute from "./ProtectedRoute";

export const routerConfig: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <StartingView /> },
      {
        path: navigationRoutes.App,
        element: <ProtectedRoute />,
        children: [{ path: "", element: <App />, children: appRoutes }]
      }
    ]
  },
  ...authRoutes.map((route) => ({
    path: route.path,
    element: <AuthLayout />,
    children: [{ index: true, element: route.element }]
  }))
];
