import * as dateFns from "date-fns";
import {
  ChangeEvent,
  EventHandler,
  useCallback,
  useState
} from "react";
import { Form, FormControlProps } from "react-bootstrap";

export function DateInput({
  currentValue,
  onValueChange,
  ...rest
}: {
  currentValue?: Date;
  onValueChange: (d: Date) => void;
} & FormControlProps) {
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
      type="date"
      value={inputValue}
      onChange={handleChange}
      {...rest}
    />
  );
}
