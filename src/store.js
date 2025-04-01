import * as dateFns from "date-fns";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getPreferredTheme, setTheme } from "./bootstrap-helpers";

export const useAppState = create(
  persist(
    (set, get) => ({
      theme: getPreferredTheme(),
      today: dateFns.formatISO(new Date(), { representation: "date" }),
      stepsCompleted: 0,
      stepsRequired: 180_000,
      showOptions: false,
      setToday: (newDate) => set({ today: newDate }),
      setStepsCompleted: (count) => set({ stepsCompleted: count }),
      changeTheme: (newTheme) => set({ theme: newTheme }),
      changeGoal: (newGoal) => set({ stepsRequired: newGoal }),
      setShowOptions: (show) => set({ showOptions: show })
    }),
    {
      name: "stepscalc-settings"
    }
  )
);

// log for testing
useAppState.subscribe((state, prevState) => console.log({ state, prevState }));

// Auto update theme
useAppState.subscribe((state) => {
  setTheme(state.theme);
});

// followColorScheme();
