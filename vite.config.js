// @ts-check
import { VitePWA } from 'vite-plugin-pwa'
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import pwaAssetsConfig from "./pwa-assets.config";
const basePath = "/stepscalc/";
const repoHome = "https://github.com/PenguinOfThunder/stepscalc";
const appHome = "https://penguinofthunder.github.io/stepscalc/";

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
    setupFiles: ["./test/setup.js"]
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,
      base: basePath,
      pwaAssets: pwaAssetsConfig
    })

  ],
  define: {
    // see https://docs.npmjs.com/cli/v10/using-npm/scripts#packagejson-vars
    __APP_NAME__: JSON.stringify(process.env.npm_package_name),
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __APP_URL__: JSON.stringify(appHome),
    __APP_SOURCE_CODE_URL__: JSON.stringify(repoHome),
    __APP_BUG_REPORT_URL__: JSON.stringify(`${repoHome}/issues`),
    __BASE_URL__: JSON.stringify(basePath)
  },
  server: {
    port: 5173,
    // must expose host inside dev container
    host: true
  }
});
