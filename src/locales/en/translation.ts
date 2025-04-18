const translation = {
  // "step" singular
  steps_one: "step",
  // "step" plural
  steps_other: "steps",
  // "day" singular
  days_one: "day",
  // "day" plural
  days_other: "days",
  // "entry" singular
  entries_one: "entry",
  // "entry" plural
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
      // Example: 100% of 180,000
      label:
        "{{ fractionComplete, number(style: percent; maximumFractionDigits: 0) }} of {{ stepsRequired,number(maximumFractionDigits:0) }}"
    },
    "calc-btn": {
      label: "Calculate"
    },
    "message": {
      hint: "Hint: Fill in the form and press Calculate",
      // Example: At your current rate of 6,200 steps per day, you will complete your steps in 3 days: 4/27/2025
      predicted_days:
        "At your current rate of {{avgStepsPerDay, number(maximumFractionDigits:0)}} steps per day, you will complete your steps {{projDaysRemain, relativetime(day)}}: {{dayToComplete, datetime}}.",
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
        // Example: 180,000 or about 6,000 per day
        label:
          "{{ monthly_steps,number }} or about {{ daily_steps,number }} per day"
      }
    },
    theme: {
      label: "Theme",
      help: "Select the appearance of the app",
      options: {
        auto: { label: "System theme" },
        light: { label: "Light" },
        dark: { label: "Dark" }
      }
    },
    lang: {
      label: "Language",
      help: "Select the language for the app",
      option: {
        // Example: English
        label: "{{lang, displayName(type:language) }}"
      }
    }
  },
  history: {
    title: "Steps Log",
    help: "This is a log of your steps for the month. You can add, remove, or edit entries.",
    summary: {
      toggle: {
        title: "Show log summary"
      }
    },
    table: {
      header: {
        date: "Date",
        steps: "Steps"
      },
      rows: {
        // Formatted value in the Date column
        date: "{{ value, datetime(dateStyle: medium) }}",
        // Formatted value in the Steps column
        steps: "{{ value, number(maximumFractionDigits:0) }}"
      },
      // Example: Logged 30 entries between 4/1/2025 and 4/30/2025. Total steps in range: 185,000. Average: 6,167.
      summary:
        'Logged {{ count, number }} $t(entries, {"count": {{count}}}) between {{ fromDate, datetime(dateStyle: long) }} and {{ toDate, datetime(dateStyle: long) }}. Total steps in range: {{ sum, number }}. Average: {{ avg, number(maximumFractionDigits: 0) }}',
      caption: "Daily steps log",
      download: {
        title: "Download machine-readable data",
        label: "Download",
        success: "Success! The data was copied to your clipboard."
      }
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
    open_chart_btn: {
      label: "Open chart",
      title: "Open chart"
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
      // X-axis category labels (Date)
      category: "{{ value, datetime(dateStyle: short) }}",
      // Example: Steps from April 1, 2025 to April 30, 2025
      title:
        "Steps from {{ start, datetime(dateStyle: long) }} to {{ end, datetime(dateStyle: long) }}",
      steps_set: {
        label: "Daily Steps"
      },
      cum_set: {
        label: "Cumulative Steps"
      },
      goal_line: {
        label: "Monthly goal"
      }
    }
  }
};
export default translation;
