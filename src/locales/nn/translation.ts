const translation = {
  steps_one: "steg",
  steps_other: "steg",
  days_one: "dag",
  days_other: "dagar",
  entries_one: "oppføring",
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
      label: "Steg som står att denne månaden",
      value: "{{ value, number }}"
    },
    "steps_remaining_per_day": {
      label: "Daglege steg som står att denne månaden",
      value: "{{ value, number }}"
    },
    "progress": {
      label:
        "{{ fractionComplete, number(style: percent; maximumFractionDigits: 0) }} av {{ stepsRequired,number(maximumFractionDigits:0) }}"
    },
    "calc-btn": {
      label: "Rekn ut"
    },
    "message": {
      hint: "Tips: Fyll ut skjemaet og trykk Rekn ut",
      predicted_days:
        "Med ditt noverande tempo på {{avgStepsPerDay, number(maximumFractionDigits:0)}} steg per dag, vil du fullføre stega dine {{projDaysRemain, relativetime(day)}}: {{dayToComplete,datetime}}.",
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
      label: "Månadsleg steg-mål",
      help: "Vel kor mange steg du ønskjer å nå kvar månad",
      suggestions: {
        label:
          "{{ monthly_steps,number }} eller om lag {{ daily_steps,number }} per dag"
      }
    },
    theme: {
      label: "Tema",
      help: "Vel utsjånaden til appen",
      options: {
        auto: { label: "Automatisk" },
        light: { label: "Lyst" },
        dark: { label: "Mørkt" }
      }
    },
    lang: {
      label: "Språk",
      help: "Vel språket for appen",
      option: {
        label: "{{lang, displayName(type:language) }}"
      }
    }
  },
  history: {
    title: "Steglogg",
    help: "Dette er ein logg over stega dine for månaden. Du kan legge til, fjerne eller redigere oppføringar.",
    table: {
      header: {
        date: "Dato",
        steps: "Steg"
      },
      rows: {
        date: "{{ value, datetime }}",
        steps: "{{ value, number(maximumFractionDigits:0) }}"
      },
      summary:
        'Fann {{ count, number }} $t(entries, {"count": {{count}}}) mellom {{ fromDate, datetime }} og {{ toDate, datetime }}. Totalt steg i perioden: {{ sum, number }}. Gjennomsnitt: {{ avg, number }}',
      caption: "Loggoppføringar"
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
        title: "Filtrer"
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
        label: "Nullstill",
        title: "Set verdiane tilbake til standard"
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
