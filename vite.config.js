import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const basePath = "/stepscalc/";

export default defineConfig({
  base: basePath,
  build: {
    sourcemap: true
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json-summary", "json", "html"],
      reportOnFailure: true
    },
    setupFiles:["./test/setup.js"]
  },
  plugins: [react()],
  define: {
    // see https://docs.npmjs.com/cli/v10/using-npm/scripts#packagejson-vars
    __APP_NAME__: JSON.stringify(process.env.npm_package_name),
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __APP_URL__: JSON.stringify("https://github.com/PenguinOfThunder/stepscalc"),
    __APP_BUG_REPORT_URL__: JSON.stringify("https://github.com/PenguinOfThunder/stepscalc/issues"),
    __BASE_URL__: JSON.stringify(basePath)
  },
  server: {
    port: 5173,
    // must expose host inside dev container
    host: true
  }
});
