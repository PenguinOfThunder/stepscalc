const translation = {
  // "step" singular
  steps_one: "pas",
  // "step" plural
  steps_other: "pas",
  // "day" singular
  days_one: "jour",
  // "day" plural
  days_other: "jours",
  // "entry" singular
  entries_one: "entrée",
  // "entry" plural
  entries_other: "entrées",
  app: {
    title: "Calculateur de Pas",
    nav: {
      today: {
        label: "Aujourd'hui",
        title: "Progrès aujourd'hui"
      },
      history: {
        label: "Historique",
        title: "Comptes historiques"
      },
      options: {
        label: "Options",
        title: "Paramètres"
      }
    }
  },
  main: {
    "today": {
      label: "Date d'aujourd'hui",
      placeholder: "jj/mm/aaaa"
    },
    "steps_completed": {
      label: "Pas complétés ce mois-ci"
    },
    "steps_remaining": {
      label: "Pas restants ce mois-ci",
      value: "{{ value, number }}"
    },
    "steps_remaining_per_day": {
      label: "Pas quotidiens restants ce mois-ci",
      value: "{{ value, number }}"
    },
    "progress": {
      // Example: 100% of 180,000
      label:
        "{{ fractionComplete, number(style: percent; maximumFractionDigits: 0) }} de {{ stepsRequired,number(maximumFractionDigits:0) }}"
    },
    "calc-btn": {
      label: "Calculer"
    },
    "message": {
      hint: "Astuce : Remplissez le formulaire et appuyez sur Calculer",
      // Example: At your current rate of 6,200 steps per day, you will complete your steps in 3 days: 4/27/2025
      predicted_days:
        "À votre rythme actuel de {{avgStepsPerDay, number(maximumFractionDigits:0)}} pas par jour, vous terminerez vos pas {{projDaysRemain, relativetime(day)}} : {{dayToComplete, datetime}}.",
      congrats: "Félicitations, vous avez terminé vos pas pour le mois !"
    }
  },
  options: {
    title: "Options",
    sections: {
      goal: {
        legend: "Personnel"
      },
      app: {
        legend: "Paramètres de l'application"
      }
    },
    monthly_step_goal: {
      label: "Objectif mensuel de pas",
      help: "Sélectionnez combien de pas vous souhaitez atteindre chaque mois",
      suggestions: {
        // Example: 180,000 or about 6,000 per day
        label:
          "{{ monthly_steps,number }} ou environ {{ daily_steps,number }} par jour"
      }
    },
    theme: {
      label: "Thème",
      help: "Sélectionnez l'apparence de l'application",
      options: {
        auto: { label: "Thème système" },
        light: { label: "Clair" },
        dark: { label: "Sombre" }
      }
    },
    lang: {
      label: "Langue",
      help: "Sélectionnez la langue de l'application",
      option: {
        // Example: English
        label: "{{lang, displayName(type:language) }}"
      }
    }
  },
  history: {
    title: "Journal des Pas",
    help: "Ceci est un journal de vos pas pour le mois. Vous pouvez ajouter, supprimer ou modifier des entrées.",
    summary: {
      toggle: {
        title: "Afficher le résumé du journal"
      }
    },
    table: {
      header: {
        date: "Date",
        steps: "Pas"
      },
      rows: {
        // Formatted value in the Date column
        date: "{{ value, datetime(dateStyle: medium) }}",
        // Formatted value in the Steps column
        steps: "{{ value, number(maximumFractionDigits:0) }}"
      },
      // Example: Logged 30 entries between 4/1/2025 and 4/30/2025. Total steps in range: 185,000. Average: 6,167.
      summary:
        'Enregistré {{ count, number }} $t(entries, {"count": {{count}}}) entre {{ fromDate, datetime(dateStyle: long) }} et {{ toDate, datetime(dateStyle: long) }}. Total des pas dans la plage : {{ sum, number }}. Moyenne : {{ avg, number(maximumFractionDigits: 0) }}',
      caption: "Journal des pas quotidiens"
    },
    close_btn: {
      label: "Fermer",
      title: "Fermer la boîte de dialogue"
    },
    add_btn: {
      label: "Ajouter",
      title: "Ajouter à l'historique"
    },
    remove_btn: {
      title: "Supprimer l'entrée",
      label: "Supprimer"
    },
    open_chart_btn: {
      label: "Ouvrir le graphique",
      title: "Ouvrir le graphique"
    },
    tabs: {
      add: {
        title: "Ajouter une entrée"
      },
      filter: {
        title: "Filtrer"
      }
    },
    filter: {
      fromDate: {
        label: "À partir de la date",
        title: "Date de la première entrée à afficher"
      },
      toDate: {
        label: "Jusqu'à la date",
        title: "Date de la dernière entrée à afficher"
      },
      filter_btn: {
        label: "Appliquer",
        title: "Appliquer les filtres"
      },
      filter_btn_reset: {
        label: "Réinitialiser",
        title: "Réinitialiser les valeurs par défaut"
      }
    },
    chart: {
      // X-axis category labels (Date)
      category: "{{ value, datetime(dateStyle: short) }}",
      // Example: Steps from April 1, 2025 to April 30, 2025
      title:
        "Pas du {{ start, datetime(dateStyle: long) }} au {{ end, datetime(dateStyle: long) }}",
      steps_set: {
        label: "Pas quotidiens"
      },
      cum_set: {
        label: "Pas cumulatifs"
      },
      goal_line: {
        label: "Objectif mensuel"
      }
    }
  }
};
export default translation;
