const translation = {
  // "step" singular
  steps_one: "skritt",
  // "step" plural
  steps_other: "skritt",
  // "day" singular
  days_one: "dag",
  // "day" plural
  days_other: "dager",
  // "entry" singular
  entries_one: "oppføring",
  // "entry" plural
  entries_other: "oppføringer",
  app: {
    title: "Skrittkalkulator",
    nav: {
      today: {
        label: "I dag",
        title: "Fremgang i dag"
      },
      history: {
        label: "Historikk",
        title: "Historiske tellinger"
      },
      options: {
        label: "Alternativer",
        title: "Innstillinger"
      }
    }
  },
  main: {
    "today": {
      label: "Dagens dato",
      placeholder: "dd.mm.åååå"
    },
    "steps_completed": {
      label: "Skritt fullført denne måneden"
    },
    "steps_remaining": {
      label: "Skritt gjenstår denne måneden",
      value: "{{ value, number }}"
    },
    "steps_remaining_per_day": {
      label: "Daglige skritt gjenstår denne måneden",
      value: "{{ value, number }}"
    },
    "progress": {
      // Example: 100% of 180,000
      label:
        "{{ fractionComplete, number(style: percent; maximumFractionDigits: 0) }} av {{ stepsRequired,number(maximumFractionDigits:0) }}"
    },
    "calc-btn": {
      label: "Beregn"
    },
    "message": {
      hint: "Tips: Fyll ut skjemaet og trykk Beregn",
      // Example: At your current rate of 6,200 steps per day, you will complete your steps in 3 days: 4/27/2025
      predicted_days:
        "Med din nåværende hastighet på {{avgStepsPerDay, number(maximumFractionDigits:0)}} skritt per dag, vil du fullføre skrittene dine om {{projDaysRemain, relativetime(day)}}: {{dayToComplete, datetime}}.",
      congrats: "Gratulerer, du er ferdig med skrittene dine for måneden!"
    }
  },
  options: {
    title: "Alternativer",
    sections: {
      goal: {
        legend: "Personlig"
      },
      app: {
        legend: "Applikasjonsinnstillinger"
      }
    },
    monthly_step_goal: {
      label: "Månedlig skrittmål",
      help: "Velg hvor mange skritt du ønsker å nå hver måned",
      suggestions: {
        // Example: 180,000 or about 6,000 per day
        label:
          "{{ monthly_steps,number }} eller omtrent {{ daily_steps,number }} per dag"
      }
    },
    theme: {
      label: "Tema",
      help: "Velg utseendet til appen",
      options: {
        auto: { label: "Systemtema" },
        light: { label: "Lyst" },
        dark: { label: "Mørkt" }
      }
    },
    lang: {
      label: "Språk",
      help: "Velg språket for appen",
      option: {
        // Example: English
        label: "{{lang, displayName(type:language) }}"
      }
    }
  },
  history: {
    title: "Skrittlogg",
    help: "Dette er en logg over skrittene dine for måneden. Du kan legge til, fjerne eller redigere oppføringer.",
    summary: {
      toggle: {
        title: "Vis loggsammendrag"
      }
    },
    table: {
      header: {
        date: "Dato",
        steps: "Skritt"
      },
      rows: {
        // Formatted value in the Date column
        date: "{{ value, datetime(dateStyle: medium) }}",
        // Formatted value in the Steps column
        steps: "{{ value, number(maximumFractionDigits:0) }}"
      },
      // Example: Logged 30 entries between 4/1/2025 and 4/30/2025. Total steps in range: 185,000. Average: 6,167.
      summary:
        'Logget {{ count, number }} $t(entries, {"count": {{count}}}) mellom {{ fromDate, datetime(dateStyle: long) }} og {{ toDate, datetime(dateStyle: long) }}. Totalt antall skritt i perioden: {{ sum, number }}. Gjennomsnitt: {{ avg, number(maximumFractionDigits: 0) }}',
      caption: "Daglig skrittlogg",
      download: {
        title: "Last ned maskinlesbare data",
        label: "Last ned",
        success: "Suksess! Dataene ble kopiert til utklippstavlen din."
      }
    },
    close_btn: {
      label: "Lukk",
      title: "Lukk dialog"
    },
    add_btn: {
      label: "Legg til",
      title: "Legg til i historikk"
    },
    remove_btn: {
      title: "Fjern oppføring",
      label: "Fjern"
    },
    open_chart_btn: {
      label: "Åpne diagram",
      title: "Åpne diagram"
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
        label: "Fra dato",
        title: "Dato for den tidligste oppføringen som skal vises"
      },
      toDate: {
        label: "Til dato",
        title: "Dato for den siste oppføringen som skal vises"
      },
      filter_btn: {
        label: "Bruk",
        title: "Bruk filtre"
      },
      filter_btn_reset: {
        label: "Tilbakestill",
        title: "Sett verdier tilbake til standard"
      }
    },
    chart: {
      // X-axis category labels (Date)
      category: "{{ value, datetime(dateStyle: short) }}",
      // Example: Steps from April 1, 2025 to April 30, 2025
      title:
        "Skritt fra {{ start, datetime(dateStyle: long) }} til {{ end, datetime(dateStyle: long) }}",
      steps_set: {
        label: "Daglige skritt"
      },
      cum_set: {
        label: "Kumulative skritt"
      },
      goal_line: {
        label: "Månedlig mål"
      }
    }
  }
};
export default translation;
