import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAppState = create(
  persist(
    (set) => ({
      theme: "auto",
      today: new Date(),
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
      name: "stepscalc-settings",
      storage: createJSONStorage(() => localStorage),
      version: 0,
      partialize: (state) => ({
        stepsRequired: state.stepsRequired,
        theme: state.theme,
        stepsCompleted: state.stepsCompleted
      })
    }
  )
);

// log for testing
// useAppState.subscribe((state, prevState) => console.log({ state, prevState }));
