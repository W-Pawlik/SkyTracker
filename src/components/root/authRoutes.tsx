import { navigationRoutes } from "../../consts/navigationRoutes";
import AuthView from "../../views/AuthView";

export const authRoutes = [
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
