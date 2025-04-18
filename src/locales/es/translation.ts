const translation = {
  // "step" singular
  steps_one: "paso",
  // "step" plural
  steps_other: "pasos",
  // "day" singular
  days_one: "día",
  // "day" plural
  days_other: "días",
  // "entry" singular
  entries_one: "entrada",
  // "entry" plural
  entries_other: "entradas",
  app: {
    title: "Calculadora de Pasos",
    nav: {
      today: {
        label: "Hoy",
        title: "Progreso de hoy"
      },
      history: {
        label: "Historial",
        title: "Conteos históricos"
      },
      options: {
        label: "Opciones",
        title: "Configuraciones"
      }
    }
  },
  main: {
    "today": {
      label: "Fecha de Hoy",
      placeholder: "dd/mm/aaaa"
    },
    "steps_completed": {
      label: "Pasos Completados Este Mes"
    },
    "steps_remaining": {
      label: "Pasos Restantes Este Mes",
      value: "{{ value, number }}"
    },
    "steps_remaining_per_day": {
      label: "Pasos Diarios Restantes Este Mes",
      value: "{{ value, number }}"
    },
    "progress": {
      // Example: 100% of 180,000
      label:
        "{{ fractionComplete, number(style: percent; maximumFractionDigits: 0) }} de {{ stepsRequired,number(maximumFractionDigits:0) }}"
    },
    "calc-btn": {
      label: "Calcular"
    },
    "message": {
      hint: "Sugerencia: Complete el formulario y presione Calcular",
      // Example: At your current rate of 6,200 steps per day, you will complete your steps in 3 days: 4/27/2025
      predicted_days:
        "A su ritmo actual de {{avgStepsPerDay, number(maximumFractionDigits:0)}} pasos por día, completará sus pasos {{projDaysRemain, relativetime(day)}}: {{dayToComplete, datetime}}.",
      congrats: "¡Felicidades, ha completado sus pasos para el mes!"
    }
  },
  options: {
    title: "Opciones",
    sections: {
      goal: {
        legend: "Personal"
      },
      app: {
        legend: "Configuraciones de la Aplicación"
      }
    },
    monthly_step_goal: {
      label: "Meta mensual de pasos",
      help: "Seleccione cuántos pasos le gustaría alcanzar cada mes",
      suggestions: {
        // Example: 180,000 or about 6,000 per day
        label:
          "{{ monthly_steps,number }} o aproximadamente {{ daily_steps,number }} por día"
      }
    },
    theme: {
      label: "Tema",
      help: "Seleccione la apariencia de la aplicación",
      options: {
        auto: { label: "Tema del sistema" },
        light: { label: "Claro" },
        dark: { label: "Oscuro" }
      }
    },
    lang: {
      label: "Idioma",
      help: "Seleccione el idioma de la aplicación",
      option: {
        // Example: English
        label: "{{lang, displayName(type:language) }}"
      }
    }
  },
  history: {
    title: "Registro de Pasos",
    help: "Este es un registro de sus pasos para el mes. Puede agregar, eliminar o editar entradas.",
    summary: {
      toggle: {
        title: "Mostrar resumen del registro"
      }
    },
    table: {
      header: {
        date: "Fecha",
        steps: "Pasos"
      },
      rows: {
        // Formatted value in the Date column
        date: "{{ value, datetime(dateStyle: medium) }}",
        // Formatted value in the Steps column
        steps: "{{ value, number(maximumFractionDigits:0) }}"
      },
      // Example: Logged 30 entries between 4/1/2025 and 4/30/2025. Total steps in range: 185,000. Average: 6,167.
      summary:
        'Registrado {{ count, number }} $t(entries, {"count": {{count}}}) entre {{ fromDate, datetime(dateStyle: long) }} y {{ toDate, datetime(dateStyle: long) }}. Total de pasos en el rango: {{ sum, number }}. Promedio: {{ avg, number(maximumFractionDigits: 0) }}',
      caption: "Registro diario de pasos",
      download: {
        title: "Descargar datos legibles por máquina",
        label: "Descargar",
        success: "¡Éxito! Los datos se copiaron en su portapapeles."
      }
    },
    close_btn: {
      label: "Cerrar",
      title: "Cerrar diálogo"
    },
    add_btn: {
      label: "Agregar",
      title: "Agregar al historial"
    },
    remove_btn: {
      title: "Eliminar entrada",
      label: "Eliminar"
    },
    open_chart_btn: {
      label: "Abrir gráfico",
      title: "Abrir gráfico"
    },
    tabs: {
      add: {
        title: "Agregar Entrada"
      },
      filter: {
        title: "Filtrar"
      }
    },
    filter: {
      fromDate: {
        label: "Desde Fecha",
        title: "Fecha de la entrada más antigua a mostrar"
      },
      toDate: {
        label: "Hasta Fecha",
        title: "Fecha de la entrada más reciente a mostrar"
      },
      filter_btn: {
        label: "Aplicar",
        title: "Aplicar filtros"
      },
      filter_btn_reset: {
        label: "Restablecer",
        title: "Restablecer valores a los predeterminados"
      }
    },
    chart: {
      // X-axis category labels (Date)
      category: "{{ value, datetime(dateStyle: short) }}",
      // Example: Steps from April 1, 2025 to April 30, 2025
      title:
        "Pasos desde {{ start, datetime(dateStyle: long) }} hasta {{ end, datetime(dateStyle: long) }}",
      steps_set: {
        label: "Pasos Diarios"
      },
      cum_set: {
        label: "Pasos Acumulativos"
      },
      goal_line: {
        label: "Meta mensual"
      }
    }
  }
};
export default translation;
