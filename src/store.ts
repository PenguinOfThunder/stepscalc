import { create } from "zustand";
import { createJSONStorage, persist, devtools } from "zustand/middleware";

export interface HistoryDataEntry {
  id: string,
  date: number; // stored as number for easier (de)serialization
  steps: number;
}

export interface AppState {
  theme: string;
  today: Date;
  stepsCompleted: number;
  stepsRequired: number;
  showOptions: boolean;
  showHistory: boolean;
  historyData: HistoryDataEntry[];
  setToday: (newDate: Date) => void;
  setStepsCompleted: (count: number) => void;
  changeTheme: (newTheme: string) => void;
  changeGoal: (newGoal: number) => void;
  setShowOptions: (show: boolean) => void;
  setShowHistory: (show: boolean) => void;
  addHistoryEntry: (entry: HistoryDataEntry) => void;
  removeHistoryEntry: (id: string) => void;
}

export const useAppState = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        today: new Date(),
        setToday: (newDate: Date) => set({ today: newDate }),
        stepsCompleted: 0,
        setStepsCompleted: (count: number) => set({ stepsCompleted: count }),
        theme: "auto",
        changeTheme: (newTheme: string) => set({ theme: newTheme }),
        stepsRequired: 180_000,
        changeGoal: (newGoal: number) => set({ stepsRequired: newGoal }),
        showOptions: false,
        setShowOptions: (show: boolean) => set({ showOptions: show }),
        showHistory: false,
        setShowHistory: (show: boolean) => set({ showHistory: show }),
        historyData: [],
        addHistoryEntry: (entry: HistoryDataEntry) => set((state: AppState) => ({ historyData: [...state.historyData, entry] })),
        removeHistoryEntry: (id: string) => set((state: AppState) =>
          ({ historyData: state.historyData.filter((entry) => entry.id !== id) }))
      }),
      {
        name: "stepscalc-settings",
        storage: createJSONStorage(() => localStorage),
        version: 1,
        partialize: (state: any) => ({
          stepsRequired: state.stepsRequired,
          theme: state.theme,
          stepsCompleted: state.stepsCompleted,
          historyData: state.historyData
        }),
        migrate(persistedState, version) {
          if (version === 0) {
            // history was added in v 1
            const oldState = persistedState as Pick<AppState, "stepsRequired" | "theme" | "stepsCompleted">;
            return {
              ...oldState,
              historyData: []
            };
          }
          return persistedState;
        },
      }
    ))
);

// log for testing
// useAppState.subscribe((state, prevState) => console.log({ state, prevState }));
