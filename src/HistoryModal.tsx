import * as dateFns from "date-fns";
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { Button, FloatingLabel, Form, Modal, Table } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useShallow } from "zustand/shallow";
import { HistoryDataEntry, useAppState } from "./store";

function DataRow({
  entry,
  timeout = 250
}: {
  entry: HistoryDataEntry;
  timeout?: number;
}) {
  const { t } = useTranslation();
  const [deleted, setDeleted] = useState(false);
  const removeHistoryEntry = useAppState((state) => state.removeHistoryEntry);
  const handleRemoveEntryClick: MouseEventHandler<HTMLButtonElement> =
    useCallback(
      (e) => {
        console.log("remove entry" + entry.id);
        removeHistoryEntry(entry.id);
        setDeleted(true);
      },
      [removeHistoryEntry, entry.id]
    );
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      classNames={"item"}
      key={entry.id}
      in={!deleted}
      exit={deleted}
      timeout={timeout}
      nodeRef={nodeRef}
      onExiting={() => console.log("I am exiting")}
      onExit={() => console.log("I exit")}>
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

export function HistoryModal({
  show,
  handleClose
}: {
  show: boolean;
  handleClose: () => void;
}) {
  const { t } = useTranslation();
  const { addHistoryEntry, stepsCompleted, today } = useAppState(
    useShallow((state) => ({
      addHistoryEntry: state.addHistoryEntry,
      stepsCompleted: state.stepsCompleted,
      today: state.today
    }))
  );
  const historyData = useAppState((state) => state.historyData);
  const seriesSorted = historyData.toSorted(
    (a, b) => -dateFns.differenceInMilliseconds(a.date, b.date)
  );
  const [addDate, setAddDate] = useState(today);
  const [addSteps, setAddSteps] = useState(stepsCompleted);
  useEffect(() => {
    setAddDate(today);
    setAddSteps(stepsCompleted);
  }, [stepsCompleted, today, show]);

  const handleAddCurrentStepsClick = useCallback(() => {
    const newEntry: HistoryDataEntry = {
      id: crypto.randomUUID(),
      date: addDate.getTime(),
      steps: addSteps
    };
    addHistoryEntry(newEntry);
    setAddDate(today);
    setAddSteps(stepsCompleted);
  }, [
    addHistoryEntry,
    setAddDate,
    setAddSteps,
    addDate,
    addSteps,
    today,
    stepsCompleted
  ]);
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      fullscreen="md-down"
      backdrop="static"
      scrollable>
      <Modal.Header closeButton>
        <Modal.Title>{t("history.title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="row">
          <FloatingLabel
            className="col"
            controlId="add_date"
            label={t("history.table.header.date")}>
            <Form.Control
              type="date"
              value={dateFns.formatISO(addDate, { representation: "date" })}
              onChange={(e) => setAddDate(dateFns.parseISO(e.target.value))}
              required
            />
          </FloatingLabel>
          <FloatingLabel
            label={t("history.table.header.steps")}
            controlId="add_steps"
            className="col">
            <Form.Control
              type="number"
              min="0"
              step="100"
              value={addSteps}
              required
              onChange={(e) => setAddSteps(parseInt(e.target.value, 10))}
            />
          </FloatingLabel>
          <Form.Group className="col">
            <Button
              type="button"
              variant="primary"
              onClick={handleAddCurrentStepsClick}
              title={t("history.add_btn.title")}>
              {t("history.add_btn.label")}
            </Button>
          </Form.Group>
          <Form.Text>{t("history.help")}</Form.Text>
        </Form>
        <Table
          className="mt-1"
          size="sm"
          bordered
          responsive
          hover>
          <thead>
            <tr>
              <th className="col-5 text-center">
                {t("history.table.header.date")}
              </th>
              <th className="col-5 text-center">
                {t("history.table.header.steps")}
              </th>
              <th className="col-2 text-center">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <TransitionGroup
              component={null}
              classNames="item">
              {seriesSorted &&
                seriesSorted.map((entry) => (
                  <DataRow
                    key={entry.id}
                    entry={entry}
                  />
                ))}
            </TransitionGroup>
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
}

export default HistoryModal;
