import { useTranslation } from "react-i18next";
import { HistoryDataEntry, useAppState } from "./store";
import {
  Chart as ChartJS,
  Title,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  BarElement,
  ChartData,
  ChartOptions,
  ChartTypeRegistry
} from "chart.js";
import chartJsPluginAnnotation from "chartjs-plugin-annotation";
import { Chart } from "react-chartjs-2";
import { useMemo } from "react";
import * as dateFns from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  chartJsPluginAnnotation
);

function buildChartData(
  historyData: HistoryDataEntry[],
  filterFromDate: Date,
  filterToDate: Date
): { categories: number[]; stepsSeries: number[]; cumSeries: number[] } {
  const interval = {
    start: filterFromDate.getTime(),
    end: filterToDate.getTime()
  };

  // group data by day
  const groupedData = historyData
    // filter to range
    .filter(
      (entry) => entry.date >= interval.start && entry.date <= interval.end
    )
    // map to day and steps
    .map((e) => ({
      // stringify so it's a valid object key
      day: String(dateFns.startOfDay(e.date).getTime()),
      steps: e.steps
    }))
    // group by day, SUMing each data point
    .reduce<{ [day: string]: number }>((p, c) => {
      return { ...p, [c.day]: c.day in p ? p[c.day] + c.steps : c.steps };
    }, {});

  // turn into array sorted by keys
  // use the date interval for keys to allow sparse data
  const categories = dateFns
    .eachDayOfInterval(interval)
    .map((dt) => dt.getTime());
  const stepsSeries = categories.map(
    (c) => groupedData[String(c)] ?? undefined
  );

  // Get a cumulative sum of all steps in previous indexes
  const cumSteps = categories.map((_, i) => {
    // Handle month boundary: sum restarts at zero on the first of every month
    // find the first of the month searching backwards from current index
    const fom = categories
      .slice(0, i)
      .findLastIndex((v) => dateFns.isFirstDayOfMonth(v));
    // If found, use that as the offset, otherwise use 0 (as far back as available)
    return (
      // Include current data point + all previous back to FOM
      (stepsSeries[i] || 0) +
      stepsSeries
        .slice(fom > 0 ? fom : 0, i)
        .reduce((p, c) => (c ? p + c : p), 0)
    );
  });

  return { categories, stepsSeries, cumSeries: cumSteps };
}

export function HistoryChart({
  filterFromDate,
  filterToDate
}: {
  filterFromDate: Date;
  filterToDate: Date;
}) {
  const { t, i18n } = useTranslation();
  const historyData = useAppState((state) => state.historyData);
  const requiredStepsPerMonth = useAppState((state) => state.stepsRequired);

  const {
    categories,
    stepsSeries,
    cumSeries: cumSeries
  } = useMemo(
    () => buildChartData(historyData, filterFromDate, filterToDate),
    [filterFromDate, filterToDate, historyData]
  );

  const chartOptions = useMemo<ChartOptions<keyof ChartTypeRegistry>>(
    () => ({
      responsive: true,
      locale: i18n.resolvedLanguage ?? "en",
      normalized: true,
      indexAxis: "x",
      scales: {
        x: {
          type: "category",
          position: "bottom"
          // title: {
          //   text: "Date",
          //   display: true
          // }
        },
        y: {
          type: "linear",
          position: "left",
          title: {
            text: t("history.chart.steps_set.label"),
            display: true
          }
        },
        y2: {
          type: "linear",
          position: "right",
          title: {
            text: t("history.chart.cum_set.label"),
            display: true
          }
        }
      },
      plugins: {
        legend: {
          // display: false,
          position: "chartArea" as const
        },
        annotation: {
          annotations: {
            monthlyGoal: {
              type: "line",
              yScaleID: "y2",
              yMin: requiredStepsPerMonth,
              yMax: requiredStepsPerMonth,
              borderColor: "rgb(255,0,0)",
              borderWidth: 1,
              label: {
                content: t("history.chart.goal_line.label"),
                position: "end",
                color: "rgb(255,0,0)",
                display: true,
                backgroundColor: "transparent",
                backgroundShadowColor: "rgb(0,0,0)"
              }
            }
          }
        },
        title: {
          display: true,
          text: t("history.chart.title", {
            start: filterFromDate,
            end: filterToDate
          })
        }
      }
    }),
    [i18n.language, filterFromDate, filterToDate]
  );

  const chartData: ChartData<keyof ChartTypeRegistry, number[]> = {
    labels: categories.map((dt) => t("history.chart.category", { value: dt })),
    datasets: [
      {
        type: "bar" as const,
        label: t("history.chart.steps_set.label"),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.75)",
        order: 1,
        data: stepsSeries,
        xAxisID: "x",
        yAxisID: "y"
      },
      {
        type: "line" as const,
        label: t("history.chart.cum_set.label"),
        borderWidth: 1,
        pointBorderWidth: 1,
        backgroundColor: "rgb(0,255,0)",
        borderColor: "rgb(0,128,0)",
        pointStyle: "star",
        order: 0,
        data: cumSeries,
        xAxisID: "x",
        yAxisID: "y2"
      }
    ]
  };

  return (
    <Chart
      type="bar"
      data={chartData}
      options={chartOptions}
    />
  );
}
