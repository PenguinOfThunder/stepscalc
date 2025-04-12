// custom hooks
import { useState, useEffect } from "react";

/**
 * Uses a media query to determine which is the prefers-color-scheme setting.
 * Will track it when it changes.
 * @returns {string} The currently preferred color scheme, according to the prefers-color-scheme media query
 */
export function usePreferredColorScheme() {
  const [scheme, setScheme] = useState<string>();
  useEffect(() => {
    const dmm = window.matchMedia("(prefers-color-scheme: dark)");
    const del = (e: MediaQueryListEvent) => {
      if (e.matches) setScheme("dark");
    };
    dmm.addEventListener("change", del);
    // set initial
    if (dmm.matches) setScheme("dark");

    const lmm = window.matchMedia("(prefers-color-scheme: light)");
    const lel = (e: MediaQueryListEvent) => {
      if (e.matches) setScheme("light");
    };
    lmm.addEventListener("change", lel);
    if (lmm.matches) setScheme("light");

    // cleanup
    return () => {
      dmm.removeEventListener("change", del);
      lmm.removeEventListener("change", lel);
    };
  }, [setScheme]);
  return scheme;
}
