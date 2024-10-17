import { RouteObject } from "react-router-dom";
import App from "../../views/App";

export const routerConfig: RouteObject[] = [
  {
    path: "/",
    element: <App />
  }
];
