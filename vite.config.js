import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/stepscalc/",
  build: {
    sourcemap: true
  },
  test: {
    coverage: {
      reporter: ["text", "json-summary", "json"],
      reportOnFailure: true
    }
  },
  plugins: [react()],
  define: {
    // see https://docs.npmjs.com/cli/v10/using-npm/scripts#packagejson-vars
    __APP_NAME__: JSON.stringify(process.env.npm_package_name),
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  },
  server: {
    port: 5173,
    // must expose host inside dev container
    host: true
  }
});
