import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
// eslint-disable-next-line import/no-unresolved
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts"
  }
});
