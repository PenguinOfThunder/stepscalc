import { afterAll, describe, expect, it, vi } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { DateInput } from "../src/DateInput";
import { afterEach } from "node:test";
import { createRef } from "react";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("IntegerInput", () => {
  const today = new Date(2025, 3, 15);
  it("Should render", async () => {
    const inputRef = createRef<HTMLInputElement>();
    render(
      <DateInput
        ref={inputRef}
        onValueChange={() => undefined}
        currentValue={today}
      />
    );
    expect(inputRef.current?.value).toBe("2025-04-15");
  });

  it("Should accept a date", async () => {
    const inputRef = createRef<HTMLInputElement>();
    render(
      <DateInput
        ref={inputRef}
        onValueChange={() => undefined}
        currentValue={today}
      />
    );
    // screen.debug();
    await act(async () => {
      fireEvent.change(inputRef.current!, {
        target: { value: "2025-05-01" }
      });
    });
    expect(inputRef.current?.value).toBe("2025-05-01");
  });

  it("Should not accept a non-date", async () => {
    const inputRef = createRef<HTMLInputElement>();
    render(
      <DateInput
        ref={inputRef}
        onValueChange={() => undefined}
        currentValue={today}
      />
    );
    // screen.debug();
    await act(async () => {
      fireEvent.change(inputRef.current!, {
        target: { value: "hello" }
      });
    });
    // should stay the initial value
    expect(inputRef.current?.value).toBe("2025-04-15");
  });

  it("Should call onValueChange", async () => {
    const onValueChange = vi.fn(function (val: Date) {
      console.log(val);
    });
    const inputRef = createRef<HTMLInputElement>();
    render(
      <DateInput
        ref={inputRef}
        onValueChange={onValueChange}
        currentValue={today}
      />
    );
    // screen.debug();
    await act(async () => {
      fireEvent.change(inputRef.current!, {
        target: { value: "2025-05-17" }
      });
    });
    expect(inputRef.current?.value).toBe("2025-05-17");
    expect(onValueChange).toBeCalled();
  });
});
