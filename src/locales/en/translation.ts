const translation = {
  steps_one: "step",
  steps_other: "steps",
  days_one: "day",
  days_other: "days",
  entries_one: "entry",
  entries_other: "entries",
  app: {
    title: "Steps Calculator",
    nav: {
      today: {
        label: "Today",
        title: "Progress today"
      },
      history: {
        label: "History",
        title: "Historical counts"
      },
      options: {
        label: "Options",
        title: "Settings"
      }
    }
  },
  main: {
    "today": {
      label: "Today's Date",
      placeholder: "mm/dd/yyyy"
    },
    "steps_completed": {
      label: "Steps Completed This Month"
    },
    "steps_remaining": {
      label: "Steps Remaining This Month",
      value: "{{ value, number }}"
    },
    "steps_remaining_per_day": {
      label: "Daily Steps Remaining This Month",
      value: "{{ value, number }}"
    },
    "progress": {
      label:
        "{{ fractionComplete, number(style: percent; maximumFractionDigits: 0) }} of {{ stepsRequired,number(maximumFractionDigits:0) }}"
    },
    "calc-btn": {
      label: "Calculate"
    },
    "message": {
      hint: "Hint: Fill in the form and press Calculate",
      predicted_days:
        "At your current rate of {{avgStepsPerDay, number(maximumFractionDigits:0)}} steps per day, you will complete your steps {{projDaysRemain, relativetime(day)}}: {{dayToComplete,datetime}}.",
      congrats: "Congratulations, you are done with your steps for the month!"
    }
  },
  options: {
    title: "Options",
    sections: {
      goal: {
        legend: "Personal"
      },
      app: {
        legend: "Application Settings"
      }
    },
    monthly_step_goal: {
      label: "Monthly step goal",
      help: "Select how many steps you would like to reach every month",
      suggestions: {
        label:
          "{{ monthly_steps,number }} or about {{ daily_steps,number }} per day"
      }
    },
    theme: {
      label: "Theme",
      help: "Select the appearance of the app",
      options: {
        auto: { label: "Automatic" },
        light: { label: "Light" },
        dark: { label: "Dark" }
      }
    },
    lang: {
      label: "Language",
      help: "Select the language for the app",
      option: {
        label: "{{lang, displayName(type:language) }}"
      }
    }
  },
  history: {
    title: "Steps Log",
    help: "This is a log of your steps for the month. You can add, remove, or edit entries.",
    table: {
      header: {
        date: "Date",
        steps: "Steps"
      },
      rows: {
        date: "{{ value, datetime }}",
        steps: "{{ value, number(maximumFractionDigits:0) }}"
      },
      summary:
        'Found {{ count, number }} $t(entries, {"count": {{count}}}) between {{ fromDate, datetime }} and {{ toDate, datetime }}. Total steps in range: {{ sum, number }}. Average: {{ avg, number(maximumFractionDigits: 0) }}',
      caption: "Log entries"
    },
    close_btn: {
      label: "Close",
      title: "Close dialog"
    },
    add_btn: {
      label: "Add",
      title: "Add to history"
    },
    remove_btn: {
      title: "Remove entry",
      label: "Remove"
    },
    tabs: {
      add: {
        title: "Add Entry"
      },
      filter: {
        title: "Filter"
      }
    },
    filter: {
      fromDate: {
        label: "From Date",
        title: "Date of the earliest entry to show"
      },
      toDate: {
        label: "To Date",
        title: "Date of the latest entry to show"
      },
      filter_btn: {
        label: "Apply",
        title: "Apply filters"
      },
      filter_btn_reset: {
        label: "Reset",
        title: "Set values back to defaults"
      }
    },
    chart: {
      category: "{{ value, datetime(dateStyle: short) }}",
      title: "Steps from {{ start, datetime }} to {{ end, datetime }}",
      steps_set: {
        label: "Daily Steps"
      }
    }
  }
};
export default translation;
