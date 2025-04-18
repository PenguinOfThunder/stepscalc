import {
  BarElement,
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  ChartTypeRegistry,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from "chart.js";
import chartJsPluginAnnotation from "chartjs-plugin-annotation";
import * as dateFns from "date-fns";
import { useMemo } from "react";
import { Chart } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { HistoryDataEntry, useAppState } from "./store";

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
      maintainAspectRatio: false,
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
    labels: categories.map((dt: number) =>
      t("history.chart.category", { value: dt })
    ),
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
function buildChartData(
  historyData: HistoryDataEntry[],
  filterFromDate: Date,
  filterToDate: Date
): any {
  throw new Error("Function not implemented.");
}
