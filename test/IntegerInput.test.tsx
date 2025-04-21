import { afterAll, describe, expect, it, vi } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { IntegerInput } from "../src/IntegerInput";
import { afterEach } from "node:test";
import { createRef } from "react";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("IntegerInput", () => {
  it("Should render", async () => {
    const inputRef = createRef<HTMLInputElement>();
    render(
      <IntegerInput
        ref={inputRef}
        onValueChange={() => undefined}
        currentValue={0}
      />
    );
    expect(inputRef.current?.value).toBe("0");
  });
  it("Should accept an integer", async () => {
    const inputRef = createRef<HTMLInputElement>();
    render(
      <IntegerInput
        ref={inputRef}
        onValueChange={() => undefined}
        currentValue={0}
      />
    );
    // screen.debug();
    await act(async () => {
      fireEvent.change(inputRef.current!, {
        target: { value: "3123" }
      });
    });
    expect(inputRef.current?.value).toBe("3123");
  });
  it("Should not accept a non-integer", async () => {
    const inputRef = createRef<HTMLInputElement>();
    render(
      <IntegerInput
        ref={inputRef}
        onValueChange={() => undefined}
        currentValue={0}
      />
    );
    // screen.debug();
    await act(async () => {
      fireEvent.change(inputRef.current!, {
        target: { value: "hello" }
      });
    });
    expect(inputRef.current?.value).toBe("");
  });
  it("Should call onValueChange", async () => {
    const onValueChange = vi.fn(function (val: number) {
      console.log(val);
    });
    const inputRef = createRef<HTMLInputElement>();
    render(
      <IntegerInput
        ref={inputRef}
        onValueChange={onValueChange}
        currentValue={0}
      />
    );
    // screen.debug();
    await act(async () => {
      fireEvent.change(inputRef.current!, {
        target: { value: "5432" }
      });
    });
    expect(inputRef.current?.value).toBe("5432");
    expect(onValueChange).toBeCalled();
  });
});
