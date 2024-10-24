import { RouteObject } from "react-router-dom";
import { navigationRoutes } from "../../consts/navigationRoutes";
import App from "../../views/App";
import AuthView from "../../views/AuthView";
import StartingView from "../../views/StartingView";
import { AuthLayout } from "../layouts/AuthLayout";
import { MainLayout } from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

const authRoutes = [
  {
    path: navigationRoutes.Login,
    element: (
      <AuthView
        isLogin
        ctaTitle="New Here?"
        ctaSubtitle="Sign up and discover our application"
        buttonText="Login"
        ctaButtonText="Sign up"
      />
    )
  },
  {
    path: navigationRoutes.Register,
    element: (
      <AuthView
        isLogin={false}
        ctaTitle="Already have an account?"
        ctaSubtitle="Login and continue exploring"
        buttonText="Sign up"
        ctaButtonText="Login"
        isCtaOnLeft
      />
    )
  }
];

export const routerConfig: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <StartingView /> },
      {
        path: navigationRoutes.App,
        element: <ProtectedRoute />,
        children: [{ index: true, element: <App /> }]
      }
    ]
  },
  ...authRoutes.map((route) => ({
    path: route.path,
    element: <AuthLayout />,
    children: [{ index: true, element: route.element }]
  }))
];
