import { MouseEventHandler, useCallback, useRef } from "react";
import { Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import { HistoryDataEntry, useAppState } from "./store";

export function HistoryDataRow({
  entry,
  timeout = 250,
  in: inProp // this is passed automatically by TransitionGroup
}: {
  entry: HistoryDataEntry;
  timeout?: number;
  in?: boolean;
}) {
  const { t } = useTranslation();
  const removeHistoryEntry = useAppState((state) => state.removeHistoryEntry);
  const handleRemoveEntryClick: MouseEventHandler<HTMLButtonElement> =
    useCallback(
      (e) => {
        console.log("remove entry" + entry.id);
        removeHistoryEntry(entry.id);
      },
      [removeHistoryEntry, entry.id]
    );
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      classNames={"item"}
      key={entry.id}
      in={inProp}
      timeout={timeout}
      nodeRef={nodeRef}
      unmountOnExit>
      <tr ref={nodeRef}>
        <td className="text-center">
          {entry.date &&
            t("history.table.rows.date", {
              value: new Date(entry.date)
            })}
        </td>
        <td className="numeric text-end">
          {entry.steps && t("history.table.rows.steps", { value: entry.steps })}
        </td>
        <td className="text-center">
          <Button
            variant="danger"
            title={t("history.remove_btn.title")}
            onClick={handleRemoveEntryClick}
            size="sm"
            data-entry-id={entry.id}>
            <Trash />
            <span className="visually-hidden">
              {t("history.remove_btn.label")}
            </span>
          </Button>
        </td>
      </tr>
    </CSSTransition>
  );
}
