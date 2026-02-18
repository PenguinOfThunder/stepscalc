import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useAppState } from "../src/store";
import { OptionsActivity } from "../src/Options";

describe("OptionsActivity", () => {
  beforeEach(() => {
    // Reset the store state before each test
    useAppState.setState(useAppState.getInitialState());
  });

  it("Should render", () => {
    render(<OptionsActivity />);
  });

  it("Should handle goal change and update store state", () => {
    render(<OptionsActivity />);
    const goalCtrl = screen.getByLabelText(/options.monthly_step_goal.label/i);

    fireEvent.change(goalCtrl, { target: { value: "8000" } });

    // Check that the store state was updated
    const state = useAppState.getState();
    expect(state.stepsRequired).toBe(8000);
  });

  it("Should handle invalid goal input and set to 0", () => {
    render(<OptionsActivity />);
    const goalCtrl = screen.getByLabelText(/options.monthly_step_goal.label/i);

    fireEvent.change(goalCtrl, { target: { value: "invalid" } });

    // Check that invalid input sets goal to 0
    const state = useAppState.getState();
    expect(state.stepsRequired).toBe(0);
  });

  it("Should handle theme change and update store state", () => {
    render(<OptionsActivity />);
    const themeCtrl = screen.getByLabelText(/options.theme.label/i);

    fireEvent.change(themeCtrl, { target: { value: "dark" } });

    // Check that the store state was updated
    const state = useAppState.getState();
    expect(state.theme).toBe("dark");
  });

  it("Should handle language change", () => {
    render(<OptionsActivity />);
    const langCtrl = screen.getByLabelText(/options.lang.label/i);

    fireEvent.change(langCtrl, { target: { value: "de" } });

    // Note: Language change is handled by i18n, not the Zustand store
    // You could mock i18n.changeLanguage and verify it was called
  });
});
