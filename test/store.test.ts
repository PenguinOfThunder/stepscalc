import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { AppState, HistoryDataEntry, useAppState } from "../src/store";

describe("store", () => {
  beforeEach(() => {
    useAppState.setState(useAppState.getInitialState());
  });

  it("renders useAppState hook", () => {
    const { result } = renderHook<AppState, {}>(useAppState);
    const state = result.current;
    expect(state).toBeDefined();
    // Check defaults
    expect(state.stepsCompleted).toBe(0);
    expect(state.theme).toBe("auto");
    expect(state.stepsRequired).toBe(180_000);
    expect(state.showOptions).toBe(false);
    expect(state.showHistory).toBe(false);
    expect(state.historyData).toHaveLength(0);
  });

  it("updates today", () => {
    let state = useAppState.getState();
    const newToday = new Date(2025, 3, 15, 16, 17, 18);
    state.setToday(newToday);
    state = useAppState.getState();
    expect(state.today).toBe(newToday);
  });

  it("updates goal", () => {
    let state = useAppState.getState();
    const newGoal = 900999;
    state.changeGoal(newGoal);
    state = useAppState.getState();
    expect(state.stepsRequired).toBe(newGoal);
  });

  it("updates steps completed", () => {
    let state = useAppState.getState();
    const newStepsCompleted = 900999;
    state.setStepsCompleted(newStepsCompleted);
    state = useAppState.getState();
    expect(state.stepsCompleted).toBe(newStepsCompleted);
  });

  it("updates theme", () => {
    let state = useAppState.getState();
    const newTheme = "light";
    state.changeTheme(newTheme);
    state = useAppState.getState();
    expect(state.theme).toBe(newTheme);
  });

  it("updates showOptions", () => {
    let state = useAppState.getState();
    const newState = true;
    state.setShowOptions(newState);
    state = useAppState.getState();
    expect(state.showOptions).toBe(newState);
  });

  it("updates showHistory", () => {
    let state = useAppState.getState();
    const newState = true;
    state.setShowHistory(newState);
    state = useAppState.getState();
    expect(state.showHistory).toBe(newState);
  });

  const testEntry: HistoryDataEntry = {
    id: crypto.randomUUID(),
    date: new Date(2025, 3, 15).getTime(),
    steps: 6000
  };
  it("adds history entry", () => {
    let state = useAppState.getState();
    expect(state.historyData).toHaveLength(0);
    // add an entry
    state.addHistoryEntry(testEntry);
    state = useAppState.getState();
    expect(state.historyData).toHaveLength(1);
    expect(state.historyData).toContain(testEntry);

    // remove the entry
    state.removeHistoryEntry(testEntry.id);
    state = useAppState.getState();
    expect(state.historyData).toHaveLength(0);
  });

  it("removes history entry", () => {
    let state = useAppState.getState();
    expect(state.historyData).toHaveLength(0);

    // add 3 entries
    state = useAppState.getState();
    state.addHistoryEntry({
      id: crypto.randomUUID(),
      date: new Date(2025, 3, 14).getTime(),
      steps: 5999
    });

    state = useAppState.getState();
    state.addHistoryEntry(testEntry);

    state = useAppState.getState();
    state.addHistoryEntry({
      id: crypto.randomUUID(),
      date: new Date(2025, 3, 16).getTime(),
      steps: 6001
    });

    state = useAppState.getState();
    expect(state.historyData).toHaveLength(3);

    // remove the entry
    state.removeHistoryEntry(testEntry.id);
    state = useAppState.getState();
    expect(state.historyData).toHaveLength(2);
    expect(state.historyData).not.toContain(testEntry);
  });

  it("finds a history entry", () => {
    let state = useAppState.getState();
    expect(state.historyData).toHaveLength(0);
    state = useAppState.getState();
    state.addHistoryEntry(testEntry);
    state = useAppState.getState();
    expect(state.historyData).toHaveLength(1);
    state = useAppState.getState();
    const item = state.findHistoryEntryByDate(testEntry.date);
    expect(item).toBeDefined();
    expect(item?.id).toBe(testEntry.id);
    expect(item?.date).toBe(testEntry.date);
    expect(item?.steps).toBe(testEntry.steps);
  });

  it("does not find a non-existent entry", () => {
    let state = useAppState.getState();
    expect(state.historyData).toHaveLength(0);
    state = useAppState.getState();
    state.addHistoryEntry(testEntry);
    state = useAppState.getState();
    expect(state.historyData).toHaveLength(1);
    state = useAppState.getState();
    const item = state.findHistoryEntryByDate(211242738);
    expect(item).toBeUndefined();
  });
});
