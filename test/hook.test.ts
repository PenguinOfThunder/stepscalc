import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { usePreferredColorScheme } from "../src/hooks";

describe("usePreferredColorScheme", () => {
  it("Should render", () => {
    const { result } = renderHook(() => usePreferredColorScheme());
    expect(result.current).toBe(undefined);
    // TODO simulate DOM events to change the theme
  });
});
