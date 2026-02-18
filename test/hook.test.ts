import { renderHook, act } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { usePreferredColorScheme } from "../src/hooks";

describe("usePreferredColorScheme", () => {
  let mockMatchMedia: vi.MockedFunction<typeof window.matchMedia>;
  let darkMediaQuery: MediaQueryList;
  let lightMediaQuery: MediaQueryList;

  beforeEach(() => {
    // Create mock media query objects
    darkMediaQuery = {
      matches: false,
      media: "(prefers-color-scheme: dark)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    };

    lightMediaQuery = {
      matches: false,
      media: "(prefers-color-scheme: light)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    };

    // Mock window.matchMedia to return appropriate media query based on the query string
    mockMatchMedia = vi.fn().mockImplementation((query: string) => {
      if (query === "(prefers-color-scheme: dark)") {
        return darkMediaQuery;
      } else if (query === "(prefers-color-scheme: light)") {
        return lightMediaQuery;
      }
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
      };
    });

    // Replace the global matchMedia
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: mockMatchMedia
    });
  });

  it("Should return undefined when no color scheme is preferred", () => {
    const { result } = renderHook(() => usePreferredColorScheme());
    expect(result.current).toBeUndefined();
  });

  it("Should return 'dark' when dark color scheme is preferred", () => {
    darkMediaQuery.matches = true;
    const { result } = renderHook(() => usePreferredColorScheme());
    expect(result.current).toBe("dark");
  });

  it("Should return 'light' when light color scheme is preferred", () => {
    lightMediaQuery.matches = true;
    const { result } = renderHook(() => usePreferredColorScheme());
    expect(result.current).toBe("light");
  });

  it("Should update when dark color scheme preference changes", () => {
    darkMediaQuery.matches = false;
    const { result } = renderHook(() => usePreferredColorScheme());
    expect(result.current).toBeUndefined();

    // Simulate dark mode being enabled
    act(() => {
      const changeEvent = {
        matches: true,
        type: "change",
        target: darkMediaQuery
      } as MediaQueryListEvent;
      // Find the event listener that was added for dark media query
      const addEventListenerCalls = darkMediaQuery.addEventListener.mock.calls;
      const changeListener = addEventListenerCalls.find(call => call[0] === "change")?.[1];
      if (changeListener) {
        changeListener(changeEvent);
      }
    });

    expect(result.current).toBe("dark");
  });

  it("Should update when light color scheme preference changes", () => {
    lightMediaQuery.matches = false;
    const { result } = renderHook(() => usePreferredColorScheme());
    expect(result.current).toBeUndefined();

    // Simulate light mode being enabled
    act(() => {
      const changeEvent = {
        matches: true,
        type: "change",
        target: lightMediaQuery
      } as MediaQueryListEvent;
      // Find the event listener that was added for light media query
      const addEventListenerCalls = lightMediaQuery.addEventListener.mock.calls;
      const changeListener = addEventListenerCalls.find(elcall => elcall[0] === "change")?.[1];
      if (changeListener) {
        changeListener(changeEvent);
      }
    });

    expect(result.current).toBe("light");
  });

  it("Should clean up event listeners on unmount", () => {
    const { unmount } = renderHook(() => usePreferredColorScheme());

    unmount();

    expect(darkMediaQuery.removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
    expect(lightMediaQuery.removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });
});
