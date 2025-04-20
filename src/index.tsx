import { ErrorInfo, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App.tsx";
import { CrashMessage } from "./CrashMessage.tsx";
import "./i18n.js";
import "./stepscalc.scss";

function logError(error: Error, info: ErrorInfo) {
  // console.error(error, info);
  // TODO log to some API
}

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element not found");
createRoot(rootEl).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={CrashMessage}
      onError={logError}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
