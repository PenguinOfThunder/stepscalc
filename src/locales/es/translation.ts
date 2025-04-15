const translation = {
  steps_one: "paso",
  steps_other: "pasos",
  days_one: "día",
  days_other: "días",
  entries_one: "entrada",
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
        title: "Configuración"
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
      label:
        "{{ fractionComplete, number(style: percent; maximumFractionDigits: 0) }} de {{ stepsRequired,number(maximumFractionDigits:0) }}"
    },
    "calc-btn": {
      label: "Calcular"
    },
    "message": {
      hint: "Sugerencia: Complete el formulario y presione Calcular",
      predicted_days:
        "A su ritmo actual de {{avgStepsPerDay, number(maximumFractionDigits:0)}} pasos por día, completará sus pasos {{projDaysRemain, relativetime(day)}}: {{dayToComplete,datetime}}.",
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
        legend: "Configuración de la Aplicación"
      }
    },
    monthly_step_goal: {
      label: "Meta mensual de pasos",
      help: "Seleccione cuántos pasos le gustaría alcanzar cada mes",
      suggestions: {
        label:
          "{{ monthly_steps,number }} o aproximadamente {{ daily_steps,number }} por día"
      }
    },
    theme: {
      label: "Tema",
      help: "Seleccione la apariencia de la aplicación",
      options: {
        auto: { label: "Automático" },
        light: { label: "Claro" },
        dark: { label: "Oscuro" }
      }
    },
    lang: {
      label: "Idioma",
      help: "Seleccione el idioma de la aplicación",
      option: {
        label: "{{lang, displayName(type:language) }}"
      }
    }
  },
  history: {
    title: "Registro de Pasos",
    help: "Este es un registro de sus pasos para el mes. Puede agregar, eliminar o editar entradas.",
    table: {
      header: {
        date: "Fecha",
        steps: "Pasos"
      },
      rows: {
        date: "{{ value, datetime }}",
        steps: "{{ value, number(maximumFractionDigits:0) }}"
      },
      summary:
        'Se encontraron {{ count, number }} $t(entries, {"count": {{count}}}) entre {{ fromDate, datetime }} y {{ toDate, datetime }}. Pasos totales en el rango: {{ sum, number }}. Promedio: {{ avg, number }}',
      caption: "Entradas del registro"
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
    }
  }
};
export default translation;
