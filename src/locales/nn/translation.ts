const translation = {
  // "step" singular
  steps_one: "steg",
  // "step" plural
  steps_other: "steg",
  // "day" singular
  days_one: "dag",
  // "day" plural
  days_other: "dagar",
  // "entry" singular
  entries_one: "oppføring",
  // "entry" plural
  entries_other: "oppføringar",
  app: {
    title: "Stegkalkulator",
    nav: {
      today: {
        label: "I dag",
        title: "Framgang i dag"
      },
      history: {
        label: "Historikk",
        title: "Historiske tal"
      },
      options: {
        label: "Innstillingar",
        title: "Innstillingar"
      }
    }
  },
  main: {
    "today": {
      label: "Dagens dato",
      placeholder: "dd.mm.åååå"
    },
    "steps_completed": {
      label: "Steg fullførte denne månaden"
    },
    "steps_remaining": {
      label: "Steg att denne månaden",
      value: "{{ value, number }}"
    },
    "steps_remaining_per_day": {
      label: "Daglege steg att denne månaden",
      value: "{{ value, number }}"
    },
    "progress": {
      // Example: 100% of 180,000
      label:
        "{{ fractionComplete, number(style: percent; maximumFractionDigits: 0) }} av {{ stepsRequired,number(maximumFractionDigits:0) }}"
    },
    "calc-btn": {
      label: "Rekn ut"
    },
    "message": {
      hint: "Tips: Fyll ut skjemaet og trykk på Rekn ut",
      // Example: At your current rate of 6,200 steps per day, you will complete your steps in 3 days: 4/27/2025
      predicted_days:
        "Med ditt noverande tempo på {{avgStepsPerDay, number(maximumFractionDigits:0)}} steg per dag, vil du fullføre stega dine om {{projDaysRemain, relativetime(day)}}: {{dayToComplete, datetime}}.",
      congrats: "Gratulerer, du er ferdig med stega dine for månaden!"
    }
  },
  options: {
    title: "Innstillingar",
    sections: {
      goal: {
        legend: "Personleg"
      },
      app: {
        legend: "Applikasjonsinnstillingar"
      }
    },
    monthly_step_goal: {
      label: "Månadsstegmål",
      help: "Vel kor mange steg du ønskjer å nå kvar månad",
      suggestions: {
        // Example: 180,000 or about 6,000 per day
        label:
          "{{ monthly_steps,number }} eller om lag {{ daily_steps,number }} per dag"
      }
    },
    theme: {
      label: "Tema",
      help: "Vel utsjånaden til appen",
      options: {
        auto: { label: "Systemtema" },
        light: { label: "Lyst" },
        dark: { label: "Mørkt" }
      }
    },
    lang: {
      label: "Språk",
      help: "Vel språket for appen",
      option: {
        // Example: English
        label: "{{lang, displayName(type:language) }}"
      }
    }
  },
  history: {
    title: "Steglogg",
    help: "Dette er ein logg over stega dine for månaden. Du kan leggje til, fjerne eller redigere oppføringar.",
    summary: {
      toggle: {
        title: "Vis loggsamandrag"
      }
    },
    table: {
      header: {
        date: "Dato",
        steps: "Steg"
      },
      rows: {
        // Formatted value in the Date column
        date: "{{ value, datetime(dateStyle: medium) }}",
        // Formatted value in the Steps column
        steps: "{{ value, number(maximumFractionDigits:0) }}"
      },
      // Example: Logged 30 entries between 4/1/2025 and 4/30/2025. Total steps in range: 185,000. Average: 6,167.
      summary:
        'Logga {{ count, number }} $t(entries, {"count": {{count}}}) mellom {{ fromDate, datetime(dateStyle: long) }} og {{ toDate, datetime(dateStyle: long) }}. Totalt steg i perioden: {{ sum, number }}. Gjennomsnitt: {{ avg, number(maximumFractionDigits: 0) }}',
      caption: "Dagleg stegliste"
    },
    close_btn: {
      label: "Lukk",
      title: "Lukk dialogen"
    },
    add_btn: {
      label: "Legg til",
      title: "Legg til i historikken"
    },
    remove_btn: {
      title: "Fjern oppføring",
      label: "Fjern"
    },
    open_chart_btn: {
      label: "Opne diagram",
      title: "Opne diagram"
    },
    tabs: {
      add: {
        title: "Legg til oppføring"
      },
      filter: {
        title: "Filter"
      }
    },
    filter: {
      fromDate: {
        label: "Frå dato",
        title: "Datoen for den tidlegaste oppføringa som skal visast"
      },
      toDate: {
        label: "Til dato",
        title: "Datoen for den seinaste oppføringa som skal visast"
      },
      filter_btn: {
        label: "Bruk",
        title: "Bruk filter"
      },
      filter_btn_reset: {
        label: "Tilbakestill",
        title: "Set verdiane tilbake til standard"
      }
    },
    chart: {
      // X-axis category labels (Date)
      category: "{{ value, datetime(dateStyle: short) }}",
      // Example: Steps from April 1, 2025 to April 30, 2025
      title:
        "Steg frå {{ start, datetime(dateStyle: long) }} til {{ end, datetime(dateStyle: long) }}",
      steps_set: {
        label: "Daglege steg"
      },
      cum_set: {
        label: "Kumulative steg"
      },
      goal_line: {
        label: "Månadsstegmål"
      }
    }
  }
};
export default translation;
