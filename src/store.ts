import { create } from "zustand";
import { createJSONStorage, persist, devtools } from "zustand/middleware";

export interface AppState {
  theme: string;
  today: Date;
  stepsCompleted: number;
  stepsRequired: number;
  showOptions: boolean;
  setToday: (newDate: Date) => void;
  setStepsCompleted: (count: number) => void;
  changeTheme: (newTheme: string) => void;
  changeGoal: (newGoal: number) => void;
  setShowOptions: (show: boolean) => void;
}

export const useAppState = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        theme: "auto",
        today: new Date(),
        stepsCompleted: 0,
        stepsRequired: 180_000,
        showOptions: false,
        setToday: (newDate: Date) => set({ today: newDate }),
        setStepsCompleted: (count: number) => set({ stepsCompleted: count }),
        changeTheme: (newTheme: string) => set({ theme: newTheme }),
        changeGoal: (newGoal: number) => set({ stepsRequired: newGoal }),
        setShowOptions: (show: boolean) => set({ showOptions: show })
      }),
      {
        name: "stepscalc-settings",
        storage: createJSONStorage(() => localStorage),
        version: 0,
        partialize: (state: any) => ({
          stepsRequired: state.stepsRequired,
          theme: state.theme,
          stepsCompleted: state.stepsCompleted
        })
      }
    ))
);

// log for testing
// useAppState.subscribe((state, prevState) => console.log({ state, prevState }));
