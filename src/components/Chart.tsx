import { createEffect, createSignal } from "solid-js";
import * as d3 from "d3";
import { initializeChart } from "./chart";

interface Config {
  margin: { top: number; right: number; bottom: number; left: number };
  width: number;
  height: number;
  metrics: string[];
  accessor: string;
}

interface DataPoint {
  date: string;
  rating_metrics: { [key: string]: number };
}

interface ChartProps {
  data: DataPoint[];
  config: Config;
}

export const Chart = (props: ChartProps) => {
  let chartContainer: HTMLDivElement | null = null;
  const [chartData, setChartData] = createSignal<DataPoint[]>([]);

  createEffect(() => {
    if (props.data?.length) {
      setChartData(props.data);
    }
  });

  createEffect(() => {
    const data = chartData();
    if (data.length > 0 && chartContainer) {
      // Clear the container before drawing the new chart
      d3.select(chartContainer).selectAll("*").remove();
      initializeChart(chartContainer, data, props.config);
    }
  });

  return (
    <main>
      {chartData() ? (
        <div
          ref={(el) => {
            chartContainer = el;
          }}
        ></div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default Chart;
