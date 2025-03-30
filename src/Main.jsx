/* eslint-disable require-jsdoc */
import { useReducer, useCallback, useMemo } from "react";
import { withTranslation } from "react-i18next";
import { Calculator, Icon123, CalendarDate } from "react-bootstrap-icons";
import * as dateFns from "date-fns";

function calc(today, stepsCompleted, stepsRequired) {
  const values = {
    today,
    stepsCompleted,
    stepsRequired,
    avgStepsPerDay: Number.NaN,
    projDaysRemain: Number.NaN,
    dayToComplete: undefined,
    fractionComplete: 0,
    stepsRemaining: Number.NaN,
    stepsRemainingPerDay: Number.NaN
  };
  if (dateFns.isValid(today)) {
    const monthStart = dateFns.startOfMonth(today);
    const monthEnd = dateFns.endOfMonth(today);
    const daysRemaining = dateFns.differenceInDays(monthEnd, today);
    const stepsRemaining =
      stepsRequired > 0 ? stepsRequired - stepsCompleted : 0;
    const stepsRemainingPerDay = Math.ceil(stepsRemaining / daysRemaining);
    const daysPast = dateFns.differenceInDays(today, monthStart) + 1;
    const avgStepsPerDay = stepsCompleted / daysPast;
    const projDaysRemain = Math.ceil(stepsRemaining / avgStepsPerDay);
    const dayToComplete = dateFns.addDays(today, projDaysRemain);
    const fractionComplete = stepsCompleted / stepsRequired;
    values.avgStepsPerDay = avgStepsPerDay;
    values.projDaysRemain = projDaysRemain;
    values.dayToComplete = dayToComplete;
    values.fractionComplete = fractionComplete;
    values.stepsRemaining = stepsRemaining;
    values.stepsRemainingPerDay = stepsRemainingPerDay;
    values.stepsCompleted = stepsCompleted;
    values.stepsRequired = stepsRequired;
  }
  return values;
}

const myreducer = (state, action) => {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

function Main({ t }) {
  const [state, dispatch] = useReducer(myreducer, {
    today: new Date(),
    stepsCompleted: 0,
    stepsRequired: 180000
  });
  const cv = calc(state.today, state.stepsCompleted, state.stepsRequired);
  // Determine message text
  const message = useMemo(() => {
    if (
      Number.isFinite(cv.avgStepsPerDay) &&
      Number.isFinite(cv.projDaysRemain) &&
      cv.projDaysRemain > 0
    ) {
      return t("predicted_days.text", {
        avgStepsPerDay: cv.avgStepsPerDay,
        projDaysRemain: cv.projDaysRemain,
        dayToComplete: cv.dayToComplete,
        formatParams: {
          projDaysRemain: { style: "long", numeric: "auto" },
          dayToComplete: {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
          }
        }
      });
    } else if (cv.projDaysRemain <= 0) {
      // "Congratulations, you are done with your steps for the month!";
      return t("congrats.text");
    } else {
      // "Hint: Fill in the form and press Calculate";
      return t("hint.text");
    }
  }, [
    cv.today,
    cv.avgStepsPerDay,
    cv.projDaysRemain,
    cv.dayToComplete,
    cv.stepsCompleted,
    cv.stepsRequired,
    cv,
    t
  ]);

  const handleChangeToday = useCallback(
    (e) =>
      dispatch({
        type: "update",
        payload: { today: dateFns.parseISO(e.currentTarget.value) }
      }),
    [dispatch]
  );

  return (
    <main>
      <form
        id='calc-form'
        className='form needs-validation'
        action='#'
        method='post'
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }}>
        <div className='input-group mb-1 form-floating'>
          <input
            className='form-control'
            id='today'
            name='today'
            type='date'
            value={
              dateFns.isValid(state.today)
                ? dateFns.format(state.today, "yyyy-MM-dd")
                : ""
            }
            onChange={handleChangeToday}
            required
            placeholder={t("today.placeholder")}
          />
          <label
            className='form-label'
            htmlFor='today'>
            {t("today.label")}
          </label>
          <span className='input-group-text'>
            <CalendarDate />
          </span>
        </div>
        <div className='input-group form-floating mb-1'>
          <input
            className='form-control'
            id='steps_completed'
            name='steps_completed'
            type='number'
            min='0'
            step='100'
            required
            placeholder='nnnnnn'
            autoFocus
            value={state.stepsCompleted}
            onChange={(e) =>
              dispatch({
                type: "update",
                payload: { stepsCompleted: parseInt(e.currentTarget.value) }
              })
            }
          />
          <label
            className='form-label'
            htmlFor='steps_completed'>
            {t("steps_completed.label")}
          </label>
          <span className='input-group-text'>
            <Icon123 />
          </span>
        </div>
        <div className='input-group form-floating mb-1'>
          <input
            className='form-control'
            id='steps_required'
            name='steps_required'
            type='number'
            value={state.stepsRequired ?? 0}
            min='0'
            step='1000'
            required
            readOnly
            placeholder='nnnnnn'
          />
          <label
            className='form-label'
            htmlFor='steps_required'>
            {t("steps_required.label")}
          </label>
          <span className='input-group-text'>
            <Icon123 />
          </span>
        </div>
        <div className='input-group form-floating mb-1'>
          <input
            className='form-control'
            id='steps_remaining'
            name='steps_remaining'
            readOnly
            placeholder='nnnnnn'
            value={cv.stepsRemaining ?? 0}
          />
          <label
            className='form-label'
            htmlFor='steps_remaining'>
            {t("steps_remaining.label")}
          </label>
        </div>
        <div className='input-group form-floating mb-1'>
          <input
            className='form-control'
            id='steps_remaining_per_day'
            name='steps_remaining_per_day'
            readOnly
            placeholder='nnnn'
            value={cv.stepsRemainingPerDay ?? 0}
          />
          <label
            className='form-label'
            htmlFor='steps_remaining_per_day'>
            {t("steps_remaining_per_day.label")}
          </label>
        </div>
        <div className='mt-2 mb-2'>
          <button
            id='calc-btn'
            className='btn btn-primary'
            type='submit'>
            <Calculator className='me-1' />
            <span>{t("calc-btn.label")}</span>
          </button>
        </div>
      </form>
      <div
        id='steps_progress'
        className='progress'
        role='progressbar'
        aria-label='Progress'
        aria-valuemin='0'
        aria-valuemax='100'
        aria-valuenow={cv.fractionComplete * 100}>
        <div
          id='progress-bar'
          className='progress-bar bg-success overflow-visible'
          role='progressbar'
          style={{ width: `${cv.fractionComplete * 100}%` }}>
          {t("progress.text", { fractionComplete: cv.fractionComplete })}
        </div>
      </div>
      <div
        id='message'
        className='mt-2 alert alert-info'
        role='alert'>
        {message}
      </div>
    </main>
  );
}

export default withTranslation()(Main);
