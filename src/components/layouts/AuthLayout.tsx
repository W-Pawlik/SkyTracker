import { Outlet } from "react-router-dom";
import { TopBar } from "../navigation/TopBar";

export const AuthLayout = () => (
  <>
    <TopBar />
    <Outlet />
  </>
);
