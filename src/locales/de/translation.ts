const translation = {
  // "step" singular
  steps_one: "Schritt",
  // "step" plural
  steps_other: "Schritte",
  // "day" singular
  days_one: "Tag",
  // "day" plural
  days_other: "Tage",
  // "entry" singular
  entries_one: "Eintrag",
  // "entry" plural
  entries_other: "Einträge",
  app: {
    title: "Schrittrechner",
    nav: {
      today: {
        label: "Heute",
        title: "Fortschritt heute"
      },
      history: {
        label: "Verlauf",
        title: "Historische Zählungen"
      },
      options: {
        label: "Optionen",
        title: "Einstellungen"
      }
    }
  },
  main: {
    "today": {
      label: "Heutiges Datum",
      placeholder: "TT/MM/JJJJ"
    },
    "steps_completed": {
      label: "Schritte diesen Monat abgeschlossen"
    },
    "steps_remaining": {
      label: "Verbleibende Schritte diesen Monat",
      value: "{{ value, number }}"
    },
    "steps_remaining_per_day": {
      label: "Tägliche verbleibende Schritte diesen Monat",
      value: "{{ value, number }}"
    },
    "progress": {
      // Example: 100% of 180,000
      label:
        "{{ fractionComplete, number(style: percent; maximumFractionDigits: 0) }} von {{ stepsRequired,number(maximumFractionDigits:0) }}"
    },
    "calc-btn": {
      label: "Berechnen"
    },
    "message": {
      hint: "Hinweis: Füllen Sie das Formular aus und drücken Sie Berechnen",
      // Example: At your current rate of 6,200 steps per day, you will complete your steps in 3 days: 4/27/2025
      predicted_days:
        "Bei Ihrer aktuellen Rate von {{avgStepsPerDay, number(maximumFractionDigits:0)}} Schritten pro Tag werden Sie Ihre Schritte in {{projDaysRemain, relativetime(day)}} abschließen: {{dayToComplete, datetime}}.",
      congrats: "Herzlichen Glückwunsch, Sie haben Ihre Schritte für diesen Monat abgeschlossen!"
    }
  },
  options: {
    title: "Optionen",
    sections: {
      goal: {
        legend: "Persönlich"
      },
      app: {
        legend: "Anwendungseinstellungen"
      }
    },
    monthly_step_goal: {
      label: "Monatliches Schrittziel",
      help: "Wählen Sie, wie viele Schritte Sie jeden Monat erreichen möchten",
      suggestions: {
        // Example: 180,000 or about 6,000 per day
        label:
          "{{ monthly_steps,number }} oder etwa {{ daily_steps,number }} pro Tag"
      }
    },
    theme: {
      label: "Thema",
      help: "Wählen Sie das Erscheinungsbild der App",
      options: {
        auto: { label: "Systemthema" },
        light: { label: "Hell" },
        dark: { label: "Dunkel" }
      }
    },
    lang: {
      label: "Sprache",
      help: "Wählen Sie die Sprache der App",
      option: {
        // Example: English
        label: "{{lang, displayName(type:language) }}"
      }
    }
  },
  history: {
    title: "Schrittprotokoll",
    help: "Dies ist ein Protokoll Ihrer Schritte für den Monat. Sie können Einträge hinzufügen, entfernen oder bearbeiten.",
    summary: {
      toggle: {
        title: "Protokollzusammenfassung anzeigen"
      }
    },
    table: {
      header: {
        date: "Datum",
        steps: "Schritte"
      },
      rows: {
        // Formatted value in the Date column
        date: "{{ value, datetime(dateStyle: medium) }}",
        // Formatted value in the Steps column
        steps: "{{ value, number(maximumFractionDigits:0) }}"
      },
      // Example: Logged 30 entries between 4/1/2025 and 4/30/2025. Total steps in range: 185,000. Average: 6,167.
      summary:
        'Protokolliert {{ count, number }} $t(entries, {"count": {{count}}}) zwischen {{ fromDate, datetime(dateStyle: long) }} und {{ toDate, datetime(dateStyle: long) }}. Gesamtschritte im Bereich: {{ sum, number }}. Durchschnitt: {{ avg, number(maximumFractionDigits: 0) }}',
      caption: "Tägliches Schrittprotokoll",
      download: {
        title: "Maschinenlesbare Daten herunterladen",
        label: "Herunterladen",
        success: "Erfolg! Die Daten wurden in Ihre Zwischenablage kopiert."
      }
    },
    close_btn: {
      label: "Schließen",
      title: "Dialog schließen"
    },
    add_btn: {
      label: "Hinzufügen",
      title: "Zum Verlauf hinzufügen"
    },
    remove_btn: {
      title: "Eintrag entfernen",
      label: "Entfernen"
    },
    open_chart_btn: {
      label: "Diagramm öffnen",
      title: "Diagramm öffnen"
    },
    tabs: {
      add: {
        title: "Eintrag hinzufügen"
      },
      filter: {
        title: "Filter"
      }
    },
    filter: {
      fromDate: {
        label: "Von Datum",
        title: "Datum des frühesten anzuzeigenden Eintrags"
      },
      toDate: {
        label: "Bis Datum",
        title: "Datum des spätesten anzuzeigenden Eintrags"
      },
      filter_btn: {
        label: "Anwenden",
        title: "Filter anwenden"
      },
      filter_btn_reset: {
        label: "Zurücksetzen",
        title: "Werte auf Standard zurücksetzen"
      }
    },
    chart: {
      // X-axis category labels (Date)
      category: "{{ value, datetime(dateStyle: short) }}",
      // Example: Steps from April 1, 2025 to April 30, 2025
      title:
        "Schritte von {{ start, datetime(dateStyle: long) }} bis {{ end, datetime(dateStyle: long) }}",
      steps_set: {
        label: "Tägliche Schritte"
      },
      cum_set: {
        label: "Kumulative Schritte"
      },
      goal_line: {
        label: "Monatliches Ziel"
      }
    }
  }
};
export default translation;
