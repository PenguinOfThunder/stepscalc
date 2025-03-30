/* eslint-disable require-jsdoc */
import classNames from "classnames";
import { withTranslation } from "react-i18next";
import { Translate, CircleHalf, Trophy } from "react-bootstrap-icons";

function Options({ t, show }) {
  return (
    <div
      id='optionsModal'
      className={classNames("modal", "fade", { show })}
      tabIndex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden={show ? "false" : "true"}>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5'>{t("options.title")}</h1>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label={t("close_btn.label")}></button>
          </div>
          <div className='modal-body'>
            <form
              className='form'
              id='optionsForm'>
              <div className='form-group'>
                <label
                  htmlFor='daily-step-goal'
                  className='form-label'>
                  {t("monthly_step_goal.label")}
                </label>
                <input
                  id='daily-step-goal'
                  name='daily-step-goal'
                  type='number'
                  className='form-control'
                  defaultValue='180000'
                  min='0'
                  step='1000'
                />
                <Trophy />
              </div>
              <div className='form-group'>
                <label htmlFor='app-theme-select'>{t("theme.label")}</label>
                <select
                  className='form-select'
                  id='app-theme-select'
                  name='app-theme'>
                  <option value='auto'>{t("theme.auto")}</option>
                  <option value='light'>{t("theme.light")}</option>
                  <option value='dark'>{t("theme.dark")}</option>
                </select>
                <CircleHalf />
              </div>
              <div className='form-group'>
                <label>{t("app-lang.label")}</label>
                <select
                  className='form-select'
                  id='app-lang-select'
                  name='app-lang'>
                  <option value='en'>
                    {t("app-lang.option.label", { lang: "en", to: "en" })}
                  </option>
                  <option value='nb'>
                    {t("app-lang.option.label", { lang: "nb", to: "nb" })}
                  </option>
                  <option value='nn'>
                    {t("app-lang.option.label", { lang: "nn", to: "nn" })}
                  </option>
                  <option value='es'>
                    {t("app-lang.option.label", { lang: "es", to: "es" })}
                  </option>
                </select>
                <Translate />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withTranslation()(Options);
