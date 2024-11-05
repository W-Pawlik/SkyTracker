import { RouteObject } from "react-router-dom";
import { navigationRoutes } from "../../consts/navigationRoutes";
import { AccountSettingsView } from "../../views/app/AccountSettingsView";
import { AnalyticsView } from "../../views/app/AnalyticsView";
import { MapView } from "../../views/app/MapView";
import { PlansView } from "../../views/app/PlansView";

export const appRoutes: RouteObject[] = [
  {
    path: navigationRoutes.Map,
    element: <MapView />
  },
  {
    path: navigationRoutes.Analytics,
    element: <AnalyticsView />
  },
  {
    path: navigationRoutes.Plans,
    element: <PlansView />
  },
  {
    path: navigationRoutes.AccountSettings,
    element: <AccountSettingsView />
  },
  {
    index: true,
    element: <MapView />
  }
];
