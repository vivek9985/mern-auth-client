import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { reactRouter } from "@react-router/dev/vite";
// import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// reactRouter(), tsconfigPaths()
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
