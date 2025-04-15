import { useTranslation } from "react-i18next";
import { useAppState } from "./store";
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
import { Chart, Bar } from "react-chartjs-2";
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
  Legend
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

  const chartData = useMemo(() => {
    const interval = {
      start: filterFromDate.getTime(),
      end: filterToDate.getTime()
    };

    const groupedData = historyData
      // filter to range
      .filter(
        (entry) => entry.date >= interval.start && entry.date <= interval.end
      )
      // map to day and steps
      .map((e) => ({
        day: `${dateFns.startOfDay(e.date).getTime()}`,
        steps: e.steps
      }))
      // group by day, SUMing each data point
      .reduce<{ [day: string]: number }>((p, c) => {
        return { ...p, [c.day]: c.day in p ? p[c.day] + c.steps : c.steps };
      }, {});

    // turnn into array sorted by keys
    // use the date interval for keys to allow sparse data
    const graphData = dateFns.eachDayOfInterval(interval).map((dt) => {
      const t = dt.getTime();
      const k = `${t}`;
      const steps = groupedData[k];
      return [t, steps, 3000]; // TODO calculate this number (some kind of burndown curve?)
    });

    const data: ChartData<keyof ChartTypeRegistry, number[]> = {
      labels: graphData.map((e) =>
        t("history.chart.category", { value: e[0] })
      ),
      datasets: [
        {
          type: "bar" as const,
          label: t("history.chart.steps_set.label"),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.75)",
          order: 1,
          data: graphData.map((e) => e[1])
        },
        {
          type: "line" as const,
          label: t("history.chart.burndown_set.label"),
          borderWidth: 1,
          pointBorderWidth: 1,
          backgroundColor: "red",
          borderColor: "red",
          pointStyle: "star",
          order: 2,
          data: graphData.map((e) => e[2])
        }
      ]
    };
    return data;
  }, [filterFromDate, filterToDate, historyData]);

  const chartOptions = useMemo<ChartOptions<keyof ChartTypeRegistry>>(
    () => ({
      responsive: true,
      locale: i18n.resolvedLanguage ?? "en",
      normalized: true,
      indexAxis: "x",
      plugins: {
        legend: {
          // display: false,
          position: "bottom" as const
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

  return (
    <div>
      <Chart
        type="bar"
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
}
