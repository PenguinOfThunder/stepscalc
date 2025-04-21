import { FallbackProps } from "react-error-boundary";

export function CrashMessage({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="container mt-1">
      <div
        className="alert alert-danger"
        role="alert"
        lang="en">
        <h4 className="alert-heading">Error</h4>
        <p>
          An error occurred. Please report this using the{" "}
          <a data-testid="bug-report-link"
            className="alert-link"
            href={__APP_BUG_REPORT_URL__}>
            issue tracker
          </a>{" "}
          on GitHub.
        </p>
        <p>
          Make sure to check if your issue has already been reported before
          submitting.
        </p>
        <p>Please include this message in your report:</p>
        <pre data-testid="error-message">{error.message}</pre>
        <hr />
        <button
          className="btn btn-primary"
          type="button"
          onClick={resetErrorBoundary}
          data-testid="reset-error-boundary-button">
          Try Again
        </button>
      </div>
    </div>
  );
}
