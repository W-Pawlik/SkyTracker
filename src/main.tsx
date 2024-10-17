import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Root from "./components/root/root.component";

import "../src/assets/css/index.css";

createRoot(document.querySelector("#root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
