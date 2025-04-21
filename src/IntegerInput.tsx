import { ChangeEvent, EventHandler, RefAttributes, useCallback, useState } from "react";
import { Form, FormControlProps } from "react-bootstrap";

export function IntegerInput({
  currentValue,
  onValueChange,
  ref,
  ...rest
}: {
  currentValue?: number;
  onValueChange: (num: number) => void;
} & FormControlProps & RefAttributes<HTMLInputElement>) {
  const [inputValue, setInputValue] = useState<string>(String(currentValue));
  const handleChange: EventHandler<ChangeEvent<HTMLInputElement>> = useCallback(
    (e) => {
      // since we only expect integers, strip out any extra characters like spaces, periods, and commas
      const val = e.currentTarget.value.replaceAll(/\P{digit}/gu, "");
      const num = val.trim() === "" ? 0 : Number.parseInt(val, 10);
      if (Number.isFinite(num)) {
        onValueChange(num);
      }
      setInputValue(val);
    },
    [setInputValue]
  );

  return (
    <Form.Control
      type="text"
      inputMode="numeric"
      value={inputValue}
      onChange={handleChange}
      ref={ref}
      {...rest}
    />
  );
}
