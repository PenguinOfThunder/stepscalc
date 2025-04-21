import * as dateFns from "date-fns";
import {
  ChangeEvent,
  EventHandler,
  RefAttributes,
  useCallback,
  useState
} from "react";
import { Form, FormControlProps } from "react-bootstrap";

export function DateInput({
  currentValue,
  onValueChange,
  ref,
  ...rest
}: {
  currentValue?: Date;
  onValueChange: (d: Date) => void;
} & FormControlProps &
  RefAttributes<HTMLInputElement>) {
  const [inputValue, setInputValue] = useState<string>(
    currentValue && dateFns.isValid(currentValue)
      ? dateFns.formatISO(currentValue, { representation: "date" })
      : ""
  );
  const handleChange: EventHandler<ChangeEvent<HTMLInputElement>> = useCallback(
    (e) => {
      const d = dateFns.parseISO(e.currentTarget.value);
      if (dateFns.isValid(d)) {
        setInputValue(e.target.value);
        onValueChange(d);
      }
    },
    [setInputValue, onValueChange]
  );
  return (
    <Form.Control
      ref={ref}
      type="date"
      value={inputValue}
      onChange={handleChange}
      {...rest}
    />
  );
}
