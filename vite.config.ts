import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
// https://vitejs.dev/config/

export default defineConfig({
  base: "/api-github-recreate/",
  plugins: [react()],
});
