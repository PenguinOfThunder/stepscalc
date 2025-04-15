const translation = {
  steps_one: "skritt",
  steps_other: "skritt",
  days_one: "dag",
  days_other: "dager",
  entries_one: "oppføring",
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
        label: "Innstillinger",
        title: "Innstillinger"
      }
    }
  },
  main: {
    today: {
      label: "Dagens dato",
      placeholder: "dd.mm.åååå"
    },
    steps_completed: {
      label: "Skritt fullført denne måneden"
    },
    steps_remaining: {
      label: "Gjenstående skritt denne måneden",
      value: "{{ value, number }}"
    },
    steps_remaining_per_day: {
      label: "Daglige gjenstående skritt denne måneden",
      value: "{{ value, number }}"
    },
    progress: {
      label: "{{ fractionComplete, number(style: percent; maximumFractionDigits: 0) }} av {{ stepsRequired,number(maximumFractionDigits:0) }}"
    },
    "calc-btn": {
      label: "Beregn"
    },
    message: {
      hint: "Tips: Fyll ut skjemaet og trykk Beregn",
      predicted_days: "Med din nåværende rate på {{avgStepsPerDay, number(maximumFractionDigits:0)}} skritt per dag, vil du fullføre dine skritt {{projDaysRemain, relativetime(day)}}: {{dayToComplete,datetime}}.",
      congrats: "Gratulerer, du er ferdig med skrittene for måneden!"
    }
  },
  options: {
    title: "Innstillinger",
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
        label: "{{ monthly_steps,number }} eller omtrent {{ daily_steps,number }} per dag"
      }
    },
    theme: {
      label: "Tema",
      help: "Velg utseendet til appen",
      options: {
        auto: { label: "Automatisk" },
        light: { label: "Lyst" },
        dark: { label: "Mørkt" }
      }
    },
    lang: {
      label: "Språk",
      help: "Velg språket for appen",
      option: {
        label: "{{lang, displayName(type:language) }}"
      }
    }
  },
  history: {
    title: "Skrittlogg",
    help: "Dette er en logg over dine skritt for måneden. Du kan legge til, fjerne eller redigere oppføringer.",
    table: {
      header: {
        date: "Dato",
        steps: "Skritt"
      },
      rows: {
        date: "{{ value, datetime }}",
        steps: "{{ value, number(maximumFractionDigits:0) }}"
      },
      summary: "Fant {{ count, number }} $t(entries, {\"count\": {{count}}}) mellom {{ fromDate, datetime }} og {{ toDate, datetime }}. Totalt antall skritt i perioden: {{ sum, number }}. Gjennomsnitt: {{ avg, number }}",
      caption: "Loggoppføringer"
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
      category: "{{ value, datetime(dateStyle: short) }}",
      title: "Steg fra {{ start, datetime }} til {{ end, datetime }}",
      steps_set: {
        label: "Daglige steg"
      }
    }
  }
};

export default translation;
