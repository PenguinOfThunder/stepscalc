/** @type {import('vite').UserConfig}  */
export default {
  base: "/stepscalc/",
  test: {
    coverage: {
      reporter: ["text", "json-summary", "json"],
      reportOnFailure: true
    }
  }
};
