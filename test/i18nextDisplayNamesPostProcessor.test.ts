import { describe, expect, it } from "vitest";
import i18nextDisplayNamesPostProcessor from "../src/i18nextDisplayNamesPostProcessor";

describe("i18nextDisplayNamesPostProcessor", () => {
  it("should be of type 'postProcessor'", () => {
    expect(i18nextDisplayNamesPostProcessor.type)
      .toBe("postProcessor");
  });
  it("Should process en-US", () => {
    const actual = i18nextDisplayNamesPostProcessor
      .process("US", "en", {
        lng: "en"
      }, { language: "en" });
    expect(actual).toBe("United States")
  });
  it("Should return original value on error", () => {
    const actual = i18nextDisplayNamesPostProcessor
      .process("invalid", "en", {
        lng: "en"
      }, { language: "en" });
    expect(actual).toBe("invalid")
  });
});
